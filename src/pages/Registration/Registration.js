import RegisterForm from "../../components/Registration/RegistrationForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import { registerUser } from "../../actions/auth";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      dob: "",
      country: "",
      passwordRepeatedCorrectly: null,
      isProcessing: false,
      error: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    if (e.target.name === "password" && e.target.value.length < 6) {
      this.setState({
        error: "Password should be equal to or more than 6 characters",
      });
    } else if (e.target.name === "password" && e.target.value.length >= 6) {
      this.setState({
        error: "",
      });
    }

    this.setState({
      [e.target.name || e.target.id]: e.target.value,
    });
  }

  handleSubmit(e) {
    this.setState({ isProcessing: true });
    e.preventDefault();

    if (e.target[4].value !== e.target[5].value) {
      this.setState({
        error: "Password and repeat password don't match",
        isProcessing: false,
      });
      return;
    }

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      dob: this.state.dob,
      country: this.state.country,
    };

    this.props.registerUser(user, this.props.history).then((res) => {
      this.setState({ isProcessing: false });
    });
  }

  handleOnPasswordRepeatChange = (object) => {
    let target = object.target;

    if (this.state.password === target.value) {
      this.setState({ passwordRepeatedCorrectly: true, error: "" });
    } else {
      this.setState({
        passwordRepeatedCorrectly: false,
        error: "Password and repeat password don't match",
      });
      object.error = true;
    }
  };

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
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
      <RegisterForm
        error={this.state.error}
        image={this.state.photo}
        onPasswordRepeatChange={this.handleOnPasswordRepeatChange}
        onInputChange={this.handleInputChange}
        onFormSubmit={this.handleSubmit}
        passwordRepeatedCorrectly={this.state.passwordRepeatedCorrectly}
      ></RegisterForm>,
      <Snackbar
        style={{ marginBottom: "5%" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={this.state.error !== ""}
        autoHideDuration={6000}
      >
        <Alert severity={"error"}>{this.state.error}</Alert>
      </Snackbar>,
    ];
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  registerUser: registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Registration));
