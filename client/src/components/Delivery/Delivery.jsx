import styles from './Delivery.module.scss';
import OrderingComponent from '../OrderingComponent/OrderingComponent';
import Button from '../Button/Button';
import React from 'react';

function Delivery() {
  return (
    <div className={styles.delivery}>
      <input type="radio" name="delivery" id="standart" value="delivery" />
      <label htmlFor="standart">
        <OrderingComponent
          text={'Standart'}
          details={'normally 4-5 business days, unless otherwise noted'}
          price={'$7.95'}
        />
      </label>
      <input type="radio" name="delivery" id="express" value="delivery" />
      <label htmlFor="express">
        <OrderingComponent text={'Express'} details={'in Kyiv only'} price={'$10.95'} />
      </label>
      <input type="radio" name="delivery" id="courier" value="delivery" />
      <label htmlFor="courier">
        <OrderingComponent text={'Courier'} details={'in Kyiv only'} price={'$16.95'} />
      </label>
      <div className={styles.btnNext}>
        <Button type="submit">Next</Button>
      </div>
    </div>
  );
}

export default Delivery;
