import { useState, useEffect, useRef } from "react";
import Card from "../UI/Card";
import styles from "./AddPost.module.css";

const AddPost = (props) => {
  const [ef, setEf] = useState(false);
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, [ef]);

  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    setPost((prevPost) => {
      return {
        ...prevPost,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // if (post.title.trim.lenght === 0) {
    //   setError("You need to set a title to your post!");
    //   return;
    // } else if (post.content.trim.length === 0) {
    //   setError("You need to set a content of your post!");
    //   return;
    // } else {
    const newPost = {
      title: post.title,
      content: post.content,
      userId: JSON.parse(sessionStorage.getItem("user")).id,
    };

    console.log(newPost)
    props.onAddPost(newPost);
    setEf((preEf) => {
      return !preEf;
    });
    setError("");
    setPost({
      title: "",
      content: "",
    });
    // }
  };

  const errorFunc = () => {
    if (error.length !== 0) {
      return <h2 className="styles.error">{error}</h2>;
    }
  };

  return (
    <Card>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <h1>Add Post</h1>
        {errorFunc}
        <input
          type="text"
          name="title"
          value={post.title}
          placeholder="title"
          onChange={onChangeHandler}
          ref={ref}
        ></input>
        <textarea
          type="text"
          name="content"
          value={post.content}
          placeholder="content"
          onChange={onChangeHandler}
          rows="5"
          cols="27"
        ></textarea>
        <input
          type="submit"
          value="Wyślij post"
          className={styles.button}
        ></input>
      </form>
    </Card>
  );
};

export default AddPost;
