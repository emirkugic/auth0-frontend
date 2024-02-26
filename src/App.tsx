import { useCallback, useEffect } from "react";
import "@fontsource/roboto/500.css";

import { UserAction, selectAccessToken, setIsAuthenticated } from "./store";
import { AuthService } from "./services";
import { ReduxHooks, useSnackbar } from "./hooks";
import { Routes } from "./routes";

const App = () => {
  const { SnackbarComponent } = useSnackbar();
  const dispatch = ReduxHooks.useAppDispatch();

  const accessToken = ReduxHooks.useAppSelector(selectAccessToken);

  const checkIfTokenIsValid = useCallback(async () => {
    if (accessToken) {
      const isValidToken = await AuthService.validateToken(accessToken);
      if (isValidToken) {
        dispatch(setIsAuthenticated(true));
        dispatch(UserAction.fetchUserData());
      } else {
        dispatch(setIsAuthenticated(false));
      }
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    checkIfTokenIsValid();
  }, [checkIfTokenIsValid]);

  return (
    <>
      {SnackbarComponent}
      <Routes />
    </>
  );
};

export default App;
