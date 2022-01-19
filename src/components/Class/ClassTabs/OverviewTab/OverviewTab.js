import * as React from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import GradeStructure from "./GradeStructure";
import ClassCodeBox from "components/Class/ClassTabs/OverviewTab/ClassCodeBox";
import PostBox from "components/Class/ClassTabs/OverviewTab/PostBox";
import { Grid } from "@mui/material";

export default function OverviewTab({ item, onChangeTab }) {
  return (
    <div>
      <CardContent
        style={{
          backgroundImage: `url("https://www.gstatic.com/classroom/themes/img_backtoschool.jpg")`,
          marginBottom: "10px",
          height: "150px",
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4" color="common.white" gutterBottom>
          {item.className}
        </Typography>
        <Typography variant="body1" color="text.primary">
          <strong>Subject:</strong> {item.subject}
        </Typography>
        <Typography variant="body1" color="text.primary">
          <strong>Description:</strong> {item.description}
        </Typography>
      </CardContent>
      <Grid container spacing={2}>
        <Grid xs={3} my={2} item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ClassCodeBox cjc={item.cjc} />
            </Grid>
            <Grid item xs={12}>
              <GradeStructure item={item} onChangeTab={onChangeTab} />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={9} my={2} item>
          <PostBox />
        </Grid>
      </Grid>
    </div>
  );
}
