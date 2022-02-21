import styles from './MainNew.module.scss';
import MainComponent from '../MainComponent/MainComponent';
import React, {useEffect, useState} from 'react';
import instance from '../../api/instance';

function MainNew() {
  const [newProd, setNewProd] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await instance.get('products/filter?perPage=8&sort=-date');
      setNewProd(res.data.products);
    })();
  }, []);

  return (
    <>
      <p className={styles.title}>new</p>
      <div className={styles.wrapper}>
        {newProd.length > 0
          ? newProd.map((el) => {
              return (
                <MainComponent
                  name={el.title}
                  price={el.currentPrice}
                  img={el.imageUrls.slice(0, 1)}
                  item={el.itemNo}
                />
              );
            })
          : null}
      </div>
    </>
  );
}

export default MainNew;
