import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#efefef",
    padding: `${theme.spacing(3)}px 0px 1px`,
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(65, 150, 136, 0.09)",
    boxShadow: "none",
  },
  cardContent: {
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  photoButton: {
    height: 30,
    marginBottom: 5,
  },
  input: {
    display: "none",
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "90%",
  },
  submit: {
    margin: theme.spacing(2),
  },
  filename: {
    verticalAlign: "super",
  },
}));

export default function CreatePostCard(props) {
  const classes = useStyles();

  const { handleChange, photo, error, title, description, createPost } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <TextField
          placeholder="Enter the title"
          rows="1"
          // value={values.text}
          onChange={handleChange("title")}
          className={classes.textField}
          margin="normal"
        />

        <CardContent className={classes.cardContent}>
          <TextField
            placeholder="Share your thoughts ..."
            multiline
            rows="3"
            // value={values.text}
            onChange={handleChange("description")}
            className={classes.textField}
            margin="normal"
          />
          <input
            accept="image/*"
            onChange={handleChange("photo")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="secondary"
              className={classes.photoButton}
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>{" "}
          <span className={classes.filename}>{photo ? photo.name : ""}</span>
          {/* {error && (
            // <Typography component="p" color="error">
            //   <Icon color="error" className={classes.error}>
            //     error
            //   </Icon>
            //   {error}
            // </Typography>
          )} */}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            disabled={title === "" || description === ""}
            onClick={createPost}
            className={classes.submit}
          >
            POST
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
