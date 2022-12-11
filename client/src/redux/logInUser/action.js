import axios from "axios";
import { LOGIN_USER } from "./type";

export function logInUser(submitData) {
  const req = axios
    .post("/api/users/login", submitData)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: req,
  };
}
