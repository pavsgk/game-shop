import QuickLogin from './QuickLogin';
import styles from './AdminPages.module.scss';
import CartInspector from './CartInspector';
import instance from '../../api/instance';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {showMessage} from '../../store/reducers/messageReducer';
import {getProduct, updateProduct} from '../../api/products';

const dataArr = [];

const replaceUrls = async () => {
  for (const prod of dataArr) {
    const {itemNo, imageUrls} = prod;
    const oldProduct = await getProduct(itemNo);
    const updatedProduct = {...oldProduct, imageUrls};
    const result = await updateProduct(oldProduct._id, updatedProduct);
    console.log(result);
  }
  console.log('Mass update done');
};

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
          <button
            onClick={() => {
              dispatch(showMessage({text: 'Test message'}));
            }}>
            test
          </button>
          <button onClick={() => replaceUrls()}>replace urls</button>
        </div>
      </div>
    </>
  );
}
