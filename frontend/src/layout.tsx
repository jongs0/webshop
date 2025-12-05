import { NavLink, Outlet } from "react-router";
// import Footer from "./components/navigation/Footer";

const MainLayout = () => {

  return (
    <>
      {/* <Header/> */}
      <nav className="navmenu">
        <NavLink to="/" end>Home</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
      {/* <Footer/> */}
    </>
  );
};

export default MainLayout;

