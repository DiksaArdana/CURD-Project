import { useContext } from "react";
import { Link,  useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

const NavBar = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };

  return (
    <nav className="px-5 flex items-center justify-between bg-slate-100">
      <div>
        <Link to={`/`}>Project</Link>
      </div>
      <div>
        {!authCtx.isLoggedIn && (
          <div className="flex space-x-4 py-2 ">
          <Link to={`/login`} className="p-2 bg-blue-200 rounded-md font-bold ">Login</Link>
          <Link to={`/register`} className="p-2 bg-blue-500 text-white rounded-md font-bold">Register</Link>
          </div>
        )}
        {authCtx.isLoggedIn && (
          <button className="p-2 my-2 bg-red-400 text-white rounded-md font-bold" onClick={logoutHandler}>
          Logout
        </button>
        )}
      </div>
    
    </nav>
  );
};

export default NavBar;