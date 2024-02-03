import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const CustomTextField = styled(TextField)({
  "& label": {
    color: "black",
  },
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black",
      borderWidth: "2px",
    },
    borderRadius: "5px",
  },
  "&:hover fieldset, &:focus fieldset": {
    borderColor: "black",
    borderWidth: "1.5px",
  },
  "& .MuiInputBase-input": {
    color: "black",
  },
});

export default CustomTextField;
