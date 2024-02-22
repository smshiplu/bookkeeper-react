import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useCheckToken = () => {

  const token = JSON.parse(sessionStorage.getItem("token"));
  const bkid = JSON.parse(sessionStorage.getItem("bkid"));
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    if(token) {
      const decodedJwt = jwtDecode(token);
      
      if(decodedJwt.exp * 1000 < new Date().getTime()) {
        setIsTokenExpired(true);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("bkid");
      } else {
        bkid === parseInt(decodedJwt.sub) ? setIsTokenExpired(false) : setIsTokenExpired(true);
      }
    } else {
      setIsTokenExpired(true);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("bkid");
    }
  }, [isTokenExpired, token, bkid]);

  return isTokenExpired;
}
