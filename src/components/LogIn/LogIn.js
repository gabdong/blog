import styled from "styled-components";

const LogInWrap = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
`;
const LogInOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;
const LogInContent = styled.div`
  width: 500px;
  height: 300px;
  background: #fff;
`;

function LogIn({ handler }) {
  return (
    <LogInWrap onClick={handler}>
      <LogInOverlay />
      <LogInContent />
    </LogInWrap>
  );
}

export default LogIn;
