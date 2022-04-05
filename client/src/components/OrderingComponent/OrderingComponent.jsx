import styles from './OrderingComponent.module.scss';
import React from 'react';

function OrderingComponent(props) {
  const {name, description, costValue} = props;

  return (
    <div className={styles.component}>
      <div className={styles.info}>
        <p className={styles.text}>{name}</p>
        <p className={styles.details}>{description}</p>
      </div>
      {costValue && <p className={styles.price}>{costValue} &#8372;</p>}
    </div>
  );
}

export default OrderingComponent;
