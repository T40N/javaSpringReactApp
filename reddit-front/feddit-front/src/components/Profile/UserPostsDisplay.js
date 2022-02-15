import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import PostService from "../../services/postService";
import Post from "../PostsComponents/Post";

const UserPostsDisplay = (props) => {
  const [posts, setPosts] = useState([]);
  const [postsChanged, setPostsChanged] = useState(false);

  useEffect(() => {
    PostService.getPostByUserId(props.user.id).then((res) => {
      setPosts(res.data);
    });
  }, [props.user.id, postsChanged]);

  const onDeletePostHandler = (idOfPost) => {
    PostService.deletePost(idOfPost).then(() => {
      setPostsChanged((prevPostChanged) => {
        return !prevPostChanged;
      });
    });
  };

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            id={post.id}
            key={post.id}
            title={post.title}
            content={post.content}
            user={post.user}
            likes={post.numberOfLikes}
            likedBy={post.likedBy}
            onDeletePost={onDeletePostHandler}
          />
        );
      })}
    </>
  );
};

export default UserPostsDisplay;
