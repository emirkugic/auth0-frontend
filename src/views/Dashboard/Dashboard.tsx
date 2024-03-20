import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

import { Header } from "../../components/Header";
import { DashDrawer } from "../../components/DashDrawer";
import { ServiceCard } from "../../components/ServiceCard";
import { ReduxHooks, useService } from "../../hooks";
import { selectUser } from "../../store/slice/userSlice";
import { FormDialog } from "../../UI";
import classes from "./Dashboard.module.css";
import { Service } from "../../types";

const Dashboard = () => {
  const [showPasswordChangeDialog, setShowPasswordChangeDialog] = useState<boolean>(false);

  const user = ReduxHooks.useAppSelector(selectUser)
  if (!user) return null;

  const { teamName } = user;

  const { data: serviceData, isLoading } = useService(teamName);

  useEffect(() => {
    setShowPasswordChangeDialog(user?.isFirstTimeLogin ?? false)
  }, [user]);

  return (
    <Box className={classes.container}>
      <Header />
      <DashDrawer />
      <Box className={classes["container__service-cards"]}>
        <Box className={classes["grid-container"]}>
          {isLoading
            ? <Box className={classes.loading}> <CircularProgress size={24} /> </Box>
            : serviceData?.map((service: Service, index) => (
              <ServiceCard name={service.name} url={service.url} key={index} />
            ))}
        </Box>
      </Box>
      <FormDialog open={showPasswordChangeDialog} onClose={() => setShowPasswordChangeDialog(false)} />
    </Box>
  );
};

export default Dashboard;
