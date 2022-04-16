import PropTypes from 'prop-types';
import ProductsItem from '../ProductsItem/ProductsItem';
import styles from './ProductsContainerItem.module.scss';
import ProductsPlaceholder from '../ProductsPlaceholder/ProductsPlaceholder';
import {useSelector} from 'react-redux';
import FilterMenu from '../FilterMenu/FilterMenu';
import CatalogFilterTools from '../CatalogFilterTools/CatalogFilterTools';
import {useState} from 'react';

function ProductsContainerItem({isCatalog, isSale, products, isLoading}) {
  const [isOpen, setIsOpen] = useState(false);
  const {wishlist} = useSelector((state) => state.wishlist);
  const idItemsInWishlist = wishlist.map((e) => e._id);
  const emptyRequest = products.length < 1 && !isLoading;

  const openFilters = () => {
    setIsOpen(true);
  };
  const closeFilters = () => {
    setIsOpen(false);
  };

  return (
    <>
      <CatalogFilterTools isSale={isSale} openFilters={openFilters} />
      <div className={styles.contentProductsWrapper}>
        <div className={styles.container}>
          {isCatalog && <FilterMenu isOpen={isOpen} closeFilters={closeFilters} />}
          {isSale && <FilterMenu isSale={true} isOpen={isOpen} closeFilters={closeFilters} />}
          <div
            className={
              emptyRequest ? styles.productsContainerWithOutItems : styles.productsContainer
            }>
            {emptyRequest ? (
              <h3>There are no products to your request</h3>
            ) : (
              products.map((item) => {
                if (idItemsInWishlist.includes(item._id)) {
                  return <ProductsItem key={item.itemNo} item={item} isFavorite={true} />;
                }
                return <ProductsItem key={item.itemNo} item={item} />;
              })
            )}
            {isLoading && <ProductsPlaceholder />}
          </div>
        </div>
      </div>
    </>
  );
}

ProductsContainerItem.propTypes = {
  isCatalog: PropTypes.bool,
  isSale: PropTypes.bool,
  products: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default ProductsContainerItem;
