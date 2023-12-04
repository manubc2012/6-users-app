import React from "react";
import { ProductContext } from "./ProductContext"; // Asegúrate de importar el contexto correcto
import { useProducts } from "../hooks/useProducts"; // Asegúrate de importar el hook correcto

export const ProductProvider = ({ children }) => {
  const {
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
    getProducts, // Asegúrate de tener esta función definida en useProducts
  } = useProducts();

  return (
    <ProductContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
