import axios from "axios";

const POSTS_REST_API_URL = "http://localhost:8080/posts";

class PostService {
  options = {
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  getPosts = () => {
    return axios.get(POSTS_REST_API_URL + "/all");
  };

  getPostById = (idOfPost) => {
    return axios.get(POSTS_REST_API_URL + "/all/" + idOfPost);
  };

  addPost = (post) => {
    return axios.post(
      POSTS_REST_API_URL + "/add",
      {
        title: post.title,
        content: post.content,
        userId: post.userId,
      },
      this.options
    );
  };

  deletePost = (idOfPost) => {
    return axios.delete(POSTS_REST_API_URL + "/" + idOfPost, this.options);
  };

  getPostByUserId = (userId) => {
    return axios.get(POSTS_REST_API_URL + "/getPostsByUserId/" + userId);
  };

  getSearchedPosts = (title) => {
    return axios.get(POSTS_REST_API_URL + "/all/search/" + title);
  };

  addLikeToPost = (postId, userId) => {
    return axios.patch(
      POSTS_REST_API_URL + "/addLike",
      {
        postId: postId,
        userId: userId,
      },
      this.options
    );
  };
}

export default new PostService();
