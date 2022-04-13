import {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {newSearchRequest, setResultsVisibility} from '../../store/reducers/searchReducer';
import {throttle} from '../../utils/decorators';
import styles from './SearchBar.module.scss';

function SearchBar() {
  const [searchString, setSearchString] = useState('');
  const dispatch = useDispatch();

  const search = useRef(
    throttle(
      (value) => {
        if (value.trim().length > 2) dispatch(newSearchRequest(value));
      },
      1000,
      false,
    ),
  );

  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="     Search..."
        value={searchString}
        onFocus={({target: {value}}) => {
          if (value.trim().length > 2) dispatch(setResultsVisibility(true));
        }}
        onChange={({target: {value}}) => {
          setSearchString(value);
          if (!value.trim()) dispatch(setResultsVisibility(false));
          search.current(value);
        }}
      />
    </div>
  );
}

export default SearchBar;
