import styles from './Footer.module.scss';
import React, {useEffect, useState} from 'react';
import {ReactComponent as Phone} from './img/call.svg';
import {ReactComponent as Mail} from './img/mail.svg';
import {ReactComponent as Inst} from './img/instagram.svg';
import {ReactComponent as Location} from './img/location.svg';

function Footer() {
  const [isAbsolute, setIsAbsolute] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.body.clientHeight < 500) {
        setIsAbsolute(true);
      } else {
        if (isAbsolute) setIsAbsolute(false);
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [isAbsolute]);

  return (
    <div className={isAbsolute ? styles.absFooter : styles.footer}>
      <div className={styles.section}>
        <a href="tel:0800-600-609" target="_blank" className={styles.info} rel="noreferrer">
          <Phone className={styles.svg} />
          <div className={styles.details}>800-600-609</div>
        </a>
        <a href="https://instagram.com" target="_blank" className={styles.info} rel="noreferrer">
          <Inst className={styles.svg} />
          <div className={styles.details}>@StarWars_videoGames</div>
        </a>
      </div>
      <div className={styles.section}>
        <a
          href="https://www.google.com/maps/place/ул.+Крещатик,+30,+Киев"
          target="_blank"
          className={styles.info}
          rel="noreferrer">
          <Location className={styles.svg} />
          <p className={styles.details}>Kiev, Khreschatyk Str., 30</p>
        </a>
        <a
          href="mailto:StarWars.games@gmail.com"
          target="_blank"
          className={styles.info}
          rel="noreferrer">
          <Mail className={styles.svg} />
          <p className={styles.details}>StarWars.games@gmail.com</p>
        </a>
      </div>
    </div>
  );
}

export default Footer;
