import styles from './MainSale.module.scss';
import MainComponent from '../MainComponent/MainComponent';
import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Sale} from './img/sale.svg';
import PropTypes from 'prop-types';

function MainSale({saleProducts}) {
  return (
    <>
      <Link exact="true" to="sale" className={styles.title}>
        sale
        <Sale className={styles.titleSvg} />
      </Link>
      <div className={styles.wrapper}>
        {saleProducts.map((el) => {
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

MainSale.propTypes = {
  saleProducts: PropTypes.array,
};

export default MainSale;
