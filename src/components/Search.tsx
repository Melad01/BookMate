import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useLocation } from "react-router";
import { color, hoverColor } from "../color";

const Search = () => {
  const ref = useRef<HTMLInputElement>(null);
  //const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  if (
    currentPath === "/notifications" ||
    currentPath === "/" ||
    currentPath === "/profile"
  ) {
    return null;
  }

  return (
    <FormControl onSubmit={() => {}}>
      <InputGroup flex={1} size={{ base: "md", lg: "lg" }} width="100%">
        <InputLeftElement children={<BsSearch />} color={hoverColor()} />
        <Input
          ref={ref}
          placeholder="Search..."
          variant="solid"
          bgColor={color()}
          textColor={hoverColor()}
          _placeholder={{ color: hoverColor() }}
          borderRadius={20}
          list="books"
        />
      </InputGroup>
    </FormControl>
  );
};

export default Search;
