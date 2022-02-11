import styles from './Delivery.module.scss';
import OrderingComponent from '../OrderingComponent/OrderingComponent';
import Button from '../Button/Button';
import React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {switchTab, updateShippingMethod} from '../../store/reducers/checkoutReducer';

const methods = [
  {
    name: 'Standart',
    description: 'normally 4-5 business days, unless otherwise noted',
    costValue: '29.95',
  },
  {
    name: 'Express',
    description: 'in Kyiv only',
    costValue: '79.95',
  },
  {
    name: 'Courier',
    description: 'in Kyiv only',
    costValue: '120.00',
  },
];

function Delivery() {
  const {shippingMethod} = useSelector((store) => store.checkout);
  const dispatch = useDispatch();

  return (
    <div className={styles.delivery}>
      {methods.map(({name, description, costValue}) => (
        <React.Fragment key={name}>
          <input
            key={name}
            id={name}
            onChange={() =>
              dispatch(updateShippingMethod({shippingMethod: name, shippingPrice: costValue}))
            }
            checked={name === shippingMethod}
            type="radio"
            name={name}
            value={costValue}
          />
          <label htmlFor={name}>
            <OrderingComponent name={name} description={description} costValue={costValue} />
          </label>
        </React.Fragment>
      ))}
      <div className={styles.btnNext}>
        <Button onClick={() => dispatch(switchTab(2))}>Next</Button>
      </div>
    </div>
  );
}

export default Delivery;
