import { checkToken } from "@/apis/tokens";

export default function Index({ pageProps }) {
  return (
    <>
      <section></section>
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const authCheck = await checkToken(true);
  } catch (err) {
    console.log(err.message);
  }
  // const accessToken = authCheck.data.newAccessToken;
  // const { user } = authCheck;
  // user.accessToken = accessToken;
  // user.isLogin = true;

  return { props: { test: 'test' } };
}
