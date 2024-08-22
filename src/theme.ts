import { extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";
import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import useColors from "./colors";

const { color, bgColor, hoverColor } = useColors();

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    fontWeight: "medium",
    bg: color,
    color: bgColor,
    _hover: {
      bg: hoverColor,
      color: bgColor,
    },
  },
  list: {
    // this will style the MenuList component
    borderRadius: "sm",
    borderColor: bgColor,
    borderWidth: "0.1px",
    bg: color,
    padding: 0,
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: bgColor,
    _hover: {
      bg: color,
    },
    _focus: {
      bg: color,
    },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    textTransform: "uppercase",
    color: bgColor,
    textAlign: "center",
    letterSpacing: "wider",
    opacity: "0.7",
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    opacity: "0.8",
    fontFamily: "mono",
    fontSize: "sm",
    letterSpacing: "tighter",
    pl: "4",
  },
  divider: {
    // this will style the MenuDivider component
    my: "4",
    borderColor: bgColor,
    borderBottom: "2px solid",
  },
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });

const customTheme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
    Menu: menuTheme,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: color(),
      },
    }),
  },
  Stepper: {
    indicator: {
      "&[data-status=complete]": {
        bgColor: bgColor,
        borderColor: color,
        color: color,
      },
      "&[data-status=active]": {
        bgColor: bgColor,
        borderColor: color,
      },
    },
  },
});

export default customTheme;
