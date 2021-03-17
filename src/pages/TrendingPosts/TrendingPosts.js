import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import PostCard from "../../components/TrendingPosts/PostCard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  card: {
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    marginTop: "10px",
    color: theme.palette.openTitle,
    textAlign: "center",
  },
  media: {
    minHeight: 330,
  },
  circular: {
    margin: "10% 50%",
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class TrendingPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/trendingposts")
      .then((res) => {
        this.setState({
          loading: false,
          posts: Array.isArray(res.data) ? res.data : [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <Typography variant="h4" className={classes.title}>
          Trending Posts
        </Typography>
        <Snackbar
          style={{ height: "60%" }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          open={!this.state.loading && this.state.posts.length === 0}
          autoHideDuration={6000}
        >
          <Alert severity="info">No posts found!</Alert>
        </Snackbar>
        {this.state.loading ? (
          <CircularProgress className={classes.circular} />
        ) : (
          ""
        )}
        <div style={{ marginTop: "24px" }}>
          {this.state.posts &&
            this.state.posts.map((item, i) => {
              return (
                <PostCard
                  router={this.props.history}
                  auth={this.props.auth}
                  post={item}
                  key={i}
                />
              );
            })}
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(
  withStyles(styles)(withRouter(TrendingPosts))
);
