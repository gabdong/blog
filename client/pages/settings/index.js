import { setReduxUser } from "@/lib/apis/tokens";
import { ssrRequireAuthentication } from "@/lib/utils/utils";

export default function Settings({ pageProps }) {
  const { userData } = pageProps;

  setReduxUser(userData);

  return <></>;
}

export const getServerSideProps = ssrRequireAuthentication();
