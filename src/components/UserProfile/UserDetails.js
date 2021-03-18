import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Typography, Input } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

// @ts-ignore
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "light-grey",
    margin: "0 auto",
  },
  cardContent: {
    margin: "0 50px",
    textAlign: "left",

    marginTop: "0",
    marginBottom: "0",
  },
  large: {
    margin: "10px auto",
    width: "150px",
    height: "150px",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  main: {
    margin: "20px 200px",
  },
  grid: {
    margin: `0 ${theme.spacing(2)}px`,
  },
  bigContainer: {
    width: "80%",
    margin: "0 auto",
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  topInfo: {
    textAlign: "left",
  },
}));

export default function UserDetails(props) {
  const classes = useStyles();

  const selectAndUpload = (e) => {
    var inputElement = document.getElementById("photo");
    inputElement.onchange = (e) => {
      var file = e.target.files[0];

      var form = new FormData();
      form.append("photo", file);

      axios.put("/addphoto?id=" + props.data._id, form).then((res) => {
        props.updateImage(res.data.Location);
      });
    };
    inputElement.click();
  };

  return (
    <div>
      <div style={{ width: "15%", margin: "0 auto" }}>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="photo"
          name="photo"
          type="file"
        />
        <IconButton style={{ maxWidth: 400 }} onClick={selectAndUpload}>
          <Avatar
            src={props.data.photo}
            style={{
              margin: "10px",
              width: "200px",
              height: "200px",
            }}
          />
        </IconButton>
      </div>

      <div className={classes.bigContainer}>
        <Paper className={classes.paper}>
          <div className={classes.topInfo}>
            <Typography
              variant="subtitle1"
              style={{ fontWeight: "bold", fontSize: "30px" }}
              gutterBottom
            >
              User Profile
            </Typography>
          </div>
          <Grid style={{ marginTop: "20px" }} item container xs={12}>
            <Grid item xs={6}>
              <Typography
                style={{ textTransform: "uppercase" }}
                color="secondary"
                gutterBottom
              >
                Username
              </Typography>
              <Typography variant="h5" gutterBottom>
                {props.data.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ textTransform: "uppercase" }}
                color="secondary"
                gutterBottom
              >
                Email
              </Typography>
              <Typography variant="h5" gutterBottom>
                {props.data.email}
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "20px" }} item container xs={12}>
            <Grid item xs={6}>
              <Typography
                style={{ textTransform: "uppercase" }}
                color="secondary"
                gutterBottom
              >
                Score
              </Typography>
              <Typography variant="h5" gutterBottom>
                {props.data.score}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ textTransform: "uppercase" }}
                color="secondary"
                gutterBottom
              >
                Date of Birth
              </Typography>
              <Typography variant="h5" gutterBottom>
                {props.data.dob}
              </Typography>
            </Grid>
          </Grid>

          <Grid style={{ marginTop: "20px" }} item container xs={12}>
            <Grid item xs={6}>
              <Typography
                style={{ textTransform: "uppercase" }}
                color="secondary"
                gutterBottom
              >
                Badge
              </Typography>
              <Typography variant="h5" gutterBottom>
                {props.data.badge}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}
