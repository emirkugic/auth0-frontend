import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { IconTheme } from "./setup/IconTheme/index.ts";
import { StyledEngineProvider } from "@mui/material";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StyledEngineProvider injectFirst>
    <IconTheme>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </IconTheme>
  </StyledEngineProvider>
);
