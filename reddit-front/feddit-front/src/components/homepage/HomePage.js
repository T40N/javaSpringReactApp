import { useState, useEffect } from "react";
import AddPost from "../PostsComponents/AddPost";
import PostService from "../../services/postService";
import PostDisplay from "../PostsComponents/PostDisplay";
import Header from "../Header/Header";
import SearchBar from "../PostsComponents/SearchBar";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [postsChanged, setPostsChanged] = useState(false);

  useEffect(() => {
    PostService.getPosts().then((res) => {
      setPosts(res.data);
    });
  }, [postsChanged]);
  console.log(posts);

  useEffect(() => {
    const loggedUser = JSON.parse(sessionStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const onAddPostHandler = (post) => {
    PostService.addPost(post).then(() => {
      setPostsChanged((prevPostChanged) => {
        return !prevPostChanged;
      });
    });
  };

  const onSearchHandler = (title) => {
    let titleFinal = title.trim();
    if (title === "") {
      setPostsChanged((prevPostChanged) => {
        return !prevPostChanged;
      });
    } else {
      PostService.getSearchedPosts(titleFinal).then((res) => {
        setPosts(res.data);
      });
    }
  };

  const onLogoutHandler = () => {
    sessionStorage.removeItem("user");
    setUser("");
  };

  const onAddLikeHandler = (postId, userId) => {
    PostService.addLikeToPost(postId, userId).then(() => {
      setPostsChanged((prevPostChanged) => {
        return !prevPostChanged;
      });
    });
  };

  return (
    <>
      <Header user={user} onLogout={onLogoutHandler} />
      <SearchBar onSearch={onSearchHandler}/>
      {user ? <AddPost onAddPost={onAddPostHandler} /> : null}
      <PostDisplay posts={posts} onAddLike={onAddLikeHandler} />
    </>
  );
};

export default HomePage;
