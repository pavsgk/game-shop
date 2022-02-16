import styles from './ItemSummary.module.scss';
import ItemSummarySku from '../ItemSummarySku/ItemSummarySku';
import React from 'react';
import {useSelector} from 'react-redux';

function ItemSummary() {
  const {cartItems} = useSelector((store) => store.cart);
  console.log(cartItems);

  return (
    <div className={styles.itemSummary}>
      <p className={styles.title}>Item Summary</p>
      <div className={styles.elem}></div>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        cartItems.map(({title, count, imageUrls, currentPrice, itemNo}) => (
          <ItemSummarySku
            key={itemNo}
            title={title}
            img={imageUrls[0]}
            price={currentPrice}
            quantity={count}
            code={itemNo}
          />
        ))
      )}
    </div>
  );
}

export default ItemSummary;
