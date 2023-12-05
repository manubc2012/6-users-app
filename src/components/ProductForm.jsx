import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";

export const ProductForm = ({ productSelected, handlerCloseForm }) => {
  const { initialProductForm, handlerAddProduct, errors } = useContext(
    ProductContext
  );

  const [productForm, setProductForm] = useState(initialProductForm);

  const { id, name, precio, descripcion, categoria } = productForm;

  useEffect(() => {
    setProductForm({
      ...productSelected,
    });
  }, [productSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handlerAddProduct(productForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setProductForm(initialProductForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control my-3 w-75"
        placeholder="Nombre"
        name="name"
        value={name}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.name}</p>

      <input
        className="form-control my-3 w-75"
        placeholder="Precio"
        name="precio"
        value={precio}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.precio}</p>

      <input
        className="form-control my-3 w-75"
        placeholder="Descripción"
        name="descripcion"
        value={descripcion}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.descripcion}</p>

      <select
        className="form-control my-3 w-75"
        name="categoria"
        value={categoria}
        onChange={onInputChange}
      >
        <option value="" disabled>
          Seleccione una categoría
        </option>
        <option value="Brownies">Brownies</option>
        <option value="Galletas">Galletas</option>
        <option value="Torta">Torta</option>
      </select>
      <p className="text-danger">{errors?.categoria}</p>


      <input
        type="hidden"
        name="id"
        value={id}
      />
      <button className="btn btn-primary" type="submit">
        {id > 0 ? "Editar" : "Crear"}
      </button>

      {!handlerCloseForm || (
        <button
          className="btn btn-primary mx-2"
          type="button"
          onClick={() => onCloseForm()}
        >
          Cerrar
        </button>
      )}
    </form>
  );
};
