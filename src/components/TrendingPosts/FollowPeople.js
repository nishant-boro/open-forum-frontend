import React, { useState, useEffect } from "react";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ViewIcon from "@material-ui/icons/Visibility";
import { Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    position: "fixed",
    marginLeft: "100px",
    marginTop: "24px",
    width: "500px",
    padding: theme.spacing(1),
    margin: 0,
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontWeight: "bold",
    fontSize: "20px",
    textAlign: "center",
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  follow: {
    right: theme.spacing(2),
  },
  snack: {
    color: theme.palette.protectedTitle,
  },
  viewButton: {
    verticalAlign: "middle",
  },
}));

export default function FollowPeople(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    openSnackBar: false,
    usersToFollow: [],
    followMessage: "",
    loading: false,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    axios
      .get("/api/users/findpeople/" + props.loggedInUser._id)
      .then((res) => {
        setState({ ...state, usersToFollow: res.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clickFollow = (item, idx) => {
    axios
      .put("/api/users/follow", {
        userId: props.loggedInUser._id,
        followId: item._id,
      })
      .then((res) => {
        var currUserstoFollow = state.usersToFollow;
        currUserstoFollow.splice(idx, 1);
        setState({
          ...state,
          usersToFollow: currUserstoFollow,
          openSnackBar: true,
          followMessage: `Following user: ${item.name}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeSnackBar = () => {
    setState({ ...state, openSnackBar: false });
    if (props.type === "feed") {
      window.location.reload();
    }
  };

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="subtitle1" className={classes.title}>
          Follow Other Users
        </Typography>
        <List style={{ overflowY: "auto", maxHeight: "500px" }}>
          {state.usersToFollow.map((item, i) => {
            return (
              <span key={i}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar src={item.photo === "No image" ? "" : item.photo} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to={"/user/" + item._id}>
                      <IconButton
                        color="secondary"
                        className={classes.viewButton}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Link>
                    <Button
                      aria-label="Follow"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        clickFollow(item, i);
                      }}
                    >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            );
          })}
        </List>
        <List style={{ marginTop: "15%" }}>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            style={{
              position: "absolute",
            }}
            open={state.openSnackBar}
            onClose={closeSnackBar}
            autoHideDuration={2000}
          >
            <Alert severity="success">{state.followMessage}</Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            style={{
              position: "absolute",
            }}
            open={
              !state.openSnackBar &&
              !state.loading &&
              state.usersToFollow.length === 0
            }
          >
            <Alert severity="info">No more users found to follow</Alert>
          </Snackbar>
        </List>
      </Paper>
    </div>
  );
}
