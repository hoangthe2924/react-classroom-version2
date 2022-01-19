import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardActions,
  Typography,
  Divider,
  Container,
  CardContent,
  FormControl,
  Button,
  InputLabel,
  FilledInput,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import { useFormik } from "formik";
import {
  addNewAssignment,
  getAssignment,
  deleteAssignment,
  updateAssignmentInfo,
  updateAssignmentOrder,
} from "services/class.service";
import { useEffect } from "react";

export default function GradeStructureTab({ onUpdate }) {
  const params = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchAssignments() {
      const res = await getAssignment(params.id);
      const data = res.data ? res.data : [];
      setItems(data);
    }

    if (params) {
      fetchAssignments();
    } else {
      navigate("/", { replace: true });
    }
  }, [params, navigate]);

  const [tempData, setTempData] = useState(null);
  const [onEditModeIndex, setOnEditModeIndex] = React.useState(-1);

  const formik = useFormik({
    initialValues: {
      title: "",
      point: "",
    },
    onSubmit: async (values) => {
      const order = items.length + 1;
      values.order = order;
      let newItem = values;
      const res = await addNewAssignment(params.id, values);
      newItem.id = res.data.id;
      const newItems = items.concat(newItem);
      setItems(newItems);
      onUpdate();
    },
  });

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const itemList = Array.from(items);
    [itemList[result.source.index], itemList[result.destination.index]] = [
      itemList[result.destination.index],
      itemList[result.source.index],
    ];

    const reorderList = itemList.map((item, idx) => {
      return { ...item, order: idx };
    });

    setItems(reorderList);
    const newOrderList = { listAssignment: reorderList };
    await updateAssignmentOrder(params.id, newOrderList);
    onUpdate();
  };

  const handleEditGradeTitle = (index, title) => {
    setTempData({
      id: items[index].id,
      title: title,
      point: items[index].point,
      order: items[index].order,
    });
  };

  const handleEditGradePoint = (index, point) => {
    setTempData({
      id: items[index].id,
      title: items[index].title,
      point: point,
      order: items[index].order,
    });
  };

  const handleEditGradeForm = async (index) => {
    setTempData({
      id: items[index].id,
      title: items[index].title,
      point: items[index].point,
      order: items[index].order,
    });
    setOnEditModeIndex(index);
  };

  const handleSaveGradeForm = async (index) => {
    let p1 = items.slice(0, index);
    let p2 = [tempData];
    let p3 = items.slice(index + 1);
    const newItems = p1.concat(p2).concat(p3);
    setItems(newItems);
    setOnEditModeIndex(-1);
    setTempData(null);
    await updateAssignmentInfo(params.id, tempData);
    onUpdate();
  };

  const handleDeleteGradeForm = async (index) => {
    const deleteItem = items[index];
    let p1 = items.slice(0, index);
    let p2 = items.slice(index + 1);
    const newItems = p1.concat(p2);
    const reorderList = newItems.map((item, idx) => {
      return { ...item, order: idx };
    });
    setItems(reorderList);
    await deleteAssignment(params.id, deleteItem.id);
    const newOrderList = { listAssignment: reorderList };
    await updateAssignmentOrder(params.id, newOrderList);

    onUpdate();
  };

  return (
    <React.Fragment>
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Typography variant={"h4"} align="center" gutterBottom>
            Class Grade Structure
          </Typography>
          <Typography variant={"h6"} align="center">
            Drag and Drop to change Grade Structure
          </Typography>
          <Divider />
          <Container maxWidth="lg">
            <Box sx={{ width: "60%", mx: "auto" }}>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                  {(provided) => (
                    <ul
                      className="characters"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {items.map(({ title, point, order }, index) => {
                        return (
                          <Draggable
                            key={title + order}
                            draggableId={title + order}
                            index={index}
                          >
                            {(provided) => (
                              <Card
                                variant="outlined"
                                sx={{
                                  my: 2,
                                  mx: "auto",
                                  maxWidth: "700px",
                                  width: "100%",
                                }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <CardContent>
                                  <FormControl
                                    variant="filled"
                                    sx={{ marginBottom: 3, width: "100%" }}
                                  >
                                    <InputLabel htmlFor="form-title">
                                      Grade Title
                                    </InputLabel>
                                    <FilledInput
                                      id="form-title"
                                      size="small"
                                      value={
                                        onEditModeIndex === index
                                          ? tempData["title"]
                                          : title
                                      }
                                      disabled={!(onEditModeIndex === index)}
                                      onChange={(e) => {
                                        handleEditGradeTitle(
                                          index,
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </FormControl>

                                  <FormControl
                                    variant="filled"
                                    sx={{ marginBottom: 0, width: "100%" }}
                                  >
                                    <InputLabel htmlFor="form-detail">
                                      Grade Point
                                    </InputLabel>
                                    <FilledInput
                                      id="form-detail"
                                      size="small"
                                      value={
                                        onEditModeIndex === index
                                          ? tempData["point"]
                                          : point
                                      }
                                      disabled={!(onEditModeIndex === index)}
                                      onChange={(e) => {
                                        handleEditGradePoint(
                                          index,
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </FormControl>
                                </CardContent>
                                <CardActions disableSpacing>
                                  {onEditModeIndex === index ? (
                                    <Button
                                      size="small"
                                      color="primary"
                                      onClick={() => {
                                        handleSaveGradeForm(index);
                                      }}
                                      endIcon={<SaveIcon />}
                                    >
                                      Save
                                    </Button>
                                  ) : (
                                    <Button
                                      size="small"
                                      color="primary"
                                      endIcon={<EditIcon />}
                                      onClick={() => {
                                        handleEditGradeForm(index);
                                      }}
                                    >
                                      Edit
                                    </Button>
                                  )}

                                  <Button
                                    size="small"
                                    color="secondary"
                                    endIcon={<DeleteIcon />}
                                    onClick={() => {
                                      handleDeleteGradeForm(index);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </CardActions>
                              </Card>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>
            <Card variant="outlined" sx={{ m: 2 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Add New
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    label="Grade Title"
                    type="text"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    fullWidth
                    variant="standard"
                  />

                  <TextField
                    required
                    margin="dense"
                    id="point"
                    name="point"
                    label="Grade Point"
                    type="text"
                    value={formik.values.point}
                    onChange={formik.handleChange}
                    fullWidth
                    variant="standard"
                  />
                </form>
              </CardContent>
              {formik.isSubmitting && (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
              {!formik.isSubmitting && (
                <CardActions disableSpacing>
                  <Button
                    size="small"
                    color="secondary"
                    endIcon={<CheckIcon />}
                    onClick={formik.handleSubmit}
                  >
                    Confirm
                  </Button>
                </CardActions>
              )}
            </Card>
          </Container>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
