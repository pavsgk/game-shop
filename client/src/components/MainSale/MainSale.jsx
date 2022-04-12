import styles from './MainSale.module.scss';
import MainComponent from '../MainComponent/MainComponent';
import React, {useEffect, useState} from 'react';
import instance from '../../api/instance';
import {Link} from 'react-router-dom';
import {ReactComponent as Sale} from './img/sale.svg';

function MainSale(props) {
  const {isMain = true} = props;
  const [saleProd, setSaleProd] = useState([]);
  const sale = [];
  let saleMain = null;

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
    if (isMain) {
      saleMain = sale.slice(0, 12);
    } else {
      saleMain = sale;
    }
  })();

  return (
    <>
      <Link exact="true" to="sale" className={styles.title}>
        sale
        <Sale className={styles.titleSvg} />
      </Link>
      <div className={styles.wrapper}>
        {saleMain.map((el) => {
          return (
            <React.Fragment key={el.itemNo}>
              <div className={styles.componentWrapper}>
                <MainComponent
                  name={el.title}
                  price={el.currentPrice}
                  img={el.imageUrls.slice(0, 1)}
                  item={el.itemNo}
                  previousPrice={el.previousPrice}
                />
                <Sale className={styles.svg} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}

export default MainSale;
