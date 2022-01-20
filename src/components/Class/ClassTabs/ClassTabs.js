import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OverviewTab from "components/Class/ClassTabs/OverviewTab/OverviewTab";
import PeopleTab from "components/Class/ClassTabs/PeopleTab/PeopleTab";
import GradeStructureTab from "components/Class/ClassTabs/GradeStructureTab/GradeStructureTab";
import GradeBoard from "components/Class/ClassTabs/GradeBoardTab/GradeBoardTab";
import GradeReviewTab from "./GradeReviewTab/GradeReviewTab";
import AssignmentTab from "./GradeStructureTab/AssignmentTab";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(()=>{
    setValue(0);
  },[props.other]);

  let isTeacher = props.item?.requesterRole === "teacher";
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="People" {...a11yProps(1)} />
          <Tab label="Grades" {...a11yProps(2)} />
          {isTeacher && <Tab label="Grade Structure" {...a11yProps(3)} />}
          {!isTeacher && <Tab label="Assignments" {...a11yProps(3)} />}
          {isTeacher && <Tab label="Grade Review" {...a11yProps(4)} />}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OverviewTab item={props.item} onChangeTab={setValue} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PeopleTab items={props.item} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GradeBoard items={props.item} />
      </TabPanel>
      {isTeacher && (
        <TabPanel value={value} index={3}>
          <GradeStructureTab items={props.item} onUpdate={props.onUpdate} />
        </TabPanel>
      )}
      {!isTeacher && (
        <TabPanel value={value} index={3}>
          <AssignmentTab items={props.item} />
        </TabPanel>
      )}
      {isTeacher && (
        <TabPanel value={value} index={4}>
          <GradeReviewTab />
        </TabPanel>
      )}
    </Box>
  );
}
