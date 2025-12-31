import { Image } from "react-bootstrap";
import { Link } from "react-router";
import "../styles/general/bannerStyling.css";
import { currentUser } from "../stores/UserStore";
import { logout } from "../stores/UserStore";
import { useNavigate } from "react-router";

const Header = () => {

  const user = currentUser();
  const isLoggedIn = !Number.isNaN(user.id);
  const navigate = useNavigate();


  return (
    <header className="site-header">
      <div className="banner-wrapper">
        <Image
          src="/images/bannerv1.png"
          alt="Banner"
          className="header-banner"
        />
      </div>

      <nav className="main-navbar">
        <div className="navbar-inner">
          <div className="nav-left">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/product/iphone">iPhone</Link>
            <Link className="nav-link" to="/product/ipad">iPad</Link>
            <Link className="nav-link" to="/product/macbook">Macbook</Link>
            <Link className="nav-link" to="/product/iwatch">iWatch</Link>
          </div>

          <div className="nav-right">
            <Link className="nav-link" to="/support">Support</Link>
            <Link className="nav-link" to="/cart">Cart</Link>
            <Link className="nav-link" to="/profile">Profile</Link>

            {isLoggedIn ? (
              <span
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </span>
            ) : (
              <Link className="nav-link" to="/login">Login</Link>
            )}
          </div>
          
        </div>
      </nav>
    </header>
  );
};

export default Header;
