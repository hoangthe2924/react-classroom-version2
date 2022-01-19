import React from "react";
import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "components/User/Profile/AccountProfile";
import { AccountProfileDetails } from "components/User/Profile/AccountProfileDetails";
import ParticipatedClasses from "components/User/Manage/ParticipatedClasses";
import { getUserDetail } from "services/user.service";
import { useNavigate, useParams } from "react-router-dom";

function ManageUserDetail() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState([]);

  async function getUserInfo() {
    const result = await getUserDetail(id).then(
      (result) => {
        if (result.status === 401) {
          navigate("/login");
        }
        return result.data;
        // return result;
      },
      (error) => {
        navigate("/login");
        console.log(error);
      }
    );
    setItem(result);
  }
  useEffect(() => {
    getUserInfo();
    localStorage.removeItem("prev-link");
  }, []);

  const onUpdate = () => {
    getUserInfo();
  };
  return (
    <div>
      <React.Fragment>
        <div style={{ margin: "21.44px 0px" }}>
          <h1
            onClick={() => navigate("/manage/users")}
            style={{ color: "blue", display: "inline" }}
          >
            Users
          </h1>
          <h1 style={{ display: "inline" }}> / </h1>
          <h2 style={{ display: "inline" }}>ID: {id}</h2>
        </div>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile item={item} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails
                item={item}
                onUpdate={onUpdate}
                viewedByAdmin={true}
              />
            </Grid>
          </Grid>
          <ParticipatedClasses items={item.classes} />
        </Container>
      </React.Fragment>
    </div>
  );
}

export default ManageUserDetail;
