import QuickLogin from './QuickLogin';
import styles from './AdminPages.module.scss';
import CartInspector from './CartInspector';
import instance from '../../api/instance';
import {useState} from 'react';
import {searchProducts} from '../../api/products';
import SearchBar from '../../components/SearchBar/SearchBar';
import inputThrottle from '../../utils/decorators';
import SearchResults from '../../components/SearchResults/SearchResults';
import {useDispatch} from 'react-redux';
import {getUserFields} from '../../store/reducers/checkoutReducer';

export function AdminPage() {
  const dispatch = useDispatch();
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
    <>
      <div className={styles.page}>
        <QuickLogin className={styles.container} />
        <CartInspector className={styles.container} />
        <div className={styles.container}>
          Misc:
          <button onClick={() => clearLocalStorage()}>Clear local storage</button>
          <button onClick={() => switchSource()}>
            Switch source ({isLocal ? 'local' : 'remote'})
          </button>
          <SearchBar />
          <button onClick={() => dispatch(getUserFields())}>test</button>
        </div>
      </div>
      <SearchResults />
    </>
  );
}
