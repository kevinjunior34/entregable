import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { label: "Inicio", path: "/" },
  { label: "Productos", path: "/" },
  { label: "Categorias", path: "/" },
  { label: "Ofertas", path: "/" },
];

export default function Navbar({ openCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  const isCheckout = location.pathname === "/checkout";

  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <div className="navbar-logo-icon">🛍️</div>
        Shop
      </div>

      {!isCheckout && (
        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                className={link.label === "Productos" ? "active" : ""}
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {isCheckout ? (
        <button className="cart-btn" onClick={() => navigate("/")}>
          Volver
        </button>
      ) : (
        <button className="cart-btn" onClick={openCart}>
          Carrito
          <span className="cart-badge">{cartCount}</span>
        </button>
      )}
    </div>
  );
}