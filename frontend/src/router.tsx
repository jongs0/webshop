import { BrowserRouter, Route, Routes } from "react-router"; // react-router-dom
import MainLayout from "./layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" index element={<HomePage />} />
          <Route path="/product/:category" element={<CategoryPage />} />
          <Route path="/product/:category/:variant" element={<ProductPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
