import {useSelector} from 'react-redux';

export default function CartInspector({className}) {
  const {
    cart: {products},
  } = useSelector((state) => state);
  return (
    <div className={className}>
      <h3>Cart inspector</h3>
      <ul>
        {!products.length && <li>[] - cart is empty</li>}
        {products.length > 0 &&
          products.map((item) => {
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
