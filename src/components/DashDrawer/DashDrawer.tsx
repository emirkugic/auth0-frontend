import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect, useRef } from "react";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

import { useTasks } from "../../hooks";
import { Subtask, Task } from "../../types";
import classes from "./DashDrawer.module.css";

const DashDrawer = () => {
  const [open, setOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false
  );
  const drawerRef = useRef<HTMLDivElement>(null);

  const { data } = useTasks();

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
        setExpandedAccordion(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAccordionChange =
    (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false);
    };

  const list = (
    <Box className={classes.container__drawer__list} role="presentation">
      <Box className={classes.container__drawer__title}>
        <FontAwesomeIcon
          className={classes["container__drawer__title-icon"]}
          icon={faListCheck as IconProp}
        />
        <Typography
          variant="h6"
          className={classes["container__drawer__title-text"]}
        >
          Tasks
        </Typography>
      </Box>
      <List>
        {data &&
          data.map((task: Task, index: number) => (
            <Accordion
              key={index}
              className={classes.accordian}
              elevation={0}
              expanded={expandedAccordion === `panel${index + 1}`}
              onChange={handleAccordionChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography>{task.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {task.subtasks.map((subtask: Subtask, subIndex: number) => (
                    <ListItem
                      className={`${classes.subtask} ${
                        subtask.status ? classes.completed : ""
                      }`}
                      key={subIndex}
                      disablePadding
                    >
                      <ListItemText
                        className={classes.subtask__text}
                        primary={`${subtask.name}`}
                      />
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
        onClick={() => {
          setOpen((prevOpen) => !prevOpen);
        }}
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
};

export default DashDrawer;
