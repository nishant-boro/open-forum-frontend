import RegisterForm from "../../components/Registration/RegistrationForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import { registerUser } from "../../actions/auth";

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
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      dob: this.state.dob,
      country: this.state.country,
    };
    this.props.registerUser(user, this.props.history);
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
    return (
      <RegisterForm
        image={this.state.photo}
        onPasswordRepeatChange={this.handleOnPasswordRepeatChange}
        onInputChange={this.handleInputChange}
        onFormSubmit={this.handleSubmit}
        passwordRepeatedCorrectly={this.state.passwordRepeatedCorrectly}
        isProcessing={this.props.isProcessing}
      ></RegisterForm>
    );
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
