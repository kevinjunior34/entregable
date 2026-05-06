import { useState } from "react";
import { useCart } from "../context/CartContext";

// Colores rotativos para el botón "Agregar"
const BTN_COLORS = [
  "btn-purple",
  "btn-red",
  "btn-blue",
  "btn-orange",
  "btn-green",
  "btn-teal",
  "btn-pink",
];

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [wished, setWished] = useState(false);

  const btnColor = BTN_COLORS[index % BTN_COLORS.length];

  return (
    <div className="card">
      {/* Imagen + botón corazón */}
      <div className="card-img-wrap">
        <img
          src={product.imagen}
          alt={product.descripcion}
          className="product-img"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/200x115?text=Sin+Imagen";
          }}
        />
        <button
          className={`wish-btn ${wished ? "active" : ""}`}
          onClick={() => setWished(!wished)}
          title="Agregar a favoritos"
        >
          {wished ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Info */}
      <div className="card-body">
        <h3>{product.descripcion}</h3>
        <p className="price">S/ {product.precio.toLocaleString()}</p>
        <button className={`btn ${btnColor}`} onClick={() => addToCart(product)}>
          🛒 Agregar
        </button>
      </div>
    </div>
  );
}