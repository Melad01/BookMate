import { HStack } from "@chakra-ui/react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { customStyles } from "../styles/customStyles";
import { useEffect, useState } from "react";
import Category from "../types/Category";
import { useBookQueryStore } from "../store";
import { categoryOptions } from "../services/data";

const BooksFilter = () => {
  const animatedComponents = makeAnimated();
  const categories = useBookQueryStore((s) => s.bookQuery.genres);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const handleCategoriesChange = (categories: MultiValue<Category>) => {
    const newCategories = categories.map((category) => ({
      CategoryID: category.CategoryID,
      CategoryName: category.CategoryName,
    }));
    setSelectedCategories(newCategories);
  };
  const setGenres = useBookQueryStore((s) => s.setGenres);
  useEffect(() => {
    setGenres(selectedCategories);
  }, [selectedCategories, setGenres]);

  return (
    <>
      <HStack spacing={{ base: 5, lg: 8 }}>
        <Select
          id="categories"
          name="categories"
          aria-label="categories"
          onChange={(categories) =>
            handleCategoriesChange(categories as MultiValue<Category>)
          }
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          placeholder="Categories"
          options={categoryOptions}
          getOptionValue={(option: Category) => option.CategoryID.toString()}
          getOptionLabel={(option: Category) => option.CategoryName}
          styles={customStyles}
          value={categories}
        />
      </HStack>
    </>
  );
};

export default BooksFilter;
