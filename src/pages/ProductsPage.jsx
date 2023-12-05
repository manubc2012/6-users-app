import { useContext, useEffect } from "react";
import { ProductModalForm } from "../components/ProductModalForm"; 
import { ProductsList } from "../components/ProductsList"; 
import { ProductContext } from "../context/ProductContext";

export const ProductsPage = () => {
  const {
    products,
    visibleForm,
    handlerOpenForm,
    getProducts, 
  } = useContext(ProductContext);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      {!visibleForm || <ProductModalForm />}
      <div className="container my-4">
        <h2>Productos App</h2>
        <div className="row">
          <div className="col">
            {visibleForm || (
              <button
                className="btn btn-primary my-2"
                onClick={handlerOpenForm}
              >
                Nuevo Producto
              </button>
            )}

            {products.length === 0 ? (
              <div className="alert alert-warning">
                No hay productos en el sistema
              </div>
            ) : (
              <ProductsList />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
