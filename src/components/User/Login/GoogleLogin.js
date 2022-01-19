import GoogleLogin from "react-google-login";
import http from "axios-config";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton() {
  let navigate = useNavigate();

  async function onGoogleLoginSuccess(googleAuth) {
    const values = JSON.stringify({
      token: googleAuth.tokenId,
    });
    await http
      .post("/users/google/login", values)
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
          let navigateLink = localStorage.getItem('prev-link');
          if(!navigateLink){
            navigateLink = '/dashboard';
          }
          navigate(navigateLink);
          window.location.reload();
        }
      })
      .catch((error) => {
        alert("Something wrong, please try again later!");
        console.log("err: ", error);
      });
  }
  function onGoogleLoginFailure(error) {
    console.log("error", error);
  }

  return (
    <GoogleLogin
      clientId="422658476305-fmoeo3bvcecjbitqisbldegt5cmmt34m.apps.googleusercontent.com"
      buttonText="Login With Google"
      onSuccess={onGoogleLoginSuccess}
      onFailure={onGoogleLoginFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}
