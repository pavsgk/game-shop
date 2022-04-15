import styles from './AltAuthorization.module.scss';
import {ReactComponent as FacebookSvg} from '../../assets/svg/facebook.svg';
import {ReactComponent as GoogleSvg} from '../../assets/svg/google.svg';

const AltAuthorization = () => {
  return (
    <>
      <p className={styles.separation}>or</p>
      <div className={styles.altAuthorization}>
        <div className={styles.facebookWrapper}>
          <FacebookSvg className={styles.facebookSvg} />
          <p>Facebook</p>
        </div>
        <div className={styles.googleWrapper}>
          <GoogleSvg className={styles.googleSvg} />
          <p>Google</p>
        </div>
      </div>
    </>
  );
};

export default AltAuthorization;
