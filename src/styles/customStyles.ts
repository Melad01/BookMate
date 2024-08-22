import { bgColor, color, hoverColor } from "../color";

export const customStyles = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: color(),
    };
  },
  control: (provided, state) => ({
    ...provided,
    color: color(), // White text color
    backgroundColor: bgColor(), // Black background color
    border: "1px solid #ccc",
    borderRadius: "7px",
    boxShadow: state.isFocused ? "0 0 5px rgba(0, 0, 0, 0.2)" : "none",
    "&:hover": {
      borderColor: bgColor(),
      backgroundColor: hoverColor(),
    },
  }),
  menu: (provided) => ({
    ...provided,
    color: color(), // White text color
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
      backgroundColor: hoverColor(),
      color: color(),
    },
  }),
  input: (provided) => ({
    ...provided,
    "&::placeholder": {
      color: color(), // Placeholder text color
      backgroundColor: color(), // Transparent background for placeholder
    },
  }),
  label: (provided) => ({
    ...provided,
    color: color(), // Apply bgColor to the label text
  }),
};
