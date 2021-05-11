import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Card,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const DefaultHome = () => {
  const history = useHistory();
  const loginclick = () => {
    // console.log("Teacher");
    // console.log(details);
    history.push("/login");
  };
  const signupclick = () => {
    // console.log("Teacher");
    // console.log(details);
    history.push("/signup");
  };
  return (
    <div>
      <Toolbar style={{ backgroundColor: "#535ba0" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="h6">
              <span
                style={{
                  color: "#E6E6FA",
                  fontWeight: "800",
                  fontFamily: "cursive",
                }}
              >
                Welcome In LetsLearnLive
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid style={{ marginLeft: "60%" }}>
              <Button color="inherit" onClick={loginclick}>
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
              <Button color="inherit" onClick={signupclick}>
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
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
};
export default DefaultHome;
