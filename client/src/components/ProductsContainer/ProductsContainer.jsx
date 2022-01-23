import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductsContainer.module.scss"

function ProductsContainer() {
  return (
    <div className={styles.productsContainer}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export default ProductsContainer;