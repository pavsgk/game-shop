import PropTypes from 'prop-types';
import styles from './ItemSummarySku.module.scss';
import React from 'react';
import {Link} from 'react-router-dom';

function ItemSummarySku(props) {
  const {title, img, price, quantity, itemNo} = props;
  return (
    <Link to={`/details?${itemNo}`}>
      <div className={styles.product}>
        <div className={styles.block}>
          <div className={styles.imgBox}>
            <img className={styles.img} src={img} alt={title} />
          </div>
          <div className={styles.details}>
            <p className={styles.title}>{title}</p>
            <div className={styles.blockCode}>
              {quantity !== 0 && (
                <p className={styles.quantity}>
                  Quantity:<span>{quantity}</span>
                </p>
              )}
              <span className={styles.code}>{itemNo}</span>
            </div>
          </div>
        </div>
        <p className={styles.price}>
          {quantity > 1 ? `${price} x ${quantity} = ${price * quantity}` : price} &#8372;
        </p>
      </div>
    </Link>
  );
}

ItemSummarySku.propTypes = {
  img: PropTypes.string,
  itemNo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
};

ItemSummarySku.defaultProps = {
  img: './unknown-w.png',
  itemNo: '0',
  price: 0,
  quantity: 0,
  title: 'unknown',
};

export default ItemSummarySku;
