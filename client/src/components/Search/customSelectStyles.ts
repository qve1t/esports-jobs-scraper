export const customStyles = {
  control: (styles: any) => ({
    ...styles,
    borderRadius: "9999px",
    border: "2px solid #fbcfe8",
    boxShadow: "none",
    padding: "3px 5px",
    "&:placeholder": {
      color: "red",
    },
    "&:hover": {},
  }),
  option: (styles: any, state: any) => ({
    ...styles,
    backgroundColor: state.isSelected ? "#f9a8d4" : "#fff",
    "&:hover": {
      backgroundColor: "#fbcfe8",
    },
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#9ca3af",
  }),
};

export const customStylesDark = {
  control: (styles: any) => ({
    ...styles,
    borderRadius: "9999px",
    background: "#111827",
    border: "2px solid #be185d",
    boxShadow: "none",
    padding: "3px 5px",
    "&:hover": {},
  }),
  option: (styles: any, state: any) => ({
    ...styles,
    color: "white",
    backgroundColor: state.isSelected ? "#be185d" : "#111827",
    "&:hover": {
      backgroundColor: "#be185d",
    },
  }),
  noOptionsMessage: (styles: any) => ({
    ...styles,
    background: "#111827",
    color: "white",
  }),
  menu: (styles: any) => ({
    ...styles,
    background: "#111827",
  }),
  input: (styles: any) => ({
    ...styles,
    color: "white",
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#9ca3af",
  }),
};
