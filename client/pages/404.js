import Link from "next/link";

/**
 * * 404 page
 * @returns {JSX.Element}
 */
export default function Custom404() {
  return (
    <div>
      404 - Not Found.
      <Link href="/?tabItem=latestPostList">
        <p>홈으로</p>
      </Link>
    </div>
  );
}
