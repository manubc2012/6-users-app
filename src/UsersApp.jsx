import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProductRoutes } from "./routes/ProductRoutes"; // Cambié la importación a ProductsRoutes
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";

export const UsersApp = () => {
  const { login } = useContext(AuthContext);

  return (
    <Routes>
      {
       login.isAuth
       ? ( /* TRUE, EL LOGIN ES TRUE */
           <Route path="/*" element={<ProductRoutes
               />} /> /* TRUE, EL LOGIN ES TRUE */

       )
      : 
        /* Rutas públicas para usuarios no autenticados */
        <>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/*" element={<Navigate to="/login" />} />
        </>
      }
    </Routes>
  )
}
