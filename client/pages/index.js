import { checkToken } from "@/apis/tokens";
import { loginUser } from "@/store/modules/user";
import { useDispatch } from "react-redux";

export default function Index({ pageProps }) {
  const dispatch = useDispatch();
  const { user } = pageProps;
  if (user) dispatch(loginUser(user));

  return (
    <>
      <section></section>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.headers?.cookie;

  let user = null;
  try {
    const authCheck = await checkToken(true, cookie);
    const accessToken = authCheck.data.newAccessToken;
    user = {...authCheck.data.user};
    user.accessToken = accessToken;
    user.isLogin = true;
  } catch (err) {
    console.log(err.message);
  }

  return { props: { user } };
}
