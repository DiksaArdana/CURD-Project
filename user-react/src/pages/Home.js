import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AuthContext from "../context/AuthContext";
import UserList from "../components/list/UserList";

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline mb-3">User List</h1>
      {!authCtx.isLoggedIn && (
        <p>You need to login to see the list!</p>
      )}
      {authCtx.isLoggedIn && (
        <>
          <Link to={`/new-user`} className="d-block mt-3 text-center text-decoration-none bg-indigo-600 text-white rounded-md p-2"> Add New Data +</Link>
          <UserList />
        </>
      )}
    </Layout>
  );
};

export default Home;