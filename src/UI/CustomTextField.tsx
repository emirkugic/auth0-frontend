import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

import { cachedColors } from "../utils";
import { ColorKeys } from "../enums";

const CustomTextField = styled(TextField)({
  "& label": {
    color: "black",
  },
  "& label.Mui-focused": {
    color: cachedColors[ColorKeys.Primary500],
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: cachedColors[ColorKeys.Primary500],
      borderWidth: "2px",
    },
  },
  "&:hover fieldset": {
    borderColor: cachedColors[ColorKeys.Primary500]
  },
  "&: focus fieldset": {
    borderColor: cachedColors[ColorKeys.Primary500],
  },
  "& .MuiInputBase-input": {
    color: "black",
  },
});

export default CustomTextField;