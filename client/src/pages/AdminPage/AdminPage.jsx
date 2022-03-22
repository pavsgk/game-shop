import QuickLogin from './QuickLogin';
import styles from './AdminPages.module.scss';
import CartInspector from './CartInspector';
import instance from '../../api/instance';
import {useState} from 'react';

export function AdminPage() {
  const [isLocal, setIsLocal] = useState(
    instance.defaults.baseURL === 'http://localhost:5000/api/' ? true : false,
  );

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const switchSource = () => {
    if (isLocal) {
      instance.defaults.baseURL = 'https://game-shop-fe30.herokuapp.com/api/';
    } else {
      instance.defaults.baseURL = 'http://localhost:5000/api/';
    }
    setIsLocal(!isLocal);
  };

  return (
    <div className={styles.page}>
      <QuickLogin className={styles.container} />
      <CartInspector className={styles.container} />
      <div className={styles.container}>
        Misc:
        <button onClick={() => clearLocalStorage()}>Clear local storage</button>
        <button onClick={() => switchSource()}>
          Switch source ({isLocal ? 'local' : 'remote'})
        </button>
      </div>
    </div>
  );
}
