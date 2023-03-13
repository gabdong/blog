import styled from "styled-components";

import TagSettings from "./TagSettings";

function Settings() {
  return (
    <SettingArticle>
      <TagSettings />
    </SettingArticle>
  );
}

const SettingArticle = styled.article`
  height: 100%;
`;

export default Settings;
