import { useSnackbar } from "./hooks";
import { Routes } from "./routes";
import "@fontsource/roboto/500.css";

const App = () => {
  const { SnackbarComponent } = useSnackbar();

  return <>
    {SnackbarComponent}
    <Routes />;
  </>
};

export default App;
