import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false); //muestra un botón del carrito en la barra de navegación del encabezado.
  const cartCtx = useContext(CartContext); // para acceder a la información del carrito, como los ítems del carrito.

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0); //Calcula el número total de ítems en el carrito mediante la función reduce() en numberOfCartItems.

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`; // Utiliza el estado btnIsHighlighted para animar el botón cuando se agregan elementos al carrito. bump?

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  /*Utiliza useEffect() para controlar la animación del botón cuando se agrega un ítem al carrito. Cuando se agrega un ítem,
   btnIsHighlighted se establece en true, se inicia un temporizador para volver a establecerlo en false después de 300 ms.*/

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
