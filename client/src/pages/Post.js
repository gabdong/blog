import { useParams } from "react-router-dom";

function Posts() {
    const params = useParams();
    const { postIdx } = params;

    return <div>{postIdx}</div>;
}

export default Posts;