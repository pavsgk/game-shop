import styles from './ItemSummaryComponent.module.scss';
import React from 'react';

function ItemSummaryComponent(props) {
  const {name, img, price, quantity, code} = props;

  return (
    <>
      <div className={styles.product}>
        <div className={styles.block}>
          <div className={styles.imgBox}>
            <img className={styles.img} src={img} alt={name} />
          </div>
          <div className={styles.details}>
            <p className={styles.name}>{name}</p>
            <div className={styles.blockCode}>
              <p className={styles.quantity}>
                Quantity:<span>{quantity}</span>
              </p>
              <span className={styles.code}>{code}</span>
            </div>
          </div>
        </div>
        <p className={styles.price}>
          $<span className={styles.price}>{price}</span>
        </p>
      </div>
    </>
  );
}

export default ItemSummaryComponent;
