import styles from './Genres.module.scss';
import React from 'react';
import {ReactComponent as Action} from './img/Action.svg';
import {ReactComponent as Arcade} from './img/Arcade.svg';
import {ReactComponent as Indie} from './img/Indie.svg';
import {ReactComponent as MMO} from './img/mmo.svg';
import {ReactComponent as RPG} from './img/rpg.svg';
import {ReactComponent as Shooters} from './img/Shooters.svg';
import {ReactComponent as Simulator} from './img/Simulator.svg';
import {ReactComponent as Sport} from './img/sport.svg';
import {ReactComponent as Strategy} from './img/Strategy.svg';
import {ReactComponent as Two} from './img/two1.svg';

function Genres() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.genre}>
          <Action className={styles.img} />
          <p>action</p>
        </div>

        <div className={styles.genre}>
          <Arcade className={styles.img} />
          <p>arcade</p>
        </div>

        <div className={styles.genre}>
          <Indie className={styles.img} />
          <p>indie</p>
        </div>

        <div className={styles.genre}>
          <MMO className={styles.img} />
          <p>MMO</p>
        </div>

        <div className={styles.genre}>
          <RPG className={styles.img} />
          <p>RPG</p>
        </div>

        <div className={styles.genre}>
          <Shooters className={styles.img} />
          <p>shooters</p>
        </div>

        <div className={styles.genre}>
          <Simulator className={styles.img} />
          <p>simulator</p>
        </div>

        <div className={styles.genre}>
          <Sport className={styles.img} />
          <p>sport</p>
        </div>

        <div className={styles.genre}>
          <Strategy className={styles.img} />
          <p>strategy</p>
        </div>

        <div className={styles.genre}>
          <Two className={styles.img} />
          <p>for two</p>
        </div>
      </div>
    </>
  );
}

export default Genres;
