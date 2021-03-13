import Header from "./components/Header/Header";
import { Switch, Route } from "react-router";
import "./App.css";

function App() {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route path="/login">{/* <Login /> */}</Route>

        <Route path="/register">{/* <Register /> */}</Route>

        <Route path="/">{/* <Trending /> */}</Route>
      </Switch>
    </div>
  );
}

export default App;
