import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import { CartProvider } from "./context/CartContext";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>

        <Navbar openCart={() => setOpen(true)} />

        <CartSidebar
          isOpen={open}
          closeCart={() => setOpen(false)}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;