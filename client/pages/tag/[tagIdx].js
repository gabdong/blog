import PostList from "@/components/PostList";
import WithAuthorization from "@/components/WithAuthorization";

function Tag({tagIdx, page}) {
  return (
    <>
      <PostList tagIdx={tagIdx} page={Number(page)} limit={9} />
    </>
  );
}

export default WithAuthorization(Tag);