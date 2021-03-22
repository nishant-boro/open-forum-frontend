import React, { Component } from "react";
import LoginForm from "../../components/Login/LoginForm";
import { withRouter } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import { connect } from "react-redux";
import { loginUser, loginUserGoogle, setCurrentUser } from "../../actions/auth";
import jwt_decode from "jwt-decode";
import LinearProgress from "@material-ui/core/LinearProgress";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isProcessing: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleGoogleLogin() {
    this.props.loginUserGoogle();
  }

  handleSubmit(e) {
    this.setState({ isProcessing: true });
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user, this.props.history).then((res) => {
      this.setState({ isProcessing: false });
    });
  }

  componentDidMount() {
    if (this.props.location.search) {
      const token = new URLSearchParams(this.props.location.search).get(
        "token"
      );
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const user = jwt_decode(token);
      this.props.setCurrentUser(user);
    }
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return [
      <div style={{ marginBottom: 0 }}>
        {this.state.isProcessing ? (
          <LinearProgress style={{ marginBottom: 0 }} color="secondary" />
        ) : (
          ""
        )}
      </div>,
      <LoginForm
        routerMessage={this.props.location.state}
        onInputChange={this.handleInputChange}
        onFormSubmit={this.handleSubmit}
        handleGoogleLogin={this.handleGoogleLogin}
        loginFailed={this.props.loginFailed}
        isLoading={this.props.isLoading}
      />,
    ];
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  loginUser: loginUser,
  loginUserGoogle: loginUserGoogle,
  setCurrentUser: setCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
