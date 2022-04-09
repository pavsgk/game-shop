import PropTypes from 'prop-types';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductsContainer.module.scss';
import ProductsPlaceholder from '../ProductsPlaceholder/ProductsPlaceholder';
import {useSelector} from 'react-redux';
import FilterMenu from '../FilterMenu/FilterMenu';

function ProductsContainer({
  isOpen,
  closeFilters,
  isCatalog,
  isSale,
  products,
  isLoading,
  isBeRequest,
}) {
  const {wishlist} = useSelector((state) => state.wishlist);
  const idItemsInWishlist = wishlist.map((e) => e._id);
  const emptyRequest = isBeRequest && products.length < 1;

  return (
    <div className={styles.contentProductsWrapper}>
      <div className={styles.container}>
        {isCatalog && <FilterMenu isOpen={isOpen} closeFilters={closeFilters} />}
        {isSale && <FilterMenu isSale={true} isOpen={isOpen} closeFilters={closeFilters} />}
        <div
          className={
            emptyRequest ? styles.productsContainerWithOutItems : styles.productsContainer
          }>
          {emptyRequest && !isLoading ? (
            <h3>There are no products to your request</h3>
          ) : (
            products.map((item) => {
              if (idItemsInWishlist.includes(item._id)) {
                return <ProductCard key={item.itemNo} item={item} isFavorite={true} />;
              }
              return <ProductCard key={item.itemNo} item={item} />;
            })
          )}
          {isLoading && <ProductsPlaceholder />}
        </div>
      </div>
    </div>
  );
}

ProductsContainer.propTypes = {
  closeFilters: PropTypes.func,
  isOpen: PropTypes.bool,
  isWishlist: PropTypes.bool,
  isCatalog: PropTypes.bool,
  isSale: PropTypes.bool,
  products: PropTypes.array,
  isLoading: PropTypes.bool,
  isBeRequest: PropTypes.bool,
};

export default ProductsContainer;
