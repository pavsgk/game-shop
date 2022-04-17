import styles from './MainNew.module.scss';
import MainComponent from '../MainComponent/MainComponent';
import React, {useEffect, useState} from 'react';
import instance from '../../api/instance';
import {ReactComponent as New} from './img/new.svg';
import {Link} from 'react-router-dom';

function MainNew() {
  const [newProd, setNewProd] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await instance.get('products/filter?perPage=12&sort=-date');
      setNewProd(res.data.products);
    })();
  }, []);

  return (
    <>
      <Link exact="true" to="/catalog/filters?sort=-date/" className={styles.title}>
        new
      </Link>
      <div className={styles.wrapper}>
        {newProd.length > 0
          ? newProd.map((el) => {
              return (
                <React.Fragment key={el.itemNo}>
                  <div className={styles.componentWrapper}>
                    <MainComponent
                      name={el.title}
                      price={el.currentPrice}
                      img={el.imageUrls.slice(0, 1)}
                      item={el.itemNo}
                    />
                    <New className={styles.svg} />
                  </div>
                </React.Fragment>
              );
            })
          : null}
      </div>
    </>
  );
}

export default MainNew;
