import http from "axios-config";

export async function login(values) {
  return http
    .post("/users/login/", values)
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.log("err: ", error);
      return false;
    });
}

export function logout() {
  localStorage.removeItem("user");
}

export async function register(values) {
  return http
    .post("/users/register/", values)
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        alert(
          "Register successfully. Please check your email to activate your account!"
        );
      } else {
        alert("Please try again later!");
      }
    })
    .catch((error) => {
      alert(error.response.data || "Something wrong, please try again later!");
      console.log("err: ", error);
    });
}

export function getToken() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).accessToken : {};
}
