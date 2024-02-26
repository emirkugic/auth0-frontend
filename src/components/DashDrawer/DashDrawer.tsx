import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Paper, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import classes from "./DashDrawer.module.css";

const DashDrawer = () => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        drawerRef.current &&
        target &&
        !drawerRef.current.contains(target) &&
        !target.closest(`.${classes.container__action}`)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const list = (
    <Box
      className={classes.container__drawer__list}
      role="presentation"
    >
      <Box className={classes.container__drawer__title}>
        <FontAwesomeIcon className={classes["container__drawer__title-icon"]} icon={faListCheck as IconProp} />
        <Typography variant="h6" className={classes["container__drawer__title-text"]}>
          Tasks
        </Typography>
      </Box>
      <List>
        {[
          { text: "Task 1", subtasks: ["Subtask 1.1", "Subtask 1.2"] },
          { text: "Task 2", subtasks: ["Subtask 2.1", "Subtask 2.2"] },
          { text: "Task 3", subtasks: ["Subtask 3.1", "Subtask 3.2"] },
        ].map((task, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography>{`• ${task.text}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {task.subtasks.map((subtask) => (
                  <ListItem
                    className={classes.subtask}
                    key={subtask}
                    disablePadding
                  >
                    <ListItemText primary={`  • ${subtask}`} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Box>
  );

  return (
    <Box className={classes.container}>
      <IconButton
        className={classes.container__action}
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faListCheck as IconProp} />
      </IconButton>
      <Paper
        ref={drawerRef}
        className={`${classes.container__drawer} ${open ? classes.open : ""}`}
      >
        {list}
      </Paper>
    </Box>
  );
}

export default DashDrawer;
