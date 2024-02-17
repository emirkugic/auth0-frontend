import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { IconTheme } from "./setup/IconTheme/index.ts";
import { StyledEngineProvider } from "@mui/material";
import ReactDOM from "react-dom/client";

import { ReduxWrapper, ReactQueryWrapper } from './utils';
import { SnackBarProvider } from './context';
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StyledEngineProvider injectFirst>
    <ReactQueryWrapper>
      <SnackBarProvider>
        <ReduxWrapper>
          <IconTheme>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <App />
            </LocalizationProvider>
          </IconTheme>
        </ReduxWrapper>
      </SnackBarProvider>
    </ReactQueryWrapper>
  </StyledEngineProvider>
);
