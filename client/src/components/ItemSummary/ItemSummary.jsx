import PropTypes from 'prop-types';
import styles from './ItemSummary.module.scss';
import ItemSummarySku from '../ItemSummarySku/ItemSummarySku';
import React from 'react';

function ItemSummary({products, title, emptyText}) {
  const items = products.map((el) => (el.product ? {...el, ...el.product} : {...el}));

  return (
    <div className={styles.itemSummary}>
      <p className={styles.title}>{title}</p>
      <div className={styles.elem}></div>
      {items.length === 0 && <p className={styles.empty}>{emptyText}</p>}
      {items.map(({title, imageUrls, currentPrice, itemNo, cartQuantity}) => (
        <ItemSummarySku
          key={itemNo}
          title={title}
          img={imageUrls[0]}
          price={currentPrice}
          quantity={cartQuantity}
          itemNo={itemNo}
        />
      ))}
    </div>
  );
}

ItemSummary.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  emptyText: PropTypes.string,
};

ItemSummary.defaultProps = {
  products: [],
  title: 'Item summary',
  emptyText: 'Nothing to show',
};

export default ItemSummary;
