import React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from "@mui/material";

const CommentGradeReview = ({ comments }) => {
  return (
    <List sx={{ width: "100%" }}>
      {comments.map((comment) => {
        return (
          <React.Fragment key={comment.id}>
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="avatar" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      {comment.user.fullName}
                    </Typography>
                    <Typography
                      color="secondary.dark"
                      variant="caption"
                      sx={{ fontWeight: "bolder" }}
                    >
                      <i>{new Date(comment.createdAt).toLocaleString()}</i>
                    </Typography>
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant='body2' color='text.primary' sx={{fontFamily: 'Arial, Helvetica, sans-serif;'}}>
                    {` - ${comment.content}`}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default CommentGradeReview;
