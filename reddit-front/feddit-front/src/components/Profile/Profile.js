import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Card from "../UI/Card";
import UserPostsDisplay from "./UserPostsDisplay";

const Profile = (props) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  return (
    <>
      <Card>
        <h1>{user.name}</h1>
        <h1>{user.surname}</h1>
        <h1>{user.email}</h1>
      </Card>
      <UserPostsDisplay user={user} />
    </>
  );
};

export default Profile;
