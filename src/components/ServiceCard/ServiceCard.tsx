import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import teamsLogo from "../../assets/logos/serviceCard/teams.png";
import workplaceLogo from "../../assets/logos/serviceCard/workplace.png";
import listifyLogo from "../../assets/logos/serviceCard/listify.png";
import classes from "./ServiceCard.module.css";

const ServiceCard = () => {
  const imageUrls = [
    {
      src: teamsLogo,
      alt: "MS Teams",
    },
    {
      src: workplaceLogo,
      alt: "Workplace",
    },
    {
      src: listifyLogo,
      alt: "Listify",
    },
  ];

  const random =
    imageUrls[Math.floor(Math.random() * imageUrls.length)];

  return (
    <Card className={classes.card}>
      <div className={classes.overlay}>
        <Typography variant="h6" textAlign="center">
          {random.alt}
        </Typography>
      </div>
      <div className={classes.imageContainer}>
        <img
          src={random.src}
          alt="Service Card Image"
          className={classes.image}
        />
      </div>
    </Card>
  );
};

export default ServiceCard;
