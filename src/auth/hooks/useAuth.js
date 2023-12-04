import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authSetvice";
import { useNavigate } from "react-router-dom";

/* SI LOS DATOS EXISTEN EN EL STORAGE SE ASIGNA LA SESION EXISTENTE O SI NO LOS POR DEFECTO  */
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}

export const useAuth = () =>{

    const [login, dispatch] = useReducer(loginReducer, initialLogin);

    const navigate = useNavigate();
    
    const handlerLogin = async ({username, password}) => {
        
        try {
            const response = await loginUser({username, password});
            const token = response.data.token;
            /* DECODIFICAR DE BASE 64 */
            const claims =JSON.parse(window.atob(token.split(".")[1])) ;
            console.log(claims);
            const user = {username: claims.username}
            dispatch({
                type: 'login',
                payload: user,
            })
            sessionStorage.setItem('login', JSON.stringify({

                isAuth: true,
                user,
            }));
            sessionStorage.setItem('token', 'Bearer ' + token);
            navigate('/products')
        }catch(error){
            if (error.response?.status === 401) {
                Swal.fire('Error de validación',
                    'Username o password invalidos',
                    'error');
            } else if (error.response?.status == 403) {
                Swal.fire('Error de validación',
                    'Username o password invalidos',
                    'error');
            } else {
                throw error;
            }
            
        }
    }

    const handlerLogout = () =>{
        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('login')
        sessionStorage.clear();
    }


    return{
        login, 

        handlerLogin, 
        handlerLogout,
    }
}