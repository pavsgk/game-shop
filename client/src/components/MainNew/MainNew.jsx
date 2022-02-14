import styles from './MainNew.module.scss';
import MainComponent from '../MainComponent/MainComponent';
import React from 'react';

function MainNew() {
  return (
    <>
      <p className={styles.title}>new</p>
      <div className={styles.wrapper}>
        <div>
          <MainComponent
            name={'Horizon 5'}
            price={15}
            img={
              'https://upload.wikimedia.org/wikipedia/ru/3/3e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Star_Wars_Jedi_Fallen_Order.jpg'
            }
          />
        </div>
        <div>
          <MainComponent
            name={'Forza Horizon 5'}
            price={15}
            img={
              'https://upload.wikimedia.org/wikipedia/ru/5/58/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Forza_Horizon_5.jpg'
            }
          />
        </div>
        <div>
          <MainComponent
            name={'Forza Horizon 5'}
            price={15}
            img={
              'https://image.api.playstation.com/vulcan/ap/rnd/202008/1318/8XGEPtD1xoasK0FYkYNcCn1z.png'
            }
          />
        </div>
        <div>
          <MainComponent
            name={'Forza Horizon 5'}
            price={15}
            img={
              'https://upload.wikimedia.org/wikipedia/ru/3/3e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Star_Wars_Jedi_Fallen_Order.jpg'
            }
          />
        </div>
        <div>
          <MainComponent
            name={'Forza Horizon 5'}
            price={15}
            img={
              'https://upload.wikimedia.org/wikipedia/ru/3/3e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Star_Wars_Jedi_Fallen_Order.jpg'
            }
          />
        </div>
        <div>
          <MainComponent
            name={'Forza Horizon 5'}
            price={15}
            img={
              'https://upload.wikimedia.org/wikipedia/ru/3/3e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Star_Wars_Jedi_Fallen_Order.jpg'
            }
          />
        </div>
        <div>
          <MainComponent
            name={'Forza Horizon 5'}
            price={15}
            img={
              'https://upload.wikimedia.org/wikipedia/ru/3/3e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Star_Wars_Jedi_Fallen_Order.jpg'
            }
          />
        </div>
        <div>
          <MainComponent
            name={'Forza Horizon 5'}
            price={15}
            img={
              'https://upload.wikimedia.org/wikipedia/ru/3/3e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Star_Wars_Jedi_Fallen_Order.jpg'
            }
          />
        </div>
      </div>
    </>
  );
}

export default MainNew;
