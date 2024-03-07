import { Box } from "@mui/material";
import { Header } from "../../components/Header";
import { DashDrawer } from "../../components/DashDrawer";
import { ServiceCard } from "../../components/ServiceCard";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const numberOfServiceCards = 12;

  return (
    <Box className={classes.container}>
      <Header />
      <DashDrawer />
      <Box className={classes["container__service-cards"]}>
        <Box className={classes["grid-container"]}>
          {[...Array(numberOfServiceCards)].map((_, index) => (
            <ServiceCard key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
