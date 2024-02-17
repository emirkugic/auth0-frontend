import { styled } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";

const CustomLabelForField = styled(InputLabel)({
  color: "black",
  "&.Mui-focused": {
    color: "black",
  },
});

export default CustomLabelForField;
