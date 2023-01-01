import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ component }) {
  const user = useSelector((store) => store.user);
  const { isLogin } = user;

  if (!isLogin) alert("관리자 로그인이 필요합니다.");

  return !isLogin ? <Navigate to="/" /> : component;
}

export default PrivateRoute;
