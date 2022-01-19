import http from "axios-config";
import authHeader from "services/auth-header";

export function getNotifications() {
    return http.get(`/grades/notifications`,{ 
        headers: authHeader(),
     });
}