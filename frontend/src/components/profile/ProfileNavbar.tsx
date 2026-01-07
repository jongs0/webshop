type Props = {
  activeView: "user" | "orders";
  onChangeView: (view: "user" | "orders") => void;
};

const ProfileNavbar = ({ activeView, onChangeView }: Props) => {
  return (
    <div className="container">
      <button
        className={`nav-button ${activeView === "user" ? "active" : ""}`}
        onClick={() => onChangeView("user")}
      >
        User
      </button>

      <button
        className={`nav-button ${activeView === "orders" ? "active" : ""}`}
        onClick={() => onChangeView("orders")}
      >
        Orders
      </button>
    </div>
  );
};

export default ProfileNavbar;