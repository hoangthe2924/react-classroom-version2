import http from "axios-config";
import authHeader from "services/auth-header";

export function fetchAllClasses() {
  return http.get("/classes", { headers: authHeader() });
}

export function fetchClassDetail(classId, strQuery) {
  return http.get(`/classes/${classId}` + strQuery, { headers: authHeader() });
}

export function getPeopleInClass(classId){
  return http.get(`/classes/${classId}/users`, { headers: authHeader() });
}

export function addClass(values) {
  return http.post("/classes/", values, { headers: authHeader() });
}

export function checkClassAvailable(values) {
  return http.post(`/classes/available/${values.CJC}`, { headers: authHeader() });
}

export function addNewAssignment(classId, values) {
  return http.post(`/assignments`, {classID: classId, ...values}, {
    headers: authHeader(),
  });
}

export function getAssignment(classId) {
  return http.get(`/assignments?classID=${classId}`, { headers: authHeader() });
}

export function getStudentList(classId) {
  return http.get(`/classes/${classId}/studentList`, { headers: authHeader() });
}

export function updateStudentList(classId, values) {
  return http.put(`/classes/${classId}/studentList`, values, {
    headers: authHeader(),
  });
}

export function updateAssignmentInfo(classId, values) {
  return http.put(`/assignments`, {classID: classId, ...values}, {
    headers: authHeader(),
  });
}

export function updateAssignmentOrder(classId, values) {
  return http.put(`/assignments/order`, {classID: classId, ...values}, {
    headers: authHeader(),
  });
}

export function deleteAssignment(classId, assignmentId) {
  return http.delete(`/assignments/${assignmentId}?classID=${classId}`, {
    headers: authHeader(),
  });
}

export function invitePeople(listEmail, classID, role) {
  return http.post(`/classes/people/invite`,{listEmail, classID, role}, {headers: authHeader()});
}

export function uploadAssignmentFile(assignmentId, file) {
  return http.post(`/assignments/${assignmentId}`,{file}, {headers: authHeader()});
}

export function getListAssignment(classId) {
  return http.get(`/assignments?classId=${classId}`, {headers: authHeader()});
}

