import { bgColor, color, hoverColor } from "../color";

export const customStylesInput = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: bgColor(),
    };
  },
  border: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: bgColor(),
    };
  },
  control: (provided, state) => ({
    ...provided,
    color: bgColor(), // White text color
    backgroundColor: color(), // Black background color
    border: `1px solid ${bgColor()}`,
    borderRadius: "7px",
    boxShadow: state.isFocused ? "0 0 5px rgba(0, 0, 0, 0.2)" : "none",
    "&:hover": {
      borderColor: color(),
    },
  }),
  menu: (provided) => ({
    ...provided,
    color: bgColor(), // White text color
    backgroundColor: color(), // Black background color
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? bgColor() : color(), // Background color toggles between black and white
    color: state.isSelected ? color() : bgColor(), // Text color toggles between white and black
    "&:hover": {
      backgroundColor: bgColor(),
      color: color(),
    },
  }),
};
