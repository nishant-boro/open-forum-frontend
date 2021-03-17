import React, { useState } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import axios from "axios";
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  commentField: {
    width: "96%",
  },
  smallAvatar: {
    width: 25,
    height: 25,
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
          <Comment
            updateComments={props.updateComments}
            auth={props.auth}
            postId={props.postId}
            comment={item}
          />
        );
      })}
    </div>
  );
}
