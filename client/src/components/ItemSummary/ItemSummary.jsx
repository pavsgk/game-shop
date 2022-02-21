import styles from './ItemSummary.module.scss';
import ItemSummarySku from '../ItemSummarySku/ItemSummarySku';
import React from 'react';
import {useSelector} from 'react-redux';

function ItemSummary() {
  const {products} = useSelector((store) => store.cart);
  console.log(products);

  // return null;
  return (
    <div className={styles.itemSummary}>
      <p className={styles.title}>Item Summary</p>
      <div className={styles.elem}></div>

      {products.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        products.map(({product: {title, imageUrls, currentPrice, itemNo}, cartQuantity}) => (
          <ItemSummarySku
            key={itemNo}
            title={title}
            img={imageUrls[0]}
            price={currentPrice}
            quantity={cartQuantity}
            code={itemNo}
          />
        ))
      )}
    </div>
  );
}

export default ItemSummary;
