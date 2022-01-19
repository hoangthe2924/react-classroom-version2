import http from "axios-config";
import authHeader from "services/auth-header";

export function getUserInfo() {
  return http.get("/users/info", { headers: authHeader() });
}

export function getAllUsers() {
  return http.get("/users", { headers: authHeader() });
}

export function getAllAdmins() {
  return http.get("/users/admins", { headers: authHeader() });
}

export function getUserDetail(userId) {
  return http.get(`/users/${userId}`, { headers: authHeader() });
}

export function addAdmin(values) {
  return http.post(`/users/addAdmin`, values, {
    headers: authHeader(),
  });
}

export function banUser(values) {
  return http.put(`/users/banUser`, values, {
    headers: authHeader(),
  });
}

export function requestResetPassword(values) {
  return http.post(`/users/forgot-password`, values, {
    headers: authHeader(),
  });
}

export function resetPassword(userId, token, values) {
  return http.post(`/users/reset-password/${userId}/${token}`, values, {
    headers: authHeader(),
  });
}
