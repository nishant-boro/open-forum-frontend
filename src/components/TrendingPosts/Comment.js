import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import axios from "axios";
import { Divider, Grid, Paper } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Buffer } from "buffer";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: 0,
  },
  commentText: {
    padding: "1px",
  },

  alongComment: {
    marginLeft: "5px",
    padding: "1px",
  },

  button: {
    margin: theme.spacing(1),
  },
}));

export default function Comment(props) {
  const classes = useStyles();

  const checkIfUserLikedComment = () => {
    const userDetails = props.auth.user;
    const userId = userDetails._id;
    for (let item of props.comment.likes) {
      if (item._id === userId) {
        return true;
      }
    }
    return false;
  };

  const [state, setState] = useState({
    userLikedComment: props.auth.isAuthenticated && checkIfUserLikedComment(),
  });

  const deleteComment = () => {
    if (!props.redirectIfGuestUser()) {
      const userDetails = props.auth.user;

      axios
        .put("/api/posts/uncomment", {
          userId: userDetails._id,
          postId: props.postId,
          comment: props.comment,
        })
        .then((res) => {
          props.updateComments(res.data.comments);
        });
    }
  };

  const likeUnlikeComment = (isLike) => {
    if (!props.redirectIfGuestUser()) {
      const userDetails = props.auth.user;
      const url = isLike ? "api/post/likeacomment" : "/api/post/unlikeacomment";

      axios
        .put(url, {
          userId: userDetails._id,
          postedBy: props.comment.postedBy._id,
          postId: props.postId,
          comment: props.comment.text,
        })
        .then((res) => {
          props.updateComments(res.data.comments);
          setState({
            ...state,
            userLikedComment: !state.userLikedComment,
          });
        });
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toDateString();
    const splittedDate = formattedDate.split(" ");
    return splittedDate[1] + " " + splittedDate[2] + ", " + splittedDate[3];
  };

  return (
    <Paper style={{ backgroundColor: "#f0f0f0", padding: "5px 20px" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar
            alt="Remy Sharp"
            src={
              props.comment.postedBy.photo === "No image"
                ? ""
                : props.comment.postedBy.photo
            }
          />
        </Grid>
        <Grid style={{ justifyContent: "left" }} item xs zeroMinWidth>
          <h4 style={{ margin: 0, marginBottom: "4px", textAlign: "left" }}>
            {props.comment.postedBy.name}
          </h4>
          <div className={classes.container}>
            <div className={classes.commentText}>
              <p style={{ margin: 0, textAlign: "left" }}>
                {props.comment.text}
              </p>
            </div>
            <div className={classes.alongComment}>
              {props.auth.isAuthenticated &&
                props.auth.user._id === props.comment.postedBy._id && (
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={deleteComment}
                  />
                )}
            </div>
            <div className={classes.alongComment}>
              {state.userLikedComment ? (
                <IconButton
                  onClick={likeUnlikeComment.bind(this, false)}
                  className={classes.button}
                  aria-label="Like"
                  color="secondary"
                  style={{ margin: 0, padding: 0, cursor: "pointer" }}
                >
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={likeUnlikeComment.bind(this, true)}
                  className={classes.button}
                  aria-label="Unlike"
                  style={{ margin: 0, padding: 0, cursor: "pointer" }}
                  color="secondary"
                >
                  <FavoriteBorderIcon />
                </IconButton>
              )}
            </div>
            <div className={classes.alongComment}>
              {props.comment.likes.length}
            </div>
          </div>
          <p style={{ margin: 0, textAlign: "left", color: "gray" }}>
            posted on {formatDate(props.comment.created)}
          </p>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    </Paper>
  );
}
