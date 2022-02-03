import {useSelector} from 'react-redux';

export default function CartInspector({className}) {
  const {
    cart: {cartItems},
  } = useSelector((state) => state);
  return (
    <div className={className}>
      <h3>Cart inspector</h3>
      <ul>
        {!cartItems.length && <li>[] - cart is empty</li>}
        {cartItems.length > 0 &&
          cartItems.map((item) => {
            return (
              <li key={item._id}>
                {item.product.title} : {item.cartQuantity}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
