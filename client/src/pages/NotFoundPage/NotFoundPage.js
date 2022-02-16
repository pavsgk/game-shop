import styles from './NotFoundPage.module.scss';
import {ReactComponent as TelescopeSvg} from './telescope.svg';

export default function NotFoundPage() {
  return (
    <div className={styles.NotFoundPage}>
      <TelescopeSvg />
    </div>
  );
}
