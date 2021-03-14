import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import CreatePostCard from "../../components/CreatePost/CreatePostCard";
import axios from "axios";

export class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      photo: "",
      error: "",
    };
  }

  handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    this.setState({ [name]: value });
  };

  createPost = () => {
    let postData = new FormData();
    postData.append("title", this.state.title);
    postData.append("description", this.state.description);
    postData.append("photo", this.state.photo);
    if (this.props.auth.isAuthenticated) {
      const url = "api/posts/new/" + this.props.auth.user.id;
      axios
        .post(url, postData)
        .then((res) => console.log("published success"))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // componentDidMount() {
  //   if (!this.props.auth.isAuthenticated) {
  //     this.props.history.push("/login");
  //   }
  // }

  render() {
    return (
      <CreatePostCard
        handleChange={this.handleChange}
        title={this.state.title}
        description={this.state.description}
        createPost={this.createPost}
        photo={this.state.photo}
        error={this.state.error}
      ></CreatePostCard>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(CreatePost));
