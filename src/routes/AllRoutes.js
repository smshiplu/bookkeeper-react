import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";

import { Dashboard, Login, Register, TransactionHistory, Statement, PageNotFound } from "../pages";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}/>
      <Route path="/transaction-history" element={<ProtectedRoutes><TransactionHistory /></ProtectedRoutes>}/>
      <Route path="/statement" element={<ProtectedRoutes><Statement /></ProtectedRoutes>}/>
      <Route path="login" element={<Login />}/>
      <Route path="register" element={<Register />}/>
      <Route path="*" element={<PageNotFound />}/>
    </Routes>
  )
}
