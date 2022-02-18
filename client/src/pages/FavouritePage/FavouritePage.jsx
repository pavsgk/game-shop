import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';

function FavouritePage() {
  return (
    <div style={{marginTop: '50px'}}>
      <ProductsContainer isWishlist={true} />
    </div>
  );
}

export default FavouritePage;
