import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';
import Update from './pages/Update';
import Add from './pages/Add';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      {!authCtx.isLoggedIn && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
      <Route path="/user/:uid" element={<Update />} />
      <Route path="/new-user" element={<Add />} />
    </Routes>
  );

}

export default App;
