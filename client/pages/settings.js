import styled from "styled-components";

import { ssrRequireAuthentication } from "@/lib/utils/utils";

import TagSettings from "@/components/Settings/TagSettings";

/**
 * * 태그 설정페이지
 * @param {Object} props
 * @param {Object} props.pageProps
 * @param {Object} props.pageProps.userData
 * @returns {JSX.Element}
 */
export default function Settings({ pageProps }) {
  return (
    <SettingWrapSt>
      <TagSettings />
    </SettingWrapSt>
  );
}

const SettingWrapSt = styled.article`
  width: 100%;
  height: 100%;
`;

export const getServerSideProps = ssrRequireAuthentication();
