import axios from "axios";

export default function () {
  axios.defaults.baseURL = process.env.BACKEND_URL;
  axios.defaults.headers.get["Accept"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";
}
