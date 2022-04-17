import ProductDetails from '../../components/ProductDetails/ProductDetails';
import instance from '../../api/instance';
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';

function DetailsPage() {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const {data} = await instance.get(`products/${location.search.slice(1)}`);
        setItem(data);
        setIsLoading(false);
        setIsError(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, [location.search]);

  return (
    <>
      {isLoading && <Preloader />}
      {isError && <SomethingWentWrong />}
      {!isError && !isLoading && <ProductDetails {...item} />}
    </>
  );
}

export default DetailsPage;
