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
      <div>
        <Typography
          variant="subtitle1"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          className={classes.title}
          gutterBottom
        >
          TRENDING POSTS
        </Typography>
        <Snackbar
          style={{ height: "60%" }}
          anchorOrigin={{
            vertical: "top",
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
          <FollowPeople loggedInUser={this.props.auth.user} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(
  withStyles(styles)(withRouter(TrendingPosts))
);
