import http from "axios-config";
import authHeader from "services/auth-header";

export function getStudentGrades(assignmentId, classId) {
    return http.get(`/grades/${assignmentId}/studentGrades?classID=${classId}`,{ 
        headers: authHeader(),
        
     });
}

export function updateStudentGrades(assignmentId, values, classId) {
    return http.put(`/grades/${assignmentId}/studentGrades?classID=${classId}`, values, {
        headers: authHeader(),
    });
}

export function updateFinalize(assignmentId, classId) {
    return http.put(`/grades/${assignmentId}/finalize?classID=${classId}`, {
        headers: authHeader(),
    });
}

export function getStudentGradesDetail(studentId, classId) {
    return http.get(`/grades/studentGradeDetail?classId=${classId}&studentId=${studentId}`,{ 
        headers: authHeader(),
    });
}

export function getAllGradeReviewOfClass(classId){
    return http.get(`/grades/teacherGradeReviewList?classID=${classId}`,{ 
        headers: authHeader(),
    });
}

export function getGradeReviewSummary(studentId, assignmentId){
    return http.get(`/grades/gradeReviewSummary?studentID=${studentId}&assignmentID=${assignmentId}`,{ 
        headers: authHeader(),
    });
}

export function getGradeReviewDetail(studentId, assignmentId){
    return http.get(`/grades/${assignmentId}/review?studentID=${studentId}`,{ 
        headers: authHeader(),
    });
}

export function createGradeReviewRequest(assignmentId, expectedGrade, message){
    return http.post(`/grades/${assignmentId}/review`, {expectedGrade, message} ,{ 
        headers: authHeader(),
    });
}

export function createCommentGR(gradeReviewId, assignmentId, comment){
    return http.post(`/grades/${assignmentId}/review/comment`, {gradeReviewId, comment} ,{ 
        headers: authHeader(),
    });
}

export function changeStatusGradeReview(gradeReviewId, newStatus, assignmentId, newGrade){
    return http.put(`/grades/${assignmentId}/review`, {status: newStatus, gradeReviewId, newGrade},{ 
        headers: authHeader(),
    });
}