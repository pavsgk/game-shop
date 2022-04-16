import ProductDetails from '../../components/ProductDetails/ProductDetails';
import instance from '../../api/instance';
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

function DetailsPage() {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const {data} = await instance.get(`products/${location.search.slice(1)}`);
        setItem(data);
        setIsLoading(false);
      } catch (e) {
        console.warn('useEffect DetailsPage error: ', e);
        setIsLoading(false);
      }
    })();
  }, [location.search]);

  return isLoading ? null : <ProductDetails {...item} />;
}

export default DetailsPage;
