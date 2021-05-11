import {
  Button,
  Grid,
  Paper,
  TextField,
  Card,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import background from "../../assets/login.jpg";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookieservice from "../../component/cokieservice/Cookieservice.js";

const Login = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function login(id, name, email, type, password) {
    //console.log(id, name, email, type, password);
    await axios
      .post(
        "addresss",
        {
          id: id,
          name: name,
          email: email,
          type: type,
          password: password,
        }
      )
      .then(function (response) {
        Cookieservice.set("token", response.data.token);
        if (response.data.message === "Logged in successfully") {
          history.push("/homapage");
          // console.log("response1", response);
          // console.log("response2", response.data.message);
          // console.log("response2", response.data.token);
        } else {
          alert("wrong credentials");
        }
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }
  const onFormSubmit = (data) => {
    login(null, null, data.Email, "N", data.Password);
  };

  const onError = (errors) => {};
  const registerOptions = {
    Email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Enter a valid Email",
      },
    },
    Password: {
      required: "Password is required",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character",
      },
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  const responseGoogle = (response) => {
    
    login(response.profileObj.googleId, response.profileObj.name, response.profileObj.email, "G", null);
  };
  const responseFacebook = (response) => {
    login(response.id, response.name, response.email, "F", null);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "fixed",
      }}
    >
      <Grid container style={{ marginTop: "10%" }}>
        <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Paper elevation={5} style={{ opacity: ".8" }}>
            <Grid>
              <Card
                style={{
                  backgroundImage:
                    "linear-gradient(to top right, #3949d6, #3e4bbf,#3d479e,#3949d6)",
                }}
              >
                <Typography
                  style={{
                    color: "white",
                    fontWeight: "900",
                    fontSize: "200%",
                    fontFamily: "Brush Script MT",
                    marginLeft: "3%",
                  }}
                >
                  letslearnlive
                </Typography>
              </Card>
            </Grid>
            <Grid style={{ padding: "1.5%" }}>
              <form onSubmit={handleSubmit(onFormSubmit, onError)}>
                <Grid style={{ marginTop: "1.5%" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Email..."
                    label="Email"
                    {...register("Email", registerOptions.Email)}
                  />
                  {errors.Email && (
                    <p style={{ color: "red" }}>{errors.Email.message}</p>
                  )}
                </Grid>
                <Grid style={{ marginTop: "1.5%" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Password..."
                    label="Password"
                    {...register("Password", registerOptions.Password)}
                  />
                  {errors.Password && (
                    <p style={{ color: "red" }}>{errors.Password.message}</p>
                  )}
                </Grid>

                <Grid container style={{ marginTop: ".5%" }} spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <a className="link" href="">
                      <span
                        style={{
                          color: "#FF1493",
                          fontWeight: "800",
                          fontFamily: "cursive",
                        }}
                      >
                        Forgot Password?
                      </span>
                    </a>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <a className="link" href="/signup">
                      <span
                        style={{
                          color: "#FF1493",
                          fontWeight: "800",
                          fontFamily: "cursive",
                        }}
                      >
                        Register Yourself
                      </span>
                    </a>
                  </Grid>
                </Grid>

                <Grid container style={{ marginTop: "1.5%" }} spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      style={{ backgroundColor: "#191970" }}
                    >
                      <span
                        style={{
                          color: "#E6E6FA",
                          fontWeight: "800",
                          fontFamily: "cursive",
                        }}
                      >
                        LogIn
                      </span>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
                </Grid>
              </form>
              <Grid style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "120%",
                    fontWeight: "800",
                    fontFamily: "cursive",
                  }}
                >
                  Or
                </span>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1.5%",
                }}
              >
                <GoogleLogin
                  clientId="google client id"
                  render={(renderProp) => (
                    <GoogleLoginButton
                      onClick={renderProp.onClick}
                      // disabled={renderProp.disabled}
                    ></GoogleLoginButton>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={false}
                />
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1.5%",
                }}
              >
                <FacebookLogin
                  appId="facebook app id"
                  render={(renderProps) => (
                    <FacebookLoginButton
                      onClick={renderProps.onClick}
                    ></FacebookLoginButton>
                  )}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  isLoggedIn={false}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
      </Grid>
    </div>
  );
};

export default Login;
