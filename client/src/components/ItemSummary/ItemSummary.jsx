import styles from './ItemSummary.module.scss';
import ItemSummaryComponent from '../ItemSummaryComponent/ItemSummaryComponent';
import React from 'react';

function ItemSummary() {
  return (
    <div className={styles.itemSummary}>
      <div className={styles.titleBox}>
        <p className={styles.title}>Item Summary</p>
        <span className={styles.edit}>Edit</span>
      </div>
      <div className={styles.elem}> </div>

      <ItemSummaryComponent
        name={'Star Wars Limited Edition Watch by Citizen'}
        img={
          'https://img.championat.com/c/1350x759/news/big/c/f/insajder-podelilsya-podrobnostyami-prodolzheniya-star-wars-jedi-fallen-order_16417156602069706272.jpg'
        }
        price={380}
        quantity={2}
        code={'W-47209'}
      />

      <ItemSummaryComponent
        name={'testtttt ttttttttt tttt'}
        img={
          'https://img.championat.com/s/735x490/news/big/y/o/star-wars-jedi-fallen-order-2-predstavyat-uzhe-v-aprele-mae_16415397982102541861.jpg'
        }
        price={888}
        quantity={1}
        code={'www0002'}
      />
    </div>
  );
}

export default ItemSummary;
