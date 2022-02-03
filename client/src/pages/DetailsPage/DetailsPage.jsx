import ProductItem from '../../components/ProductItem/ProductItem';
import instance from '../../api/instance';
import {useState, useEffect} from 'react';

function DetailsPage() {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const {data} = await instance.get(`products/${localStorage.getItem('currentItem')}`);
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
