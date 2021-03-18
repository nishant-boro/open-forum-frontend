import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Typography, Input } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

const styles = {
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
};

const useStyles = makeStyles(styles);

export default function UserDetails(props) {
  const classes = useStyles();

  const selectAndUpload = (e) => {
    var inputElement = document.getElementById("photo");
    inputElement.onchange = (e) => {
      var file = e.target.files[0];

      var form = new FormData();
      form.append("photo", file);
      form.append("name", props.data.name);
      form.append("email", props.data.email);

      axios.put("/api/users/" + props.data._id, form).then((res) => {
        console.log(res.data);
      });
    };
    inputElement.click();
  };

  return (
    <div>
      <div style={{ width: "15%", margin: "0 auto" }}>
        <Input
          style={{ display: "none" }}
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

      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        <ListItem>
          <Typography
            variant="h5"
            style={{ margin: "0 0 0 100px" }}
            gutterBottom
          >
            Name: {props.data.name}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography
            variant="h5"
            style={{ margin: "0 0 0 100px" }}
            gutterBottom
          >
            Email: {props.data.email}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography
            variant="h5"
            style={{ margin: "0 0 0 100px" }}
            gutterBottom
          >
            Score: {props.data.score}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography
            variant="h5"
            style={{ margin: "0 0 0 100px" }}
            gutterBottom
          >
            Date of birth: {props.data.dob}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography
            variant="h5"
            style={{ margin: "0 0 0 100px" }}
            gutterBottom
          >
            Badge: {props.data.badge}
          </Typography>
        </ListItem>
        <Divider />
      </List>
    </div>
  );
}
