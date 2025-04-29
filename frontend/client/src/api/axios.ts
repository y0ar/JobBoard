import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7180/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
