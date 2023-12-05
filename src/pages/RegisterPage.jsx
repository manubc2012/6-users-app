import { useContext, useEffect, useState } from "react";
import { ProductForm } from "../components/ProductForm";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"; 

export const RegisterPage = () => {
  const { products = [], initialProductForm } = useContext(ProductContext);

  const [productSelected, setProductSelected] = useState(initialProductForm);

  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    if (id) {
      /* SE BUSCA SI HAY UN PRODUCTO CON ESE ID SE EDITA O SI NO DEVUELVE initial... */
      const product = products.find((p) => p.id == id) || initialProductForm;
      setProductSelected(product);
    }
  }, [id, initialProductForm, products]);

  return (
    <div className="container my-4">
      <h4>{productSelected.id > 0 ? 'Editar' : 'Registrar'}</h4>
      <div className="col">
        <ProductForm productSelected={productSelected} />
      </div>
    </div>
  );
};
