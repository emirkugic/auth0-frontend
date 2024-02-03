import { OutlinedInput } from "@mui/material";
import { styled } from "@mui/system";

const CustomOutlinedInputField = styled(OutlinedInput)({
  position: "relative",
  "& label": {
    color: "black",
  },
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
  },
  "& .MuiInputBase-input": {
    color: "black",
  },
  "& .MuiOutlinedInput-notchedOutline": {},
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
    borderWidth: "1.5px",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
    borderWidth: "2px",
  },
});

export default CustomOutlinedInputField;
