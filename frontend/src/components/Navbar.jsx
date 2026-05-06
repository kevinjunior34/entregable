import { useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Inicio", path: "/" },
  { label: "Productos", path: "/" },
  { label: "Categorías", path: "/" },
  { label: "Ofertas", path: "/" },
];

export default function Navbar({ openCart, cartCount = 0 }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isCheckout = location.pathname === "/checkout";

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <div className="navbar-logo-icon">🛍️</div>
        Shop
      </div>

      {/* Nav Links – solo en home */}
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

      {/* Cart / Back button */}
      {isCheckout ? (
        <button className="cart-btn" onClick={() => navigate("/")}>
          ← Volver
        </button>
      ) : (
        <button className="cart-btn" onClick={openCart}>
          🛒 Carrito
          <span className="cart-badge">{cartCount}</span>
        </button>
      )}
    </div>
  );
}