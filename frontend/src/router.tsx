import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDashboardPage from "./pages/ProductDashboardPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import UserOrderHistoryComponent from "./components/profile/UserOrderHistoryComponent";
import UserOrderDetailComponent from "./components/profile/UserOrderDetailComponent";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="signup" index element={<SignupPage />} />
          <Route path="checkout" element={<CartPage />} />
          <Route path="/" index element={<HomePage />} />

          <Route path="/product/:category/:variant" index element={<ProductPage />} />
          <Route path="/product/:category" index element={<CategoryPage />} />
          <Route path="/product/:category/:variant" index element={<ProductPage />} />

          <Route path="/admin/products" element={<ProductDashboardPage />} />
          <Route path="/admin/users" element={<UserDashboardPage />} />

          <Route path="/profile" element={<ProfilePage />}>
            <Route path="orders" element={<UserOrderHistoryComponent />} />
            <Route path="orders/:orderId" element={<UserOrderDetailComponent />} />
          </Route>
        </Route>

        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
