import { Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import { bgColor } from "../color";
import { useBookQueryStore } from "../store";

interface Props {
  children: ReactNode;
}

const CustomHeading = ({ children }: Props) => {
  const categories = useBookQueryStore((s) => s.bookQuery.genres);

  return (
    <Heading
      fontSize={{ base: 30, md: 40 }}
      marginLeft={5}
      marginBottom={5}
      color={bgColor()}
    >
      {categories?.map((category) => category.CategoryName).join(" ")}{" "}
      {children}
    </Heading>
  );
};

export default CustomHeading;
