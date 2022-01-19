import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Person from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import { IconButton, ListItemAvatar } from "@mui/material";
import { List, ListItem, ListItemText, Avatar } from "@mui/material";

const UserEmailList = ({ emailList, setEmailList }) => {
  const removeEmailHandler = (delEmail) => {
    const newList = emailList.filter((email) => email !== delEmail);
    setEmailList(newList);
  };

  const emailItemList = emailList.map((email) => (
    <Box key={email}>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={removeEmailHandler.bind(null, email)}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar sx={{ width: 30, height: 30 }}>
            <Person />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={email}/>
      </ListItem>
    </Box>
  ));

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 250,
        minHeight: 250,
        "& ul": { padding: 0 },
      }}
    >
      {emailItemList}
    </List>
  );
};

export default UserEmailList;
