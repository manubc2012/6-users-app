import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"; // Asegúrate de tener el contexto correcto

export const ProductRow = ({ id, name, precio, descripcion, categoria }) => {
  const { handlerProductSelectedForm, handlerRemoveProduct } = useContext(
    ProductContext
  );

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{precio}</td>
      <td>{descripcion}</td>
      <td>{categoria}</td>
     {/*  <td>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() =>
            handlerProductSelectedForm({
              id,
              nombre,
              precio,
              descripcion,
              categoria,
            })
          }
        >
          update
        </button>
      </td> */}
      <td>
        <NavLink
          className={"btn btn-secondary btn-sm"}
          to={"/products/edit/" + id}
        >
          update route
        </NavLink>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => handlerRemoveProduct(id)}
        >
          remove
        </button>
      </td>
    </tr>
  );
};
