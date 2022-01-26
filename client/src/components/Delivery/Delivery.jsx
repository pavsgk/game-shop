import styles from './Delivery.module.scss';
import OrderingComponent from '../OrderingComponent/OrderingComponent';
import React from 'react';

function Delivery() {
  return (
    <div className={styles.delivery}>
      <OrderingComponent
        text={'Standart'}
        details={'normally 4-5 business days, unless otherwise noted'}
        price={'$7.95'}
      />
      <OrderingComponent text={'Express'} details={'in Kyiv only'} price={'$10.95'} />
      <OrderingComponent text={'Courier'} details={'in Kyiv only'} price={'$16.95'} />
    </div>
  );
}

export default Delivery;
