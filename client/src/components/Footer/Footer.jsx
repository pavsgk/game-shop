import styles from './Footer.module.scss';
import React, {useEffect, useState} from 'react';
import {ReactComponent as Phone} from './img/call.svg';
import {ReactComponent as Mail} from './img/mail.svg';
import {ReactComponent as Inst} from './img/instagram.svg';
import {ReactComponent as Location} from './img/location.svg';
import {ReactComponent as User} from './img/user.svg';
import {Link} from 'react-router-dom';

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
      <Link exact="true" className={styles.navLink} to="/admin">
        ~
      </Link>
      <Link exact="true" className={styles.navLink} to="/user">
        <User className={styles.details} />
      </Link>
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
