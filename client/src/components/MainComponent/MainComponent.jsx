import styles from './MainComponent.module.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as New} from './img/new.svg';

function MainComponent(props) {
  const {name, img, price, item} = props;
  return (
    <>
      <Link to={`/details?${item}`}>
        <div className={styles.wrapper}>
          <New className={styles.svg} />
          <img className={styles.img} src={img} alt={name} />
          <div className={styles.info}>
            <p className={styles.name}>{name}</p>
            <p className={styles.price}>
              {price}
              <span> &#8372;</span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default MainComponent;
