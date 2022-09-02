import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart, calculateTotal } from "../features/cart/cartSlice";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, amount, total } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map(cartItem => (
          <CartItem key={cartItem.id} {...cartItem} />
        ))}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(clearCart())}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
