import {
  withStyles,
  Paper,
  Typography,
  InputLabel,
  FormControl,
  Input,
  Button,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockIcon from "@material-ui/icons/LockOutlined";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// import { CircularProgressIcon } from "../../common/ProgressIcon/CircularIcon";

const styles = (theme) => ({
  googleBtn: {
    width: "250px",
    cursor: "pointer",
    height: "42px",
    margin: "10px auto",
    backgroundColor: "#4285f4",
    borderRadius: "2px",
    boxShadow: "0 3px 4px 0 rgba(0,0,0,.25)",
  },
  googleIconWrapper: {
    position: "absolute",
    marginTop: "1px",
    marginLeft: "1px",
    width: "40px",
    height: "40px",
    borderRadius: "2px",
    backgroundColor: "#fff",
  },
  googleIcon: {
    position: "absolute",
    marginTop: "11px",
    marginLeft: "11px",
    width: "18px",
    height: "18px",
  },
  btnText: {
    position: "relative",
    top: "8px",
    left: "60px",
    color: "#fff",
    fontSize: "18px",
    letterSpacing: "0.2px",
    fontFamily: "Roboto",
  },
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(200 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(),
  },

  submit: {
    marginTop: theme.spacing(3),
  },
  errorDiv: {
    marginTop: theme.spacing(3),
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const checkIfRouterMessageExists = (router) => {
  if (router && router.message) {
    return true;
  }
  return false;
};

const StyledLoginForm = (props) => {
  const {
    classes,
    onInputChange,
    onFormSubmit,
    isLoading,
    handleGoogleLogin,
  } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Snackbar
        style={{ height: "120%" }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={checkIfRouterMessageExists(props.routerMessage)}
        autoHideDuration={6000}
      >
        <Alert severity="error">
          {props.routerMessage ? props.routerMessage.message : ""}
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        {isLoading ? (
          "<CircularProgressIcon />"
        ) : (
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
        )}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onFormSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onInputChange}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={onInputChange}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>

          <h2 style={{ textAlign: "center" }}>OR</h2>

          <div onClick={handleGoogleLogin} className={classes.googleBtn}>
            <div className={classes.googleIconWrapper}>
              <img
                className={classes.googleIcon}
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className={classes.btnText}>
              <b>Sign in with google</b>
            </p>
          </div>
        </form>
      </Paper>
    </main>
  );
};

const Login = withStyles(styles)(StyledLoginForm);

export default Login;
