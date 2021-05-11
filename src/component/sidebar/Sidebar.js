import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {Button} from "@material-ui/core";
import Home from "../../Pages/home/Home.js";
import Simplepage from "../../Pages/simplepage/Simplepage.js";
import { Route, Switch, HashRouter, Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Cookieservice from "../cokieservice/Cookieservice.js"

const drawerWidth = 300;
const appbarHeight = 100;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#535ba0",
    height: appbarHeight,
    transition: theme.transitions.create(["margin", "width", "height"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  //for drawer width and drawer and appbar configuration
  drawerPaper: {
    background: "#24252d",
    width: drawerWidth,
  },

  //for drawer header
  drawerHeader: {
    height: appbarHeight,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  //for the contents in body
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  //for indentifing the click
  clicked: {
    background: "#c83349",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 40px",
  },
}));

const Sidebar = () => {
  const [Hclicked, setHclicked] = React.useState(false);
  const onHclicked = (h) => {
    //h.target.style.background = "#c83349";
    setHclicked(true);
    setSclicked(false);
  };
  const [Sclicked, setSclicked] = React.useState(false);
  const onSclicked = (s) => {
    // s.target.style.background = "inherit";
    setSclicked(true);
    setHclicked(false);
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawer = () => {
    setOpen(!open);
  };
  const [list, setList] = React.useState(false);
  const handleClick = () => {
    setList(!list);
  };

  const onLogout = () => {
    Cookieservice.remove('token')
    window.location.reload(true);
  };

  return (
    <HashRouter>
      <div className={classes.root}>
        {/* need to read more about CssBaseline */}
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar style={{ marginTop: "2%", paddingRight: "8%" }}>
            <Grid container>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <MenuIcon fontSize="large" onClick={handleDrawer} />
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={6}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Typography variant="h4" noWrap>
                  <b>LetsLearnLive</b>
                </Typography>{" "}
                <Select
                  disableUnderline={true}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                  }}
                  IconComponent={PersonPinIcon}
                >
                  <MenuItem>Account</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      style={{ backgroundColor: "#000000" }}
                      onClick={onLogout}
                    >
                      <span
                        style={{
                          color: "#FFFAF0",
                          fontWeight: "800",
                          fontFamily: "cursive",
                        }}
                      >
                        LogOut
                      </span>
                    </Button>
                  </MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div
            className={classes.drawerHeader}
            style={{ background: "#2d2e39", width: "100%" }}
          >
            <TextField
              placeholder="Search..."
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon style={{ color: "white" }} />
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  color: "white",
                },
                disableUnderline: true,
              }}
            />
          </div>
          <Divider />
          <List
            style={{
              marginTop: "14%",
              paddingRight: "15%",
              paddingLeft: "8%",
            }}
          >
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onClick={onHclicked}
            >
              <ListItem
                button
                className={clsx({
                  [classes.clicked]: Hclicked,
                })}
              >
                <ListItemText
                  style={{ color: "white", fontWeight: "300" }}
                  primary="HOMEPAGE"
                />
              </ListItem>
            </Link>
            <Divider style={{ marginTop: "5%", marginBottom: "3%" }} />

            <Link
              to="/Simplepage"
              style={{ textDecoration: "none" }}
              onClick={onSclicked}
            >
              <ListItem
                button
                className={clsx({
                  [classes.clicked]: Sclicked,
                })}
              >
                <ListItemText
                  style={{ color: "white", fontWeight: "300" }}
                  primary="SIMPLE PAGE"
                />
              </ListItem>
            </Link>
            <Divider style={{ marginTop: "5%", marginBottom: "3%" }} />

            <ListItem button>
              <ListItemText
                style={{ color: "white", fontWeight: "300" }}
                primary="SHORTCODES"
              />
            </ListItem>
            <Divider style={{ marginTop: "5%", marginBottom: "3%" }} />

            <ListItem button onClick={handleClick}>
              <ListItemText
                style={{ color: "white", fontWeight: "300" }}
                primary="DROPDOWN"
              />
              {list ? (
                <ExpandLess style={{ color: "white" }} />
              ) : (
                <ExpandMore style={{ color: "white" }} />
              )}
            </ListItem>
            <Collapse in={list} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                style={{ paddingLeft: "6%" }}
              >
                <ListItem button>
                  <ListItemText
                    style={{ color: "white", fontWeight: "300" }}
                    primary="First"
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    style={{ color: "white", fontWeight: "300" }}
                    primary="Second"
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    style={{ color: "white", fontWeight: "300" }}
                    primary="Third"
                  />
                </ListItem>
              </List>
            </Collapse>
            <Divider style={{ marginTop: "5%", marginBottom: "3%" }} />
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          <Switch>
            <Route exact path="/Simplepage" component={Simplepage} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
      </div>
    </HashRouter>
  );
};
export default Sidebar;
