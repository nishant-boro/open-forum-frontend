import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import axios from "axios";
import UserDetails from "../../components/UserProfile/UserDetails";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };

    this.updateDataImage = this.updateDataImage.bind(this);
    this.getLatestUserData = this.getLatestUserData.bind(this);
  }

  updateDataImage(location) {
    const currData = this.state.data;

    currData["photo"] = location;
    this.setState({ data: currData });
  }

  getLatestUserData() {
    axios.get("/api/users/" + this.props.match.params.id).then((res) => {
      this.setState({ data: res.data });
    });
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    if (!this.props.match.params.id) {
      this.props.history.push("/not-found");
    }

    this.getLatestUserData();
  }

  componentDidUpdate() {
    this.getLatestUserData();
  }

  render() {
    return (
      <UserDetails
        updateImage={this.updateDataImage}
        data={this.state.data}
        loggedInUserId={this.props.auth.user._id}
      ></UserDetails>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(UserProfile));
