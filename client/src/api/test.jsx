import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {logout, newLogin, init} from '../store/reducers/userReducer.js';
import {getCatalog} from './catalog.js';
import {getAllFilters, getFiltersTree, getFiltersByType} from './filters.js';
import {parseProductsKeys} from './parsers.js';
import {getProduct} from './products.js';

function TestPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user);

  const test = async () => {};

  test();

  return (
    <>
      <button onClick={() => dispatch(init())}>Init</button>
      <button
        onClick={() =>
          dispatch(
            newLogin({
              loginOrEmail: 'customer@gmail.com',
              password: '1111111',
            }),
          )
        }>
        Login
      </button>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </>
  );
}

export default TestPage;
