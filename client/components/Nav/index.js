import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";

import { getTagList } from "@/apis/tags";
import { useRouter } from "next/router";

/**
 * * mobile nav close
 */
const navClose = () => {
  const nav = document.getElementById("nav");
  const background = document.getElementById("navBackground");

  nav.classList.remove("active");
  background.classList.remove("active");
};

export default function Nav() {
  // const user = useSelector((store) => store.user, shallowEqual);
  const { asPath } = useRouter();
  const [tagLoading, setTagLoading] = useState(true);
  const [tagData, setTagData] = useState({});

  // useEffect(() => {
  //   (async () => {
  //     // try {
  //     //   const getTagListRes = await getTagList();
  //     //   const { data: tagDataRes } = getTagListRes;
  //     //   setTagData((prev) => {
  //     //     return { ...prev, ...tagDataRes };
  //     //   });
  //     //   setTagLoading(false);
  //     //   console.log(tagData);
  //     // } catch (err) {
  //     //   console.error(err.message);
  //     // }
  //   })();
  // }, []);

  console.log(tagData);
  console.log(tagLoading);
  return (
    <>
      {tagLoading ? (
        <NavSt />
      ) : (
        <>
          <NavBackgroundSt />
        </>
      )}
    </>
  );
}

const NavSt = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 140px;
  min-width: 140px;

  @media all and (max-width: 767px) {
    gap: 12px;

    width: 80%;
    height: 100%;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
    overflow-y: auto;
    position: fixed;
    left: -80%;
    top: 0;
    z-index: 32;
    transition: var(--transition);

    &::-webkit-scrollbar {
      width: 3px;
      background: var(--dark-l);
      border-radius: var(--border-radius);
    }
    &::-webkit-scrollbar-thumb {
      background: var(--primary-color);
      border-radius: var(--border-radius);
    }

    &.active {
      left: 0;
    }
  }
`;
const NavBackgroundSt = styled.div`
  @media all and (max-width: 767px) {
    &.active {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 31;
    }
  }
`;
// const CloseBtnSt = styled(Close)`
//   font-size: 32px;
//   cursor: pointer;
// `;
