import { Navigate, Route, Routes } from "react-router-dom";
import { ProductsPage } from "../pages/ProductsPage"; // Asegúrate de tener el componente correcto
import { Navbar } from "../components/layout/NavBar";
import { RegisterPage } from "../pages/RegisterPage";
import { ProductProvider } from "../context/ProductProvider"; // Asegúrate de tener el proveedor de contexto correcto

export const ProductRoutes = () => {
  return (
    <>
      <ProductProvider>
        <Navbar />
        <Routes>
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/register" element={<RegisterPage />} />
          <Route path="products/edit/:id" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </ProductProvider>
    </>
  );
};
