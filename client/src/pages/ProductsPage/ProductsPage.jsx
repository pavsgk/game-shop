import {useState} from 'react';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';

function ProductsPage() {
  const [isError, setIsError] = useState(false);

  return (
    <>
      {isError ? (
        <SomethingWentWrong />
      ) : (
        <ProductsContainer setIsError={setIsError} isCatalog={true} />
      )}
    </>
  );
}

export default ProductsPage;
