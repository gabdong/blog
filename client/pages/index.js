import { checkToken } from "@/apis/tokens";
import { loginUser } from "@/store/modules/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Index({ pageProps }) {
  const dispatch = useDispatch();
  const { user } = pageProps;

  useEffect(() => {
    console.log("hi");
    if (user) dispatch(loginUser(user));
  }, []);

  return (
    <>
      <section></section>
    </>
  );
}

export async function getServerSideProps(ctx) {
  //TODO 로그인 확인 함수화
  const cookie = ctx.req.headers?.cookie;

  let user = null;
  try {
    const authCheck = await checkToken(true, cookie);
    const accessToken = authCheck.data.newAccessToken;
    user = { ...authCheck.data.user };
    user.accessToken = accessToken;
    user.isLogin = true;
  } catch (err) {
    console.log(err.message);
  }

  return { props: { user } };
}
