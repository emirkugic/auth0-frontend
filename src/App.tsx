import { useCallback, useEffect } from "react";
import "@fontsource/roboto/500.css";

import { Routes } from "./routes";
import { ReduxHooks, useSnackbar } from "./hooks";
import { AuthService } from "./services";
import { selectAccessToken, setIsAuthenticated } from "./store";

const App = () => {
  const { SnackbarComponent } = useSnackbar();
  const dispatch = ReduxHooks.useAppDispatch();

  const accessToken = ReduxHooks.useAppSelector(selectAccessToken);

  const checkIfTokenIsValid = useCallback(async () => {
    const isValidToken = await AuthService.validateToken(accessToken);
    isValidToken ? dispatch(setIsAuthenticated(true)) : dispatch(setIsAuthenticated(false));
  }, [dispatch])

  useEffect(() => {
    checkIfTokenIsValid();
  }, []);

  return <>
    {SnackbarComponent}
    <Routes />;
  </>
};

export default App;
