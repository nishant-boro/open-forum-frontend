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
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing(2)}px 0px`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing(1),
  },
  media: {
    height: 200,
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
      console.log(res);
    });
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar src={url + "/api/users/photo/" + props.post.postedBy} />
        }
        action={
          props.post.postedBy._id === props.auth.user._id ? (
            <IconButton onClick={deletePost}>
              <DeleteIcon />
            </IconButton>
          ) : (
            ""
          )
        }
        title={
          <Link to={"/user/" + props.post.postedBy}>{props.post.username}</Link>
        }
        subheader={new Date(props.post.created).toDateString()}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
          {props.post.text}
        </Typography>
        {props.post.photo && (
          <div className={classes.photo}>
            <img
              className={classes.media}
              src={url + "/api/posts/photo/" + props.post._id}
            />
          </div>
        )}
      </CardContent>
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
        )}{" "}
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
      />
    </Card>
  );
}
