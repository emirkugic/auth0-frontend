import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faList12 } from '@fortawesome/free-solid-svg-icons'

import classes from "./DashDrawer.module.css";

const DashDrawer = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  const list = (
    <Box
      sx={{ width: 250, padding: "16px", textAlign: "center" }}
      role="presentation"
      onClick={() => setState({ ...state, left: false })}
      onKeyDown={() => setState({ ...state, left: false })}
    >
      <Typography variant="h6" className={classes.title}>
        Completed Tasks
      </Typography>
      <List>
        {[
          { text: "Task 1", subtasks: ["Subtask 1.1", "Subtask 1.2"] },
          { text: "Task 2", subtasks: ["Subtask 2.1", "Subtask 2.2"] },
          { text: "Task 3", subtasks: ["Subtask 3.1", "Subtask 3.2"] },
        ].map((task) => (
          <React.Fragment key={task.text}>
            <ListItem disablePadding>
              <ListItemText primary={`• ${task.text}`} />
            </ListItem>
            {task.subtasks.map((subtask) => (
              <ListItem
                className={classes.subtask}
                key={subtask}
                disablePadding
              >
                <ListItemText primary={`  • ${subtask}`} />
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Box className={classes.container}>
      <IconButton
        className={classes.container__action}
        onClick={() => setState({ ...state, left: true })}
      >
        <FontAwesomeIcon icon={faList12 as IconProp} />

      </IconButton>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={() => setState({ ...state, left: false })}
      >
        {list}
      </Drawer>
    </Box>
  );
}

export default DashDrawer;
