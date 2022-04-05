import styles from './Footer.module.scss';
import React from 'react';
import {ReactComponent as Phone} from './img/call.svg';
import {ReactComponent as Mail} from './img/mail.svg';
import {ReactComponent as Inst} from './img/instagram.svg';
import {ReactComponent as Location} from './img/location.svg';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.section}>
        <div className={styles.info}>
          <Phone className={styles.svg} />
          <div className={styles.details}>0800-600-609</div>
        </div>
        <div className={styles.info}>
          <Inst className={styles.svg} />
          <div className={styles.details}>@StarWars_videoGames</div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.info}>
          <Location className={styles.svg} />
          <p className={styles.details}>Kiev, Kreshchatik Str., 30</p>
        </div>
        <div className={styles.info}>
          <Mail className={styles.svg} />
          <p className={styles.details}>StarWars.games@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
