import styled from "styled-components";
import React from "react";
import Link from "next/link";
import {
  MdNavigateNext as Next,
  MdNavigateBefore as Prev,
  MdFirstPage as FirstPage,
  MdLastPage as LastPage,
} from "react-icons/md";
import { useRouter } from "next/router";

/**
 * @param Number totalCnt: 컨텐츠 총갯수
 * @param Number page: 현재 페이지
 * @param Number paginationCnt: 페이지네이션 갯수
 * @param String path: url
 * @param Number limit: 컨텐츠 갯수
 */
function Pagination({ totalCnt, page, paginationCnt = 10, path, limit = 10 }) {
  const router = useRouter();

  if (totalCnt <= limit) return null; // 컨텐츠 총갯수가 limit보다 작을경우 출력 x

  // 페이지네이션 그룹 startNumber(ex: 3~6이 나올때 3)
  let startNum = Math.floor(page / paginationCnt) * paginationCnt + 1;
  if (page % paginationCnt === 0) startNum = startNum - paginationCnt;

  // 컨텐츠 총갯수로 나올수있는 페이지네이션 마지막페이지
  const lastNum = Math.ceil(totalCnt / limit);

  // 페이지네이션 그룹 갯수
  let paginationLength =
    Math.ceil(totalCnt / 10) > paginationCnt
      ? paginationCnt
      : Math.ceil(totalCnt / 10);
  if (startNum + paginationLength > lastNum)
    paginationLength = lastNum - startNum + 1;

  const firstPageBtnUsing = page !== 1 ? true : false;
  const lastPageBtnUsing = page !== lastNum ? true : false;
  const prevArrowUsing = page > 1 ? true : false;
  const nextArrowUsing = page < lastNum ? true : false;

  return (
    <PaginationSt>
      {firstPageBtnUsing ? ( //* 첫번째 페이지
        <Link href={`${path}?page=1`}>
          <FirstPage />
        </Link>
      ) : null}
      {prevArrowUsing ? ( //* 이전페이지그룹
        <Link
          href={`${path}?page=${
            page - paginationCnt < 1 ? 1 : page - paginationCnt
          }`}
        >
          <Prev />
        </Link>
      ) : null}
      //* 페이지
      {Array.from({ length: paginationLength }).map((a, i) => {
        let pageNum = startNum + i;

        return (
          <Link
            key={pageNum}
            className={() => {
              const currentPage = Number(router.query.page);

              let className = "normalText";
              if (currentPage === pageNum) className += " active";

              return className;
            }}
            href={`${path}?page=${pageNum}`}
          >
            {pageNum}
          </Link>
        );
      })}
      {nextArrowUsing ? ( //* 다음페이지그룹
        <Link
          href={`${path}?page=${
            page + paginationCnt > lastNum ? lastNum : page + paginationCnt
          }`}
        >
          <Next />
        </Link>
      ) : null}
      {lastPageBtnUsing ? ( //* 마지막페이지
        <Link href={`${path}?page=${lastNum}`}>
          <LastPage />
        </Link>
      ) : null}
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
