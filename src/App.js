import Header from "./components/Header/Header";
import { Switch, Route } from "react-router";
import "./App.css";
import store from "./store/index";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import setAuthToken from "./utils/setAuthToken";
import jwtDecode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/auth";
import CreatePost from "./pages/CreatePost/CreatePost";
import DisplayPosts from "./pages/DisplayPosts/DisplayPosts";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import UserProfile from "./pages/UserProfile/UserProfile";
import PageNotFound from "./pages/Error/PageNotFound";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <div>
      <Header></Header>
      <div style={{ marginTop: 64 }}>
        <Switch>
          <Route path="/login/:token">
            <Login />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Registration />
          </Route>

          <Route path="/create-post">
            <CreatePost />
          </Route>

          <Route key="trending" path="/trending">
            <DisplayPosts type="trending" />
          </Route>

          <Route path="/leaderboard">
            <Leaderboard />
          </Route>

          <Route path="/user/:id">
            <UserProfile />
          </Route>

          <Route key="my-feed" path="/feed">
            <DisplayPosts type="feed" />
          </Route>

          <Route exact path="/">
            <DisplayPosts type="trending" />
          </Route>

          <Route path="*" component={PageNotFound} />

          <Route path="/not-found">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
