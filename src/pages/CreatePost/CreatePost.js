import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import CreatePostCard from "../../components/CreatePost/CreatePostCard";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      photo: "",
      isPosted: false,
      loading: false,
      error: false,
    };
  }

  handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    this.setState({ [name]: value });
  };

  createPost = () => {
    let postData = new FormData();
    postData.append("photo", this.state.photo);
    if (this.props.auth.isAuthenticated) {
      const url =
        "api/posts/new/" +
        this.props.auth.user._id +
        "?title=" +
        this.state.title +
        "&text=" +
        this.state.description;
      this.setState({ loading: true });
      axios
        .post(url, postData)
        .then((res) => {
          this.setState({
            title: "",
            description: "",
            photo: "",
            isPosted: true,
            loading: false,
            error: false,
          });
        })
        .catch((err) => {
          this.setState({
            title: "",
            description: "",
            photo: "",
            isPosted: true,
            loading: false,
            error: true,
          });
        });
    }
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push({
        pathname: "/login",
        state: {
          message: "Please login to create a new Post!",
        },
      });
    }
  }

  render() {
    const setIsPosted = () => {
      this.setState({ isPosted: false });
    };

    return [
      <div>
        {this.state.loading ? <LinearProgress color="secondary" /> : ""}
      </div>,
      <Snackbar
        style={{ height: "16%" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={this.state.isPosted}
        autoHideDuration={4000}
        onClose={setIsPosted}
      >
        {!this.state.error ? (
          <Alert severity="success">
            Your post has been successfully created!
          </Alert>
        ) : (
          <Alert severity="error">
            There was a problem posting. Please try again.
          </Alert>
        )}
      </Snackbar>,
      <CreatePostCard
        handleChange={this.handleChange}
        title={this.state.title}
        description={this.state.description}
        createPost={this.createPost}
        photo={this.state.photo}
      ></CreatePostCard>,
    ];
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(CreatePost));
