import axios from "axios";

const USERS_REST_API_URL = "http://localhost:8080/user";

class UserService {
  options = {
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  getUsers = () => {
    return axios.get(USERS_REST_API_URL + "/getAllUsers");
  };

  getUserById = (id) => {
    return axios.get(USERS_REST_API_URL + "/getUser/" + id);
  };

  addUser = (user) => {
    return axios.post(
      USERS_REST_API_URL + "/addUser",
      {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
      },
      this.options
    );
  };

  auth = (userLogin) => {
    return axios.post(
      USERS_REST_API_URL + "/auth",
      {
        email: userLogin.email,
        password: userLogin.password,
      },
      this.options
    );
  };

  changePassword = (newPassword, id) => {
    return axios.patch(
      USERS_REST_API_URL + "/updatePassword/" + id + "/" + newPassword,
      this.options
    );
  };

  deletePost = (id) => {
    return axios.delete(USERS_REST_API_URL + "/deleteUser/" + id, this.options);
  };
}

export default new UserService();
