import styles from './ProductCard.module.scss';

function ProductCard(props) {
  const {item} = props;
  const {title, imageUrls, currentPrice} = item;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.iconWrapper}>
        <img src={imageUrls[0]} alt={title} height="250" width="220" />
      </div>
      <h3 className={styles.productDecription}>{title}</h3>
      <span className={styles.price}>&#8372; {currentPrice}</span>
    </div>
  );
}

export default ProductCard;
