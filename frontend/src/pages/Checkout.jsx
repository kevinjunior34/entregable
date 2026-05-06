import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import QRPayment from "../components/QRPayment";
import API from "../services/api";

// ── Indicador de pasos ──────────────────────────────
function StepsBar({ step }) {
  const steps = ["Datos de entrega", "Pago", "Confirmación"];

  return (
    <div className="steps-bar">
      {steps.map((label, i) => {
        const num = i + 1;
        const isDone   = step > num;
        const isActive = step === num;

        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < 2 ? "1" : "0" }}>
            <div className="step-wrap">
              <div className={`step-circle ${isDone ? "done" : isActive ? "active" : ""}`}>
                {isDone ? "✓" : num}
              </div>
              <span className={`step-label ${isDone ? "done" : isActive ? "active" : ""}`}>
                {label}
              </span>
            </div>
            {i < 2 && (
              <div className={`step-line ${isDone ? "done" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Checkout principal ──────────────────────────────
export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [cliente, setCliente] = useState({
    nombres: "",
    apellidos: "",
    direccion: "",
    telefono: "",
  });

  const [clienteValido, setClienteValido] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (campo, valor) => {
    setCliente({ ...cliente, [campo]: valor });
    setClienteValido(false);
  };

  // 🔍 Validar cliente en BD
  const validarCliente = async () => {
    setLoading(true);
    try {
      const res = await API.post("/clientes/validar", cliente);
      if (res.data.ok) setClienteValido(true);
      else setClienteValido(false);
    } catch {
      setClienteValido(false);
    }
    setLoading(false);
  };

  // 💾 Registrar venta
  const handleSubmit = async () => {
    const detalles = cart.map((c) => ({
      idProducto: c.id_producto,
      cantidad: c.cantidad,
    }));
    try {
      await API.post("/ventas", { cliente, detalles });
      clearCart();
      setStep(3);
    } catch (error) {
      console.error(error);
      alert("❌ Error al registrar venta");
    }
  };

  return (
    <div className="checkout-page">
      <StepsBar step={step} />

      {/* ──── STEP 1: Datos de entrega ──── */}
      {step === 1 && (
        <div className="checkout-body">
          {/* Columna izquierda – formulario */}
          <div className="checkout-left">
            <div className="checkout-left-header" onClick={() => navigate("/")}>
              ← Checkout
            </div>

            <div className="checkout-section-title">
              👤 Datos de entrega
            </div>

            <input
              placeholder="Nombres"
              value={cliente.nombres}
              onChange={(e) => handleChange("nombres", e.target.value)}
            />
            <input
              placeholder="Apellidos"
              value={cliente.apellidos}
              onChange={(e) => handleChange("apellidos", e.target.value)}
            />
            <input
              placeholder="Dirección"
              value={cliente.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
            />
            <input
              placeholder="Teléfono"
              value={cliente.telefono}
              onChange={(e) => handleChange("telefono", e.target.value)}
            />

            <button className="validate-btn" onClick={validarCliente}>
              Validar datos ✔
            </button>

            {loading && <p className="loading-text">Validando...</p>}

            {!loading && clienteValido && (
              <p className="client-status valid">✅ Cliente válido</p>
            )}
            {!loading && !clienteValido && (
              cliente.nombres && (
                <p className="client-status invalid">❌ Cliente no encontrado</p>
              )
            )}
          </div>

          {/* Columna derecha – resumen */}
          <div className="checkout-right">
            <h3>Resumen de compra</h3>

            <div className="summary-cart-icon">🛒</div>

            {cart.map((item) => (
              <div key={item.id_producto} className="summary-item">
                <span>
                  {item.descripcion} x{item.cantidad}
                </span>
                <span>S/ {(item.precio * item.cantidad).toLocaleString()}</span>
              </div>
            ))}

            <div className="summary-total">
              <p>Total:</p>
              <strong>S/ {total.toLocaleString()}</strong>
            </div>

            <button
              className="ir-pagar-btn"
              onClick={() => setStep(2)}
              disabled={!clienteValido}
            >
              Ir a pagar →
            </button>
          </div>
        </div>
      )}

      {/* ──── STEP 2: QR / Yape ──── */}
      {step === 2 && (
        <QRPayment
          total={total}
          nombreCliente={`${cliente.nombres} ${cliente.apellidos}`.trim()}
          onBack={() => setStep(1)}
          onPaid={handleSubmit}
        />
      )}

      {/* ──── STEP 3: Confirmación ──── */}
      {step === 3 && (
        <div className="confirm-screen">
          <div className="confirm-icon">✓</div>
          <p className="confirm-title">¡Pago realizado!</p>
          <p className="confirm-sub">Hemos recibido tu pago correctamente.</p>
          <div className="confirm-total-box">
            <p>Total pagado</p>
            <strong>S/ {total.toLocaleString()}</strong>
          </div>
          <button className="back-home-btn" onClick={() => navigate("/")}>
            🏠 Volver al inicio
          </button>
        </div>
      )}
    </div>
  );
}