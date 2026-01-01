import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDashboardPage from "./pages/ProductDashboardPage";
import UserDashboardPage from "./pages/UserDashboardPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* <Route index element={<HomePage />} /> */}
          <Route path="signup" index element={<SignupPage />} />
          <Route path="/" index element={<HomePage />} />
          <Route path="/product/:category" index element={<CategoryPage />} />
          <Route path="/product/:category/:variant" index element={<ProductPage />}/>
          <Route path="/admin/products" element={<ProductDashboardPage />} />
          <Route path="/admin/users" element={<UserDashboardPage />} />
        </Route>
        <Route path="login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
