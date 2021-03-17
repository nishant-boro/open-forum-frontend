import axios from "axios";
import { SET_CURRENT_USER } from "../constants/actionTypes";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (data, history) => (dispatch) => {
  axios
    .post("/api/users", data)
    .then((res) => history.push("/login"))
    .catch((err) => {
      console.log(err);
    });
};

export const loginUser = (user) => (dispatch) => {
  axios
    .post("/auth/signin", user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setCurrentUser(res.data.user));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loginUserGoogle = () => (dispatch) => {
  axios({
    method: "get",
    url: "/auth/google",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "http://localhost:3000",
    },
  })
    .then((res) => {
      console.log("google login done");
      console.log(res.data);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setCurrentUser(res.data.user));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push("/login");
};
