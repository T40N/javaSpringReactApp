import Post from "./Post";

const PostDisplay = (props) => {
  return (
    <>
      {props.posts.map((post) => {
        return (
          <Post
            id={post.id}
            key={post.id}
            title={post.title}
            content={post.content}
            user={post.user}
            likes={post.numberOfLikes}
            onAddLike={props.onAddLike}
          />
        );
      })}
    </>
  );
};

export default PostDisplay;
