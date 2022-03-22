import styles from './ItemSummarySku.module.scss';
import React from 'react';

function ItemSummarySku(props) {
  const {title, img, price, quantity, code} = props;

  return (
    <>
      <div className={styles.product}>
        <div className={styles.block}>
          <div className={styles.imgBox}>
            <img className={styles.img} src={img} alt={title} />
          </div>
          <div className={styles.details}>
            <p className={styles.title}>{title}</p>
            <div className={styles.blockCode}>
              <p className={styles.quantity}>
                Quantity:<span>{quantity}</span>
              </p>
              <span className={styles.code}>{code}</span>
            </div>
          </div>
        </div>
        <p className={styles.price}>
          {quantity > 1 ? `${price} x ${quantity} = ${price * quantity}` : price} &#8372;
        </p>
      </div>
    </>
  );
}

export default ItemSummarySku;
