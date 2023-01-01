import { Navigate } from "react-router-dom";

function PrivateRoute({ component }) {
  const isLogin = window.localStorage.getItem("isLogin");

  if (!isLogin) alert("관리자 로그인이 필요합니다.");

  return !isLogin ? <Navigate to="/" /> : component;
}

export default PrivateRoute;
