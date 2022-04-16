import {useState} from 'react';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';

function SalePage() {
  const [isError, setIsError] = useState(false);

  return (
    <>
      {isError ? (
        <SomethingWentWrong />
      ) : (
        <ProductsContainer setIsError={setIsError} isSale={true} />
      )}
    </>
  );
}

export default SalePage;
