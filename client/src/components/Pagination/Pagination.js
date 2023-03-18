import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import React from "react";

/**
 * @param Number totalCnt: 컨텐츠 총갯수
 * @param Number page: 현재 페이지
 * @param Number paginationCnt: 페이지네이션 갯수
 * @param String path: url
 * @param Number limit: 컨텐츠 갯수
 */
function Pagination({ totalCnt, page, paginationCnt = 10, path, limit = 10 }) {
  const location = useLocation();

  if (totalCnt <= limit) return null; // 컨텐츠 총갯수가 limit보다 작을경우 출력 x

  let startNum = Math.floor(page / paginationCnt) * paginationCnt + 1;
  if (page % paginationCnt === 0) startNum = startNum - paginationCnt;

  const lastNum = Math.ceil(totalCnt / limit);

  const paginationLength =
    Math.ceil(totalCnt / 10) > paginationCnt
      ? paginationCnt
      : Math.ceil(totalCnt / 10);

  return (
    <PaginationSt>
      {Array.from({ length: paginationLength }).map((a, i) => {
        let pageNum = startNum + i;

        if (pageNum > lastNum) return null;
        return (
          <NavLink
            key={pageNum}
            className={() => {
              const currentPage = Number(
                new URLSearchParams(location.search).get("page")
              );
              let className = "smallTitle";
              if (currentPage === pageNum) className += " active";
              return className;
            }}
            to={`${path}?page=${pageNum}`}
          >
            {pageNum}
          </NavLink>
        );
      })}
    </PaginationSt>
  );
}

const PaginationSt = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  padding: 20px 0;

  & > a {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;
    padding: 4px;
    border-radius: var(--border-radius);
    background: var(--gray);
    cursor: pointer;
  }

  & > a.active {
    background: var(--primary-color);
  }
`;

export default React.memo(Pagination);
