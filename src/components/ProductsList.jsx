import React, { useContext } from "react";
import { ProductRow } from "./ProductRow"; 
import { ProductContext } from "../context/ProductContext"; 

export const ProductsList = () => {
  const { products } = useContext(ProductContext);

  return (
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Descripción</th>
          <th>Categoría</th>
          <th>Update</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({ id, name, precio, descripcion, categoria }) => (
          <ProductRow
            key={id}
            id={id}
            name={name}
            precio={precio}
            descripcion={descripcion}
            categoria={categoria}
          />
        ))}
      </tbody>
    </table>
  );
};
