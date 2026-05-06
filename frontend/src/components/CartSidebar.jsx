import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ isOpen, closeCart }) {
  const { cart, removeItem, updateCantidad, total } = useCart();
  const navigate = useNavigate();

  const isEmpty = cart.length === 0;

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* ── Header ── */}
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <h2>🛒 Carrito</h2>
          <button onClick={closeCart} className="close-btn">✖</button>
        </div>
        <div className="sidebar-header-icon">🛒</div>
      </div>

      {/* ── Content ── */}
      {isEmpty ? (
        /* Empty state */
        <div className="cart-empty">
          <p className="cart-empty-title">Tu carrito está vacío</p>
          <p className="cart-empty-sub">Agrega productos para comenzar</p>
          <div className="cart-empty-arrow">↓</div>
          <div className="cart-total-box">
            <p>Total:</p>
            <strong>S/ 0</strong>
          </div>
        </div>
      ) : (
        /* Items list */
        <div className="sidebar-scroll">
          {cart.map((item) => (
            <div key={item.id_producto} className="cart-item">
              <img
                src={item.imagen}
                alt={item.descripcion}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/52x52?text=...";
                }}
              />
              <div className="cart-item-info">
                <p className="cart-item-name">{item.descripcion}</p>
                <p className="cart-item-price">
                  S/ {(item.precio * item.cantidad).toLocaleString()}
                </p>
                <div className="cart-qty">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      updateCantidad(
                        item.id_producto,
                        Math.max(1, item.cantidad - 1)
                      )
                    }
                  >
                    −
                  </button>
                  <span className="qty-val">{item.cantidad}</span>
                  <button
                    className="qty-btn"
                    onClick={() =>
                      updateCantidad(item.id_producto, item.cantidad + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeItem(item.id_producto)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Footer ── */}
      <div className="sidebar-footer">
        {!isEmpty && (
          <div className="sidebar-footer-total">
            <span>Total:</span>
            <strong>S/ {total.toLocaleString()}</strong>
          </div>
        )}
        <button
          className="pagar-btn"
          onClick={() => {
            navigate("/checkout");
            closeCart();
          }}
        >
          Ir a pagar →
        </button>
      </div>
    </div>
  );
}