export default function QRPayment({ total, nombreCliente = "", onBack, onPaid }) {
  return (
    <div className="yape-screen">
      {/* Título con botón atrás */}
      <div className="yape-back-title" onClick={onBack}>
        ← Pagar con Yape
      </div>

      {/* Tarjeta Yape */}
      <div className="yape-card">
        <div className="yape-brand">yape</div>

        {/* QR simulado */}
        <div className="qr-img-wrap">
          <img
            src="/yape.png"
            alt="QR Yape"
            width={120}
            style={{ borderRadius: 8 }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML =
                '<span style="font-size:3rem">📱</span>';
            }}
          />
        </div>

        <button className="yape-green-btn" onClick={onPaid}>
          Pago aquí con Yape
        </button>

        {nombreCliente && (
          <p className="yape-owner">{nombreCliente}</p>
        )}
      </div>

      {/* Total */}
      <p className="yape-total-label">Total a pagar</p>
      <p className="yape-total-amount">S/ {total.toLocaleString()}</p>
      <p className="yape-note">Escanea el QR y paga el monto exacto</p>
    </div>
  );
}