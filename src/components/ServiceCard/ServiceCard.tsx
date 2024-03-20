import { FC } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

import { Service } from "../../types";
import classes from "./ServiceCard.module.css";

const ServiceCard: FC<Service> = ({ name, url, image_url }) => {
  const handleClick = () => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null
  }

  return (
    <Card className={classes.card} onClick={handleClick}>
      <Box className={classes.overlay}>
        <Typography variant="h6" textAlign="center">
          {name}
        </Typography>
      </Box>
      <Box className={classes.imageContainer}>
        <img
          src={image_url}
          alt={`${name} image`}
          className={classes.image}
        />
      </Box>
    </Card>
  );
};

export default ServiceCard;
