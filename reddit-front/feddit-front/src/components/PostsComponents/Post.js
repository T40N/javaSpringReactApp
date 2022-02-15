import { useState } from "react/cjs/react.development";
import Card from "../UI/Card";
import styles from "./Post.module.css";

const Post = (props) => {
  const [up, setUp] = useState(false);

  const onDeleteHanlder = () => {
    props.onDeletePost(props.id);
  };

  let userId = "";
  let include = false;
  if (JSON.parse(sessionStorage.getItem("user"))) {
    userId = JSON.parse(sessionStorage.getItem("user")).id;
    if (props.likedBy) {
      if (props.likedBy.includes(userId)) {
        include = true;
      }
    }
  }

  const onAddLikeHandler = () => {
    props.onAddLike(props.id, userId);
    setUp(prevUp => {
      return !prevUp;
    })
  };

  return (
    <Card className={styles.post}>
      <h1>{props.title}</h1>
      <h3>{props.content}</h3>
      <h5>{props.user.name}</h5>
      <h5>{props.user.surname}</h5>
      <p>{props.likes}</p>
      {props.onDeletePost ? (
        <button onClick={onDeleteHanlder}>Delete</button>
      ) : null}
      {userId && userId !== props.user.id && !include ? (
        <button onClick={onAddLikeHandler}>Add Like</button>
      ) : null}
    </Card>
  );
};

export default Post;
