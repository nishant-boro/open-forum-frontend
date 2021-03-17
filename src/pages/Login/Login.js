import React, { Component } from "react";
import LoginForm from "../../components/Login/LoginForm";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser, loginUserGoogle } from "../../actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
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
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  render() {
    return (
      <LoginForm
        routerMessage={this.props.location.state}
        onInputChange={this.handleInputChange}
        onFormSubmit={this.handleSubmit}
        handleGoogleLogin={this.handleGoogleLogin}
        loginFailed={this.props.loginFailed}
        isLoading={this.props.isLoading}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  loginUser: loginUser,
  loginUserGoogle: loginUserGoogle,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
