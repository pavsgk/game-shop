import styles from './MainNew.module.scss';
import MainComponent from '../MainComponent/MainComponent';
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function MainNew({newProducts}) {
  return (
    <>
      <Link exact="true" to="/catalog/filters?sort=-date/" className={styles.title}>
        new
      </Link>
      <div className={styles.wrapper}>
        {newProducts.length > 0
          ? newProducts.map((el) => {
              return (
                <React.Fragment key={el.itemNo}>
                  <div className={styles.componentWrapper}>
                    <MainComponent
                      name={el.title}
                      price={el.currentPrice}
                      img={el.imageUrls.slice(0, 1)}
                      item={el.itemNo}
                    />
                  </div>
                </React.Fragment>
              );
            })
          : null}
      </div>
    </>
  );
}

MainNew.propTypes = {
  newProducts: PropTypes.array,
};

export default MainNew;
