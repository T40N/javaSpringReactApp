import { useRef } from "react";
import Card from "../UI/Card";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const ref = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.onSearch(ref.current.value);
  };

  return (
    <Card>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <input type="text" ref={ref} />
        <input type="submit" value="Search" />
      </form>
    </Card>
  );
};

export default SearchBar;
