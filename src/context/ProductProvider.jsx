import React from "react";
import { ProductContext } from "./ProductContext"; 
import { useProducts } from "../hooks/useProducts";

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
    getProducts,
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
