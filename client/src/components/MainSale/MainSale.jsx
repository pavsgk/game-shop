import styles from './MainSale.module.scss';
import MainComponent from '../MainComponent/MainComponent';
import React, {useEffect, useState} from 'react';
import instance from '../../api/instance';
import {ReactComponent as Sale} from './img/sale.svg';

function MainSale() {
  const [saleProd, setSaleProd] = useState([]);
  const sale = [];

  useEffect(() => {
    (async () => {
      const res = await instance.get('/products');
      setSaleProd(res.data);
    })();
  }, []);

  (function () {
    if (saleProd.length > 0) {
      saleProd.forEach((el) => {
        if (el.previousPrice !== 0 && el.previousPrice !== el.currentPrice) {
          sale.push(el);
        }
      });
    }
  })();

  return (
    <>
      <div className={styles.title}>
        sale
        <Sale className={styles.titleSvg} />
      </div>
      <div className={styles.wrapper}>
        {sale.slice(0, 12).map((el) => {
          return (
            <>
              <div className={styles.componentWrapper}>
                <MainComponent
                  key={el.itemNo}
                  name={el.title}
                  price={el.currentPrice}
                  img={el.imageUrls.slice(0, 1)}
                  item={el.itemNo}
                  previousPrice={el.previousPrice}
                />
                <Sale className={styles.svg} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default MainSale;
