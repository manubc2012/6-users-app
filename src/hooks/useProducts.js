import { useReducer, useState } from "react";
import { productsReducer } from "../reducers/productsReducer"; 
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/productsServices";


const initialProducts = [];

const initialProductForm = {
  id: 0,
  name: '',
  precio: '',
  descripcion: '',
  categoria: '',
};

const initialErrors = {
  name: '',
  precio: '',
  descripcion: '',
  categoria: '',
};

export const useProducts = () => {
  const [products, dispatch] = useReducer(productsReducer, initialProducts);
  const [productSelected, setProductSelected] = useState(initialProductForm);
  const [visibleForm, setVisibleForm] = useState(false);

  const [errors, setErrors] = useState(initialErrors);
  const navigate = useNavigate();

  const getProducts = async () => {
    const result = await findAll();
    dispatch({
      type: 'loadingProducts',
      payload: result.data,
    });
  };

  const handlerAddProduct = async (product) => {
    let response;
    try {
      if (product.id === 0) {
        response = await save(product);
      } else {
        response = await update(product);
      }

      dispatch({
        type: product.id === 0 ? 'addProduct' : 'updateProduct',
        payload: response.data,
      });

      Swal.fire(
        product.id === 0 ? 'Producto Creado' : 'Producto Actualizado',
        product.id === 0
          ? 'El producto ha sido creado con éxito!'
          : 'El producto ha sido actualizado con éxito!',
        'success'
      );
      handlerCloseForm();
      navigate('/products');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      } else if (
        error.response &&
        error.response.status === 500 &&
        error.response.data?.message?.includes('constraint')
      ) {
       
      } else {
        throw error;
      }
    }
  };

  const handlerRemoveProduct = (id) => {
    Swal.fire({
      title: 'Está seguro que desea eliminar',
      text: 'El producto será eliminado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        remove(id);
        dispatch({
          type: 'removeProduct',
          payload: id,
        });
        Swal.fire('Producto eliminado', 'El producto se ha eliminado', 'success');
      }
    });
  };

  const handlerProductSelectedForm = (product) => {
    setVisibleForm(true);
    setProductSelected({ ...product });
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setProductSelected(initialProductForm);
    setErrors({});
  };

  return {
    products,
    productSelected,
    initialProductForm,
    visibleForm,
    errors,
    handlerAddProduct,
    handlerRemoveProduct,
    handlerProductSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getProducts,
  };
};
