import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import axios from "axios";
import UserDetails from "../../components/UserProfile/UserDetails";
import { Buffer } from "buffer";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      image: "",
      userId: this.props.match.params.id,
    };

    this.fetchImage = this.fetchImage.bind(this);
  }

  fetchImage() {
    const userId = this.state.userId;
    const avatarUrl = "/api/users/photo/" + userId;

    axios
      .get(avatarUrl, {
        responseType: "arraybuffer",
      })
      .then((res) => {
        const output = Buffer.from(res.data, "binary").toString("base64");
        this.setState({ image: output });
      });
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    axios.get("/api/users/" + this.state.userId).then((res) => {
      this.setState({ data: res.data });
    });

    this.fetchImage();
  }

  render() {
    return (
      <UserDetails
        fetchImage={this.fetchImage}
        image={this.state.image}
        data={this.state.data}
      ></UserDetails>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(UserProfile));
