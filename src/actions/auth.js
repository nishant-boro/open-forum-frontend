import axios from "axios";
import { SET_CURRENT_USER } from "../constants/actionTypes";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (data, history) => (dispatch) => {
  return axios
    .post("/api/users", data)
    .then((res) =>
      history.push({
        pathname: "/login",
        state: {
          message: "Registration Successful. Please login to continue!",
          type: "success",
        },
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

export const loginUser = (user, history) => (dispatch) => {
  return axios
    .post("/auth/signin", user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userRole", res.data.user.role);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);
      setAuthToken(token);
      dispatch(setCurrentUser(res.data.user));
    })
    .catch((err) => {
      if (err.response.status === 401) {
        history.push({
          pathname: "/login",
          state: {
            message: "Invalid credentials. Please try again!",
            type: "error",
          },
        });
      } else {
        history.push({
          pathname: "/login",
          state: {
            message: "Login failed. Please try again later!",
            type: "error",
          },
        });
      }
    });
};

export const loginUserGoogle = () => (dispatch) => {
  window.location.href = process.env.BACKEND_URL + "/auth/google";
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
