import { NavLink, Outlet } from "react-router";
// import Footer from "./components/navigation/Footer";

const MainLayout = () => {

  return (
    <>
      <div className="app">
        {/* <Header/> */}
        <nav className="navmenu">
          {/* <NavLink to="/" end>Home</NavLink> */}
        </nav>
        <main>
          <Outlet />
        </main>
        {/* <Footer/> */}
      </div>
    </>
  );
};

export default MainLayout;

