import { Navigate } from "react-router-dom";
import { useCheckToken } from "../hooks";
import { useEffect, useState } from "react";
export const ProtectedRoutes = ({children}) => {
  const token = useCheckToken();
  const [isTokenExpired, setIsTokenExpired] = useState(token);
  
  useEffect(() => {
    !token ? setIsTokenExpired(false) : setIsTokenExpired(true);
  }, [token]);

  return !isTokenExpired ? children : <Navigate to={"/login"}/>
}
