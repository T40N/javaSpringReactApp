import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = (props) => {
  const onClickHandler = () => {
    props.onLogout();
  };

  return (
    <div className={styles.header}>
      <h1>Feddit</h1>
      {!props.user ? (
        <div className={styles.options}>
          <Link to="/loginpage" className={styles.option}>
            Login
          </Link>
          <Link to="/registerpage" className={styles.option}>
            Register
          </Link>
        </div>
      ) : (
        <div className={styles.options}>
          <button onClick={onClickHandler} className={styles.option}>
            LogOut
          </button>
          <Link to="/profilepage" className={styles.option}>
            Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
