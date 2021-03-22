import RegisterForm from "../../components/Registration/RegistrationForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import { registerUser } from "../../actions/auth";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    this.setState({ isProcessing: true });
    e.preventDefault();

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
      this.setState({ passwordRepeatedCorrectly: true });
    } else {
      this.setState({ passwordRepeatedCorrectly: false });
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
        image={this.state.photo}
        onPasswordRepeatChange={this.handleOnPasswordRepeatChange}
        onInputChange={this.handleInputChange}
        onFormSubmit={this.handleSubmit}
        passwordRepeatedCorrectly={this.state.passwordRepeatedCorrectly}
      ></RegisterForm>,
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
