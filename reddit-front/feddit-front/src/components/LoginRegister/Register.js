import Card from "../UI/Card";
import { Navigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import UserService from "../../services/userService";
import styles from "./Register.module.css";

const Register = (props) => {
  const [ef, setEf] = useState(false);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, [ef]);

  const onChangeHandler = (e) => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      const userRegister = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
      };

      UserService.addUser(userRegister)
        .then(() => {
          setRedirect((prevRedirect) => {
            return !prevRedirect;
          });
        })
        .catch((errorMsg) => {
          setError(errorMsg);
          setEf((prevEf) => {
            return !prevEf;
          });
        });
    }
  };

  return (
    <Card>
      {error ? <h1>{error}</h1> : null}
      {redirect ? <Navigate to="/homepage" /> : null}
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <h1>Register</h1>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="name"
          onChange={onChangeHandler}
          ref={ref}
        ></input>
        <input
          type="text"
          name="surname"
          value={user.surname}
          placeholder="surname"
          onChange={onChangeHandler}
        ></input>
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="email"
          onChange={onChangeHandler}
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="password"
          onChange={onChangeHandler}
        ></input>
        <input
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          placeholder="confirm password"
          onChange={onChangeHandler}
        ></input>
        <input type="submit" value="Zarejestruj"></input>
      </form>
    </Card>
  );
};

export default Register;
