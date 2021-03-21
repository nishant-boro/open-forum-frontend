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
    marginLeft: "30px",
    width: "500px",
    padding: theme.spacing(1),
    margin: 0,
  }),
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

export default function FollowingDetails(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    openSnackBar: false,
    followedUsers: props.users,
    unfollowMessage: "",
  });

  const clickUnfollow = (item, idx) => {
    axios
      .put("/api/users/unfollow", {
        userId: props.loggedInUserId,
        unfollowId: item._id,
      })
      .then((res) => {
        var currFollowedUsers = state.followedUsers;
        currFollowedUsers.splice(idx, 1);
        setState({
          ...state,
          followedUsers: currFollowedUsers,
          openSnackBar: true,
          unfollowMessage: `Unfollowed user: ${item.name}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeSnackBar = () => {
    setState({ ...state, openSnackBar: false });
  };

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography
          variant="subtitle1"
          style={{
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.54)",
            fontWeight: "bold",
            fontSize: "30px",
          }}
          gutterBottom
        >
          People I Follow
        </Typography>
        <List>
          {state.followedUsers.map((item, i) => {
            return (
              <span key={i}>
                <ListItem>
                  {/* <ListItemAvatar className={classes.avatar}>
                    <Avatar src={item.photo === "No image" ? "" : item.photo} />
                  </ListItemAvatar> */}
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
                        clickUnfollow(item, i);
                      }}
                    >
                      Unfollow
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
            <Alert severity="success">{state.unfollowMessage}</Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            style={{
              position: "absolute",
            }}
            open={!state.openSnackBar && state.followedUsers.length === 0}
          >
            <Alert severity="info">You are not following anyone!</Alert>
          </Snackbar>
        </List>
      </Paper>
    </div>
  );
}
