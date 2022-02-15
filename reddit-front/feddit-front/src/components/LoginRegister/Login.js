import { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import userService from "../../services/userService";
import Card from "../UI/Card";
import styles from "./Login.module.css";

const Login = (props) => {
  const [ef, setEf] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, [ef]);

  const onChangeHandler = (e) => {
    setLogin((prevLogin) => {
      return {
        ...prevLogin,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setError("Please place a valid email.");

    const userLog = {
      email: login.email,
      password: login.password,
    };
    userService
      .auth(userLog)
      .then((response) => {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        setEf((prevEf) => {
          return !prevEf;
        });
        setError("");
        setLogin({
          email: "",
          password: "",
        });
        setRedirect((prevRedirect) => {
          return !prevRedirect;
        });
      })
      .catch((error) => {
        const errorCode = error.response.request.status;
        if (errorCode === 404) {
          setError("There's no user registered on this email.");
        } else if (errorCode === 409) {
          setError("Wrong password.");
        } else if (errorCode === 406) {
          setError("Invalid email.");
        } else {
          setError("Something went wrong, try again.");
        }
      });
  };

  return (
    <Card>
      {error ? <h1>{error}</h1> : null}
      {redirect ? <Navigate to="/homepage" /> : null}
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          value={login.email}
          placeholder="email"
          onChange={onChangeHandler}
          ref={ref}
        ></input>
        <input
          type="password"
          name="password"
          value={login.password}
          placeholder="password"
          onChange={onChangeHandler}
        ></input>
        <input type="submit" value="Zaloguj się"></input>
      </form>
    </Card>
  );
};

export default Login;
