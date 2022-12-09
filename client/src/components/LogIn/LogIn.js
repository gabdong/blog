import styled from "styled-components";

const LogInWrap = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
`;
const LogInOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, var(--primary-color-d), transparent);
  position: fixed;
  left: 0;
  top: 0;
`;
const LogInContent = styled.div`
  width: 400px;
  max-width: 90%;
  height: 300px;
  padding: 20px;
  background: #fff;
  border-radius: var(--border-radius);
  position: relative;
  z-index: 1;
`;
const LogInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 100%;
`;
//TODO input component 분리
const LogInInput = styled.input`
  all: unset;
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: var(--border-radius);
  font-family: "SUIT-Medium";
  color: #000000;
  cursor: pointer;
  transition: var(--transition);

  &:active,
  &:focus,
  &:hover {
    border: 2px solid var(--primary-color);
  }
`;

function LogIn({ handler }) {
  return (
    <LogInWrap>
      <LogInOverlay onClick={handler} />
      <LogInContent>
        <LogInForm>
          <LogInInput placeholder="Username" />
          <LogInInput type="password" placeholder="Password" />
        </LogInForm>
      </LogInContent>
    </LogInWrap>
  );
}

export default LogIn;
