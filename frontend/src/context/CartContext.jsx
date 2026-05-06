import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exist = cart.find(p => p.id_producto === product.id_producto);

    if (exist) {
      setCart(cart.map(p =>
        p.id_producto === product.id_producto
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      ));
    } else {
      setCart([...cart, { ...product, cantidad: 1 }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter(p => p.id_producto !== id));
  };

  const updateCantidad = (id, cantidad) => {
    setCart(cart.map(p =>
      p.id_producto === id ? { ...p, cantidad } : p
    ));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeItem,
      updateCantidad,
      total,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);