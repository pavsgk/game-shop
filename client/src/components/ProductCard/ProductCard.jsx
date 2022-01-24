import styles from "./ProductCard.module.scss"

function ProductCard() {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.iconWrapper}>
          <img src="https://content1.rozetka.com.ua/goods/images/big_tile/221644260.jpg" alt="Fifa 22 PC" />
        </div>
        <h3 className={styles.productDecription}>Игра FIFA 22 для ПК</h3>
        <span className={styles.price}>&#8372; 1999</span>
    </div>
  );
}

export default ProductCard;