import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import { stringAvatar } from "services/stringAvatar";

export const AccountProfile = ({ item }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          {...stringAvatar(item?.username)}
          style={{ height: "64px", width: "64px", marginBottom: "16px" }}
        />
        {item?.isAdmin && (
          <Chip label="Admin" color="error" size="small" sx={{ mb: 2 }} />
        )}
        <Typography color="textPrimary" gutterBottom variant="h5">
          {item?.fullname}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {item?.username}
        </Typography>
      </Box>
    </CardContent>
    {/* <Divider />
    <CardActions>
      <Button color="primary" fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions> */}
  </Card>
);
