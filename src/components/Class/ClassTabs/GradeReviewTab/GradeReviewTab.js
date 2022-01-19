import { getAllGradeReviewOfClass } from "services/grade.service";
import { useState, Fragment, useEffect } from "react";
import Loading from "components/Loading";
import { useParams } from "react-router-dom";
import { Typography, Divider } from "@mui/material";
import ListGradeReviewRequest from "components/Class/ClassTabs/GradeReviewTab/GradeReview/ListGradeReviewRequest";

export default function GradeReviewTab({ props }) {
  const [openLoading, setOpenLoading] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [listGR, setListGR] = useState([]);
  const params = useParams();

  const fetchListGradeReview = async () => {
    try {
      setOpenLoading(true);
      const res = await getAllGradeReviewOfClass(params.id);
      setListGR(res.data.sort(function ( a, b ) {
        if ( a.status < b.status ){
          return -1;
        }
        if ( a.status > b.status ){
          return 1;
        }
        return 0;
      }));
      setOpenLoading(false);
    } catch (error) {
      setOpenLoading(false);
    }
  };

  useEffect(()=>{
    fetchListGradeReview();
  },[]);

  const handleUpdate = () => {
    fetchListGradeReview();
  };
  
  const handleDescending = () => {
    setIsAscending(false);
    setListGR([...listGR.reverse()]);
  };

  const handleAscending = () => {
    setIsAscending(true);
    setListGR([...listGR.reverse()]);
  }

  return (
    <Fragment>
      <Typography sx={{ m: 1 }} variant="h4">
        Grade Review Requests
      </Typography>
      <Divider sx={{my: 2}} width="100%" />
      <ListGradeReviewRequest list={listGR} onUpdate={handleUpdate} isAscending={isAscending} handleAscending={handleAscending} handleDescending={handleDescending}/>
      <Loading open={openLoading} />
    </Fragment>
  );
}
