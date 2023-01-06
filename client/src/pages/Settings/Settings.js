import styled from "styled-components";
import BoardSettings from "./BoardSettings/BoardSettings";

function Settings() {
  return (
    <SettingArticle>
      <BoardSettings />
    </SettingArticle>
  );
}

const SettingArticle = styled.article`
  height: 100%;
`;

export default Settings;
