import styles from './SalePage.module.scss';
import React, {useEffect, useState} from 'react';
import instance from '../../api/instance';
import ProductCard from '../../components/ProductCard/ProductCard';

function SalePage() {
  const [allProd, setAllProd] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await instance.get('/products');
      setAllProd(res.data);
    })();
  }, []);

  return (
    <div className={styles.sale}>
      <div className={styles.wrapper}>
        {allProd.map((el) => {
          if (el.previousPrice !== 0 && el.previousPrice !== el.currentPrice) {
            return <ProductCard key={el.itemNo} item={el} />;
          }
        })}
      </div>
    </div>
  );
}

export default SalePage;
