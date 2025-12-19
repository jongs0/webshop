import { BrowserRouter, Route, Routes } from "react-router"; // react-router-dom
import MainLayout from "./layout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* <Route index element={<HomePage />} /> */}
          <Route path="signup" element={<SignupPage />} />
          <Route path="/" index element={<HomePage />} />
        </Route>
        <Route path="login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
