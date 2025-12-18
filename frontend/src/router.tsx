import { BrowserRouter, Route, Routes } from "react-router"; // react-router-dom
import MainLayout from "./layout";
import HomePage from "./pages/HomePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* <Route index element={<HomePage />} /> */}
          <Route path="/" index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
