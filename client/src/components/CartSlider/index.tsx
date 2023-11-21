import { ICart } from "../../interfaces";
import { useStore } from "../../store";
import { ADD_TO_CART, SHOW_CART } from "../../store/actions";
import Bin from "../../assets/images/recycle-bin.svg";
import "./CartSlider.scss";
import { useNavigate } from "react-router-dom";
const CartSlider = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const { cartItems, showCart } = state;
  const deliveryCharges = 100;
  const totalPrice =
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0) + deliveryCharges;
  const onAddHandler = (item: ICart) => {
    const cart = cartItems;
    if (item?.quantity < item?.maxQuantity) {
      const productIdx = cart?.findIndex(
        (cItem: ICart) => cItem?.id === item?.id
      );
      cart[productIdx] = {
        ...cart[productIdx],
        quantity: cart[productIdx]?.quantity + 1,
      };
      dispatch({ type: ADD_TO_CART, payload: cart });
    }
  };
  const onRemoveHandler = (item: ICart) => {
    const cart = cartItems;
    if (item?.quantity > 1) {
      const productIdx = cart?.findIndex(
        (cItem: ICart) => cItem?.id === item?.id
      );
      cart[productIdx] = {
        ...cart[productIdx],
        quantity: cart[productIdx]?.quantity - 1,
      };
      dispatch({ type: ADD_TO_CART, payload: cart });
    } else {
      onDeleteItem(item?.id);
    }
  };
  const onHideSlider = () => {
    dispatch({ type: SHOW_CART, payload: false });
  };
  const onDeleteItem = (itemId: string) => {
    const updatedCart = cartItems?.filter((item: ICart) => item?.id !== itemId);
    dispatch({ type: ADD_TO_CART, payload: updatedCart });
  };
  return (
    <div className="overlay">
      <div className={`cart-container ${showCart ? "show-cart" : ""}`}>
        <div className="d-flex justify-content-end">
          <button className="cart-cross" onClick={onHideSlider} />
        </div>
        <div>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            <>
              <div className="main-heading">
                <h4>YOUR BAG</h4>
                <h6>
                  Items in your bag are not reserved — check out now to make
                  them yours.
                </h6>
              </div>
              <div className="cart-items">
                {cartItems.map((item: ICart) => (
                  <div key={item.productId} className="d-flex">
                    <div className="prod-img">
                      <img src={item?.thumbnail} alt="product-img" />
                    </div>
                    <div className="prod-detail">
                      <h4>{item.name}</h4>
                      <span>
                        Price per unit: ${Number(item.price).toFixed(0)}
                      </span>
                      <span>Color: {item?.color}</span>
                      <span>Size: {item?.sizeLabel}</span>
                      <div className="prod-qty-container">
                        <div className="d-flex align-items-center">
                          <div className="actions">
                            <button onClick={() => onAddHandler(item)}>
                              +
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => onRemoveHandler(item)}>
                              -
                            </button>
                          </div>
                          <button
                            className="bin-btn"
                            onClick={() => onDeleteItem(item?.id)}
                          >
                            <img src={Bin} alt="bin" />
                          </button>
                        </div>
                        <div className="sub-total">
                          ${item.quantity * item?.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {cartItems.length !== 0 && (
          <div className="bottom-container">
            <div className="row amount-container">
              <span className="col-8 d-flex">Delivery Charges:</span>
              <span className="col-4 d-flex justify-content-end">
                ${deliveryCharges.toFixed(2)}
              </span>
            </div>
            <div className="row total-container">
              <span className="col-8 d-flex">Total Price:</span>
              <span className="col-4 d-flex justify-content-end">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="bottom-actions">
              <button className="bg-white">Continue To Shopping</button>
              <button
                onClick={() => {
                  dispatch({ type: SHOW_CART, payload: false });
                  navigate("/checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSlider;
