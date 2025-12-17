import { BrowserRouter, Route, Routes } from "react-router"; // react-router-dom
import MainLayout from "./layout";
import LoginPage from "./pages/LoginPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* <Route index element={<HomePage />} /> */}
        </Route>
        <Route path="login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
