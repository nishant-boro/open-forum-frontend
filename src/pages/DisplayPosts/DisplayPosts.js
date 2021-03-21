import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import PostCard from "../../components/TrendingPosts/PostCard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import FollowPeople from "../../components/TrendingPosts/FollowPeople";

const styles = (theme) => ({
  title: {
    paddingTop: "10px",
    color: "#689690",
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

class DisplayPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      posts: [],
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.type === "feed" && !this.props.auth.isAuthenticated) {
      this.props.history.push({
        pathname: "/login",
        state: {
          message: "Please login to see your feed!",
        },
      });
    }

    this.setState({ loading: true });
    const url =
      this.state.type === "feed"
        ? "/api/posts/feed/" + this.props.auth.user._id
        : "/trendingposts";
    axios
      .get(url)
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
      <div>
        <Typography
          variant="subtitle1"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          className={classes.title}
          gutterBottom
        >
          {this.state.type === "feed" ? "MY FEED" : "TRENDING POSTS"}
        </Typography>
        <Snackbar
          style={{ height: "80%", marginLeft: "20%" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={!this.state.loading && this.state.posts.length === 0}
          autoHideDuration={6000}
        >
          <Alert severity="info">
            {this.state.type === "feed"
              ? "No posts found. Please follow someone to see their posts!"
              : "No posts found!"}
          </Alert>
        </Snackbar>
        {this.state.loading ? (
          <CircularProgress className={classes.circular} />
        ) : (
          ""
        )}

        {this.props.auth.isAuthenticated ? (
          <div style={{ display: "flex" }}>
            <div style={{ marginTop: "24px", flexBasis: "65%" }}>
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
            {!this.state.loading ? (
              <FollowPeople
                type={this.props.type}
                loggedInUser={this.props.auth.user}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(
  withStyles(styles)(withRouter(DisplayPosts))
);
