import axios from "axios"

const BASE_URL = 'http://localhost:8080/products'

const config = () =>{return{
    headers: {
        "Authorization": sessionStorage.getItem('token'),
        "Content-Type": "application/json",
    }
}} 

export const findAll = async() => {
    try {
        const response =await axios.get(BASE_URL)
        return response;
    } catch (error) {
        console.error('Error in findAll:', error);
        throw error;
    }
    return null;
}

export const save = async ({ name, precio, descripcion, categoria }) => {
    console.log(name, precio, descripcion, categoria);
    try {
        return await axios.post(BASE_URL, {
            name,
            precio,
            descripcion,
            categoria
        }, config());
    } catch (error) {
        console.error('Error in save:', error);
        throw error;
    }
}

export const update = async ({ id, name, precio, descripcion }) => {
    try {
        return await axios.put(`${BASE_URL}/${id}`, {
            name,
            precio,
            descripcion
        }, config());
    } catch (error) {
        console.error('Error in update:', error);
        throw error;
    }
}

export const remove = async (id) =>{
    try {
        await axios.delete(`${BASE_URL}/${id}`, config())
    } catch (error) {
        console.log(error)
    }
}