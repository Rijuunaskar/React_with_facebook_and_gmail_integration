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
import axios from "axios";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Modal from "@material-ui/core/Modal";
import { useHistory } from "react-router-dom";
import teacher from "../../assets/teacher.png";
import student from "../../assets/student.png";
import background from "../../assets/signup.jpg";

const Singup = () => {
  const history = useHistory();
  const [modalopen, setModalopen] = React.useState(false);
  const [details, setDetails] = React.useState({});
  const handleClose = () => {
    setModalopen(false);
  };

  async function singup(role) {
    await axios
      .post(
        "{address}",
        {
          id: details.id,
          name: details.name,
          email: details.email,
          type: details.type,
          token: details.token,
          role: role,
          password: details.password,
          location: details.location,
          mobileno: details.mobileno
        }
      )
      .then(function (response) {
        //  console.log("response1", response);
        // console.log("response2", response.data.message);
        if (response.data.message === "Successfully registered") {
          history.push("/login");
        } else {
          alert("Email Already in Use");
          setModalopen(false);
        }
      });
  }

  const teacherclick = () => {
    // console.log("Teacher");
    // console.log(details);
    singup("Teacher");
  };
  const studentclick = () => {
    // console.log("Student");
    // console.log(details);
    singup("Student");
  };
  // *********** this is for modal design  ********************
  const modal = (
    <Grid
      style={{
        marginTop: "4%",
        marginLeft: "18%",
        width: "60%",
        height: "80%",
      }}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Paper
          elevation={9}
          style={{
            padding: "2%",
            width: "100%",
            height: "fit-content",
          }}
        >
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                color: "#6495ED",
                fontWeight: "800",
                fontFamily: "cursive",
              }}
            >
              Please Select Your Role
            </Typography>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: "2%" }}>
            <Grid item xs={12} sm={12} md={6} lg={6} onClick={teacherclick}>
              <Grid>
                <img
                  src={teacher}
                  alt={"logo"}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                ></img>
              </Grid>
              <Grid style={{ marginLeft: "43%" }}>
                <Typography
                  style={{
                    color: "#6495ED",
                    fontWeight: "800",
                    fontFamily: "cursive",
                  }}
                >
                  Teacher
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} onClick={studentclick}>
              <Grid>
                <img
                  src={student}
                  alt={"logo"}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                ></img>
              </Grid>
              <Grid style={{ marginLeft: "41%" }}>
                <Typography
                  style={{
                    color: "#6495ED",
                    fontWeight: "800",
                    fontFamily: "cursive",
                  }}
                >
                  Student
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </ClickAwayListener>
    </Grid>
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  //password.current = watch("password", "");
  const password = watch("password", "");
  const onFormSubmit = (data) => {
    let Register = {
      name: data.fullname,
      email: data.email,
      password: data.password,
      type: "N",
      mobileno:data.mobileno, 
      location:data.location,
    };
    setDetails(Register);
    console.log(Register)
    setModalopen(true);
  };
  const onError = (errors) => {};
  const registerOptions = {
    fullname: {
      required: "FullName is required",
      pattern: {
        value: /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/i,
        message: "Enter a valid FullName",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Enter a valid Email",
      },
    },
    password: {
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
    cpassword: {
      required: "Password is required",
      validate: (value) => value === password || "The passwords do not match",
    },
    mobileno: {
      required: "MobileNo is required",
    },
    location: {
      required: "Location is required",
    },
  };

  const responseGoogle = (response) => {
    let Register = {
      id: response.profileObj.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email,
      type: "G",
      token: response.accessToken,
    };
    setDetails(Register);
    setModalopen(true);
  };
  const responseFacebook = (response) => {
    let Register = {
      id: response.id,
      name: response.name,
      email: response.email,
      type: "F",
      token: response.accessToken,
    };
    setDetails(Register);
    setModalopen(true);
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
      <Grid container style={{ marginTop: "7%" }}>
        <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
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
              <Grid>
                <Typography
                  style={{
                    color: "#6495ED",
                    fontWeight: "550",
                    fontFamily: "cursive",
                    marginLeft: "1.5%",
                  }}
                >
                  Please Fill Your Details Below
                </Typography>
              </Grid>

              <form onSubmit={handleSubmit(onFormSubmit, onError)}>
                <Grid container spacing={2} style={{ marginTop: ".5%" }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter your fullname"
                      label="Fullname"
                      {...register("fullname", registerOptions.fullname)}
                    />
                    {errors.fullname && (
                      <p style={{ color: "red" }}>{errors.fullname.message}</p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter a Email"
                      label="Email"
                      {...register("email", registerOptions.email)}
                    />
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email.message}</p>
                    )}
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginTop: ".5%" }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter a password"
                      label="password"
                      {...register("password", registerOptions.password)}
                    />
                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password.message}</p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="confirm password"
                      label="confirm password"
                      {...register("cpassword", registerOptions.cpassword)}
                    />
                    {errors.cpassword && (
                      <p style={{ color: "red" }}>{errors.cpassword.message}</p>
                    )}
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginTop: ".5%" }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter a Mobile No."
                      label="mobileno"
                      {...register("mobileno", registerOptions.mobileno)}
                    />
                    {errors.mobileno && (
                      <p style={{ color: "red" }}>{errors.mobileno.message}</p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter Location"
                      label="location"
                      {...register("location", registerOptions.location)}
                    />
                    {errors.location && (
                      <p style={{ color: "red" }}>{errors.location.message}</p>
                    )}
                  </Grid>
                </Grid>

                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1%",
                  }}
                >
                  <Grid>
                    <span
                      style={{
                        color: "#FF1493",
                        fontWeight: "800",
                        fontFamily: "cursive",
                      }}
                    >
                      Do you already have a account?
                    </span>
                    <a className="link" href="/login">
                      <span
                        style={{
                          color: "#FF1493",
                          fontWeight: "800",
                          fontFamily: "cursive",
                        }}
                      >
                        Click Here
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
                        SignUp
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
                    >
                      SignUp With Google
                    </GoogleLoginButton>
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
                    <FacebookLoginButton onClick={renderProps.onClick}>
                      SignUp With Facebook
                    </FacebookLoginButton>
                  )}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  isLoggedIn={false}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
      </Grid>
      <Modal open={modalopen}>{modal}</Modal>
    </div>
  );
};

export default Singup;
