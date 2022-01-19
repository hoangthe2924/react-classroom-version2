import { Navigate } from "react-router-dom";
import * as actions from "store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ProtectedRoute({ children, adminRoute }) {
  const loginStatus = useSelector((state) => state.loginStatus);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const checkLoginStatus = () => {
    dispatch(actions.checkIsLoggedIn());
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (loginStatus === true) {
    if (adminRoute) {
      if (currentUser.isAdmin) {
        return children;
      }
      return <Navigate to="/dashboard" />;
    }
    return children;
  } else {
    localStorage.removeItem("prev-link");
    localStorage.setItem(
      "prev-link",
      `${window.location.pathname + window.location.search}`
    );
    return <Navigate to="/login" />;
  }

  //return loginStatus === true ? props.children : <Navigate to="/login" />;
}
ProtectedRoute.defaultProps = {
  adminRoute: false,
};
export default ProtectedRoute;
