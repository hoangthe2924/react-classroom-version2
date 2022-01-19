import { Grid, Box, Link, Avatar, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  borderRadius: "10px",
}));

export default function PostBox() {
  return (<Item>
    <Box sx={{ marginBottom: 1, "&:hover": { cursor: "pointer" } }}>
      <Grid container alignItems="center" p={2}>
        <Avatar height="35" wihth="35"></Avatar>
          <Typography variant='body1' sx={{
            marginLeft: "10px",
            color: "rgba(0,0,0,0.55)",
            textDecoration: "none",
            "&:hover": {
              color: "#000",
              cursor: "pointer",
            },
          }}>Annouce something to your class</Typography>
      </Grid>
    </Box>
  </Item>);
}
