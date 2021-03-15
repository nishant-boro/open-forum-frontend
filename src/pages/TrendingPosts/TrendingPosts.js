import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import PostCard from "../../components/TrendingPosts/PostCard";

const styles = (theme) => ({
  card: {
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "1em",
  },
  media: {
    minHeight: 330,
  },
});

class TrendingPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get("/trendingposts")
      .then((res) => {
        return this.setState({
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
        <Typography variant="subtitle1" className={classes.title}>
          Trending Posts
        </Typography>
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
