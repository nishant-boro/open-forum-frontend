import React, { useState } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: "96%",
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`,
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em",
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer",
  },
}));

export default function Comments(props) {
  const classes = useStyles();
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const addComment = (event) => {
    if (event.keyCode == 13 && event.target.value) {
      event.preventDefault();

      const userDetails = props.auth.user;
      axios
        .put("/api/posts/comment/", {
          userId: userDetails._id,
          postId: props.postId,
          comment: text,
        })
        .then((res) => {
          setText("");
          props.updateComments(res.data.comments);
        });
    }
  };

  const deleteComment = () => {
    const userDetails = props.auth.user;
    axios
      .put("/api/posts/uncomment", {
        userId: userDetails._id,
        postId: props.postId,
        comment: text,
      })
      .then((res) => {
        props.updateComments(res.data.comments);
      });
  };

  const commentBody = (item) => {
    return (
      <p className={classes.commentText}>
        <Link to={"/user/" + item.postedBy}>{item.username}</Link>
        <br />
        {item.text}
        <span className={classes.commentDate}>
          {new Date(item.created).toDateString()} |
          {props.auth.isAuthenticated && props.auth.user._id === item.postedBy && (
            <Icon onClick={deleteComment} className={classes.commentDelete}>
              delete
            </Icon>
          )}
        </span>
      </p>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar className={classes.smallAvatar} src={"/api/users/photo/"} />
        }
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={handleChange}
            placeholder="Write something ..."
            className={classes.commentField}
            margin="normal"
          />
        }
        className={classes.cardHeader}
      />
      {props.comments.map((item, i) => {
        return (
          <CardHeader
            // avatar={d
            //   <Avatar
            //     className={classes.smallAvatar}
            //     src={"/api/users/photo/" + item.postedBy._id}
            //   />
            // }
            title={commentBody(item)}
            className={classes.cardHeader}
            key={i}
          />
        );
      })}
    </div>
  );
}
