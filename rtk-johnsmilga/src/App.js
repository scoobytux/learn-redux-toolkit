import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.modal);
  const { isLoading } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      {isLoading ? (
        <div className="loading">
          <h1>"LOADING ..." </h1>
        </div>
      ) : (
        <CartContainer />
      )}
    </main>
  );
}

export default App;
