import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  cardAuth: {
    marginLeft: "15%",
    maxWidth: 950,
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  cardGuest: {
    margin: "auto",
    maxWidth: 950,
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  cardContent: {
    paddingTop: "1px",
    backgroundColor: "white",
    padding: `${theme.spacing(2)}px 0px`,
  },
  cardHeader: {
    height: "70px",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
  },
  media: {
    maxHeight: "700px",
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function PostCard(props) {
  const classes = useStyles();

  const checkIfUserLikedPost = () => {
    const userDetails = props.auth.user;
    const userId = userDetails._id;
    return props.post.likes.indexOf(userId) !== -1;
  };

  const [state, setState] = useState({
    userLikedPost: props.auth.isAuthenticated && checkIfUserLikedPost(),
    likes: props.post.likes.length,
    comments: props.post.comments,
    isDialogOn: false,
  });

  const redirectIfGuestUser = () => {
    if (!props.auth.isAuthenticated) {
      props.router.push({
        pathname: "/login",
        state: {
          message: "Please login to like or comment!",
        },
      });
      return true;
    }
    return false;
  };

  const likePost = () => {
    if (!redirectIfGuestUser()) {
      const userDetails = props.auth.user;
      axios
        .put("/api/posts/like", {
          userId: userDetails._id,
          postId: props.post._id,
        })
        .then((res) => {
          setState({
            ...state,
            userLikedPost: !state.userLikedPost,
            likes: res.data.likes.length,
          });
        });
    }
  };

  const unlikePost = () => {
    if (!redirectIfGuestUser()) {
      const userDetails = props.auth.user;
      axios
        .put("/api/posts/unlike", {
          userId: userDetails._id,
          postId: props.post._id,
        })
        .then((res) => {
          setState({
            ...state,
            userLikedPost: !state.userLikedPost,
            likes: res.data.likes.length,
          });
        });
    }
  };

  const updateComments = (comments) => {
    setState({ ...state, comments: comments });
  };

  const url = process.env.BACKEND_URL;

  const deletePost = () => {
    axios.delete(url + "/api/posts/" + props.post._id).then((res) => {
      window.location.reload();
    });
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toDateString();
    const splittedDate = formattedDate.split(" ");
    return splittedDate[1] + " " + splittedDate[2] + ", " + splittedDate[3];
  };

  const setDialogBoxState = () => {
    setState({ ...state, isDialogOn: !state.isDialogOn });
  };

  const handleDialogAction = (e) => {
    setDialogBoxState();
    if (e.target.innerHTML === "Agree") {
      deletePost();
    }
  };

  return (
    <Card
      className={
        props.auth.isAuthenticated ? classes.cardAuth : classes.cardGuest
      }
    >
      <CardHeader
        avatar={
          <Avatar
            style={{ height: "60px", width: "60px" }}
            src={
              props.post.postedBy.photo === "No image"
                ? ""
                : props.post.postedBy.photo
            }
          />
        }
        action={
          props.auth.user.role === "Admin" ||
          props.post.postedBy._id === props.auth.user._id ? (
            <IconButton onClick={setDialogBoxState}>
              <DeleteIcon />
            </IconButton>
          ) : (
            ""
          )
        }
        title={props.post.title}
        subheader={
          <div>
            <div>
              Author:{" "}
              <Link to={"/user/" + props.post.postedBy._id}>
                {props.post.postedBy.name}
              </Link>
            </div>
            <div>
              posted on{" "}
              {formatDate(new Date(props.post.created).toDateString())}
            </div>
          </div>
        }
        className={classes.cardHeader}
      />
      <Dialog
        open={state.isDialogOn}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the post?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogAction} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDialogAction} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <CardContent style={{ paddingBottom: 0 }} className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
          {props.post.text}
        </Typography>
        {props.post.photo ? (
          <div className={classes.photo}>
            <img className={classes.media} src={props.post.photo} />
          </div>
        ) : (
          <div style={{ height: "2px" }}></div>
        )}
      </CardContent>
      <Divider />
      <CardActions>
        {state.userLikedPost ? (
          <IconButton
            onClick={unlikePost}
            className={classes.button}
            aria-label="Like"
            color="secondary"
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={likePost}
            className={classes.button}
            aria-label="Unlike"
            color="secondary"
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
        <span>{state.likes}</span>
        <IconButton
          className={classes.button}
          aria-label="Comment"
          color="secondary"
        >
          <CommentIcon />
        </IconButton>{" "}
        <span>{state.comments.length}</span>
      </CardActions>
      <Divider />
      <Comments
        postId={props.post._id}
        auth={props.auth}
        comments={state.comments}
        updateComments={updateComments}
        redirectIfGuestUser={redirectIfGuestUser}
      />
    </Card>
  );
}
