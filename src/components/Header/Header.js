import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
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
}));

const headersData = [
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Register",
    href: "/register",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "Trending Posts",
    href: "/trending-posts",
  },
  {
    label: "Log Out",
    href: "/logout",
  },
];

const getMenuButtons = (menuButton) => {
  return headersData.map(({ label, href }) => {
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

export default function Header() {
  const { header, logo, menuButton, toolbar } = useStyles();

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {appLogo}
        <div>{getMenuButtons(menuButton)}</div>
      </Toolbar>
    );
  };

  const appLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      Open Forum Social
    </Typography>
  );

  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
}
