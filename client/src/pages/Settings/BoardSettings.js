import styled from "styled-components";

function BoardSettings() {
    return (
        <SettingSection className="scroll">
            <h2 className="title">Board</h2>
        </SettingSection>
    );
}

const SettingSection = styled.section`
    height: 100%;
`;

export default BoardSettings;