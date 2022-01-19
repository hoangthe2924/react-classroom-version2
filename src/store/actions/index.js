import http from "../../axios-config";
import authHeader from "services/auth-header";

export const login = (values) => async (dispatch) => {
  return await http
    .post("/users/login/", values)
    .then((res) => {
      console.log("resbody", res.body);
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(changeState(true));
        return 1;
      }
    })
    .catch((error) => {
      console.log("err", error.response);
      if (error.response.status === 403) return -1;
      if (error.response.status === 412) return 2;
      return 0;
    });
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("user");
    dispatch(changeState(false));
    dispatch({ type: "CLEAR_USER" });
    dispatch({ type: "DELETE" });
  };
};

export const checkIsLoggedIn = () => {
  return async (dispatch) => {
    return await http
      .get("/users/info/", { headers: authHeader() })
      .then((res) => {
        if (res.data.id) {
          localStorage.setItem("mssv", JSON.stringify(res.data.studentId));
          dispatch(changeState(true));
          dispatch(setCurrentUser(res.data));
          // fetchAllClasses().then(
          //   (result) => {
          //     dispatch({ type: "FETCH", payload: result.data });
          //   },
          //   (error) => {
          //     console.log(error);
          //   }
          // );
          return;
        }
        dispatch(changeState(false));
        localStorage.removeItem("mssv");
        dispatch({ type: "DELETE" });
        dispatch({ type: "CLEAR_USER" });
      })
      .catch((error) => {
        dispatch(changeState(false));
        localStorage.removeItem("mssv");
        dispatch({ type: "DELETE" });
        dispatch({ type: "CLEAR_USER" });
      });
  };
};

export const changeState = (status) => {
  return {
    type: "IS_LOGGED_IN",
    status,
  };
};

export const setCurrentUser = (user) => {
  return {
    type: "SET_USER",
    user,
  };
};
