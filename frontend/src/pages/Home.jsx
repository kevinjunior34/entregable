import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    API.get("/productos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <div className="hero">
        {/* Decoración */}
        <div className="hero-dots">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="hero-blob" />

        <h1>
          Encuentra lo que <span>necesitas</span>
        </h1>
        <p>Tecnología, hogar, cocina y más al mejor precio.</p>
      </div>

      {/* ── Products ── */}
      <div className="container">
        <div className="section-title">
          <span className="star-icon">⭐</span>
          Productos destacados
        </div>

        <div className="products-grid">
          {productos.map((p, idx) => (
            <ProductCard key={p.id_producto} product={p} index={idx} />
          ))}
        </div>
      </div>
    </>
  );
}