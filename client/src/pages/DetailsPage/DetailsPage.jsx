import ProductItem from '../../components/ProductItem/ProductItem';
import instance from '../../api/instance';
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

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
        console.log(e);
        setIsLoading(false);
      }
    })();
  }, []);

  return isLoading ? null : <ProductItem item={item} />;
}

export default DetailsPage;
