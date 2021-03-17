import { withStyles } from "@material-ui/core";
import { Component } from "react";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  h1: {
    margin: "auto",
    paddingTop: 0,
    textAlign: "center",
    marginTop: "20%",
    paddingBottom: theme.spacing(3),
  },
  h5: {
    margin: "auto",
    paddingTop: 0,
    fontWeight: "200px",
    textAlign: "center",
    fontSize: "20px",
    paddingBottom: theme.spacing(3),
  },
});

class PageNotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography align="center" variant="h1" className={classes.h1}>
          404
        </Typography>
        <Typography align="center" variant="h5" className={classes.h5}>
          Sorry but we could not find the page you are looking for
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(PageNotFound);
