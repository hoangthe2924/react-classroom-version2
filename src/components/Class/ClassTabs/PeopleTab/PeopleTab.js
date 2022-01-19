import * as React from "react";
import {
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InvitationDialog from "components/Class/ClassTabs/PeopleTab/InvitationUser/InvitationDialog";
import { stringAvatar } from "services/stringAvatar";
import { useParams } from "react-router-dom";
import { getPeopleInClass } from "services/class.service";

export default function PeopleTab({ items }) {
  const [listUser, setListUser] = React.useState(null);
  let { id } = useParams();

  // console.log(listUser);

  let teachers = listUser
    ? listUser.filter((user) => user.user_class.role === "teacher")
    : [];
  let students = listUser
    ? listUser.filter((user) => user.user_class.role === "student")
    : [];

  const fetchListUser = async () => {
    try {
      const res = await getPeopleInClass(id);
      if (res.data) {
        setListUser(res.data.users);
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchListUser();
  }, [id]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          mt: 4,
          mb: 2,
          width: "60%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid",
        }}
      >
        <Typography variant="h6" component="div">
          Teachers
        </Typography>
        {items.requesterRole === "teacher" && (
          <InvitationDialog role="teacher" cjc="" />
        )}
      </Box>
      <List dense sx={{ width: "60%" }}>
        {teachers &&
          teachers.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar {...stringAvatar(user.username)} />
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={user.studentId}
              />
            </ListItem>
          ))}
      </List>
      <Box
        sx={{
          mt: 4,
          mb: 2,
          width: "60%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid",
        }}
      >
        <Typography variant="h6" component="div">
          Students
        </Typography>
        {items.requesterRole === "teacher" && (
          <InvitationDialog role="student" cjc={items.cjc} />
        )}
      </Box>
      <List dense sx={{ width: "60%" }}>
        {students &&
          students.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar {...stringAvatar(user.username)} />
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={user.studentId}
              />
            </ListItem>
          ))}
      </List>
    </Grid>
  );
}
