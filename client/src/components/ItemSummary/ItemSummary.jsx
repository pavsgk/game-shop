import PropTypes from 'prop-types';
import styles from './ItemSummary.module.scss';
import ItemSummarySku from '../ItemSummarySku/ItemSummarySku';
import React, {useState} from 'react';

function ItemSummary({products, title, emptyText, perPage}) {
  const items = products.map((el) => (el.product ? {...el, ...el.product} : {...el}));
  const [page, setPage] = useState(0);

  const maxPage = Math.ceil(items.length / perPage) - 1;
  const minHeight = {minHeight: 105 * (perPage + 1) + 'px'};

  const controls = (
    <div className={styles.controls}>
      <button className={styles.pageButton} onClick={() => setPage(page - 1)} disabled={page <= 0}>
        Prev
      </button>
      <span className={styles.pageIndicator}>
        Page: {page + 1} / {maxPage + 1}
      </span>
      <button
        className={styles.pageButton}
        onClick={() => setPage(page + 1)}
        disabled={page >= maxPage}>
        Next
      </button>
    </div>
  );

  return (
    <div className={styles.itemSummary} style={minHeight}>
      <p className={styles.title}>{title}</p>
      <div className={styles.elem}></div>
      {items.length === 0 && <p className={styles.empty}>{emptyText}</p>}
      {maxPage > 0 && controls}

      {items
        .slice(page * perPage, page * perPage + perPage)
        .map(({title, imageUrls, currentPrice, itemNo, cartQuantity}) => (
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
  perPage: PropTypes.number,
};

ItemSummary.defaultProps = {
  products: [],
  title: 'Item summary',
  emptyText: 'Nothing to show',
  perPage: 3,
};

export default ItemSummary;
