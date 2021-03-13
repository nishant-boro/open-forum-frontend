import {
  AppBar,
  Button,
  withStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Component } from "react";
import { connect } from "react-redux";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { logoutUser } from "../../actions/auth";

const styles = (theme) => ({
  header: {
    backgroundColor: "#400CCC",
    paddingRight: "79px",
    paddingLeft: "118px",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  headersData = [
    {
      label: "Leaderboard",
      href: "/leaderboard",
    },
    {
      label: "Trending Posts",
      href: "/trending-posts",
    },
  ];

  getOtherButtons = (menuButton) => {
    return this.headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            className: menuButton,
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  getGuestButtons = (menuButton) => {
    return [
      <Button
        {...{
          key: "Login",
          color: "inherit",
          to: "/login",
          className: menuButton,
          component: RouterLink,
        }}
      >
        Login
      </Button>,
      <Button
        {...{
          key: "Register",
          color: "inherit",
          to: "/register",
          className: menuButton,
          component: RouterLink,
        }}
      >
        Register
      </Button>,
    ];
  };

  getAuthenticatedButtons = (menuButton) => {
    return (
      <Button
        {...{
          key: "Logout",
          color: "inherit",
          to: "/logout",
          className: menuButton,
          component: RouterLink,
        }}
        onClick={this.onLogout.bind(this)}
      >
        Logout
      </Button>
    );
  };

  onLogout = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { classes } = this.props;

    const displayDesktop = () => {
      return (
        <Toolbar className={classes.toolbar}>
          {appLogo}
          <div>
            {!this.props.auth.isAuthenticated
              ? this.getGuestButtons(classes.menuButton)
              : this.getAuthenticatedButtons(classes.menuButton)}
          </div>
          <div>{this.getOtherButtons(classes.menuButton)}</div>
        </Toolbar>
      );
    };

    const appLogo = (
      <Typography variant="h6" component="h1" className={classes.logo}>
        Open Forum Social
      </Typography>
    );

    return (
      <header>
        <AppBar className={classes.header}>{displayDesktop()}</AppBar>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(withRouter(Header))
);
