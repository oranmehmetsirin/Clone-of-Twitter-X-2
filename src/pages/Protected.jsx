import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

const Protected = () => {
  const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuth(user ? true : false);
    });
  }, []);
  if (isAuth === false) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default Protected;
