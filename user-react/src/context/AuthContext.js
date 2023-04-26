import axios from "axios";
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  idUser: "",
  token: "",
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { },
});

const retriveStoredToken = () => {
  const storedToken = localStorage.getItem("token");

  return {
    token: storedToken,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retriveStoredToken();
  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  // USE STATE
  const [token, setToken] = useState(initialToken);
  const [idUser, setIdUser] = useState();
  const userIsLoggedIn = !!token;

  useEffect(() => {
    if (!!token) {
      axios
        .get("http://localhost:8082/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setIdUser(res.data.idUser);
          console.log(res.data);
        })
        .catch((err) => {
          logoutHandler();
          console.log(err.message);
        });
    }

    return () => { };
  }, [token]);

  // LOGOUT
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // LOGIN
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const contextValue = {
    idUser: idUser,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;