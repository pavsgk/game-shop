import styles from './MainComponent.module.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as New} from './img/new.svg';
import {ReactComponent as Sale} from './img/sale.svg';

function MainComponent(props) {
  const {name, img, price, item, previousPrice, isSale} = props;
  return (
    <>
      <Link to={`/details?${item}`}>
        <div className={styles.wrapper}>
          <img className={styles.img} src={img} alt={name} />
          <div className={styles.info}>
            <p className={styles.name}>{name}</p>
            <div className={styles.priceBox}>
              <p className={styles.previousPrice}> {previousPrice} </p>
              <p className={styles.price}>
                {price}
                <span> &#8372;</span>
              </p>
            </div>
          </div>
        </div>
        <New className={styles.svgNew} />
        {isSale && <Sale className={styles.svgSale} />}
      </Link>
    </>
  );
}

export default MainComponent;
