import { useState } from "react";
import styled from "styled-components";

export default function Header() {
  const [loginModalView, setloginModalView] = useState(false);
  const [userMenuWrapView, setUserMenuWrapView] = useState(false);

  return (
    <>
      <HeaderSt>Gabdong</HeaderSt>
    </>
  );
}

const HeaderSt = styled.header`
  display: flex;

  width: 100%;
  background: var(--dark);
  position: sticky;
  left: 0;
  top: 0;
  z-index: 21;

  @media all and (max-width: 767px) {
    flex-direction: column;
  }
`;
