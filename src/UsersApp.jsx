import { LoginPage } from "./auth/pages/LoginPage"
import { Navigate, Route, Routes } from "react-router-dom"
import { UserRoutes } from "./routes/UserRoutes";
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";

export const UsersApp = () => {

   const {login} = useContext(AuthContext);
    return(
        <Routes>
            {
                login.isAuth
                    ? ( /* TRUE, EL LOGIN ES TRUE */
                        <Route path="/*" element={<UserRoutes
                            />} /> /* TRUE, EL LOGIN ES TRUE */

                    )
                    : <> /* FALSE, EL LOGIN ES FALSE */
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/*" element={<Navigate to="/login" />} />
                    </>

            }

        </Routes>
    )
}