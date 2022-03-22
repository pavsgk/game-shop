import {useSelector} from 'react-redux';

export default function CartInspector({className}) {
  const {products} = useSelector((state) => state.cart);

  return (
    <div className={className}>
      <h3>Cart inspector</h3>
      <ul>
        {!products.length && <li key={0}>[] - cart is empty</li>}
        {products.length > 0 &&
          products.map((item) => (
            <li key={item._id}>
              {item.product.title} : {item.cartQuantity}
            </li>
          ))}
      </ul>
    </div>
  );
}
