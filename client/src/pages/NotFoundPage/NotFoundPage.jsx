import styles from './NotFoundPage.module.scss';
import {ReactComponent as TelescopeSvg} from './telescope.svg';
import {useNavigate} from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (window.history <= 1) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.notFoundPage}>
      <TelescopeSvg className={styles.telescope} />
      <h2>Oops!</h2>
      <h3>
        Page not found,{' '}
        <a href="/#" onClick={handleClick}>
          return to previous page
        </a>
      </h3>
    </div>
  );
}
