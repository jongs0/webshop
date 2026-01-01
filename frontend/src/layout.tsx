import { NavLink, Outlet } from "react-router";
import Header from "./navigation/Header";
import Footer from "./navigation/Footer";
// import Footer from "./components/navigation/Footer";

const MainLayout = () => {
  
  return (
    <div className="app-layout">
      <Header />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

// {/* <nav className="navmenu">
//           {/* <NavLink to="/" end>Home</NavLink> */}
//         </nav> */}