import {useSelector} from 'react-redux';
import ItemSummary from '../ItemSummary/ItemSummary';
import styles from './SearchResults.module.scss';
import {useDispatch} from 'react-redux';
import {setResultsVisibility} from '../../store/reducers/searchReducer';
import Preloader from '../Preloader/Preloader';

function SearchResults() {
  const {isPending, isError, isVisible, results, queryString} = useSelector(
    (state) => state.search,
  );
  const dispatch = useDispatch();

  if (!isVisible) return null;

  return (
    <>
      <div className={styles.container} onClick={() => dispatch(setResultsVisibility(false))}>
        <button
          className={styles.closeButton}
          onClick={() => {
            dispatch(setResultsVisibility(false));
          }}>
          X
        </button>
        {isPending && <Preloader />}
        {isError && <h2>Check your internet connection and try again</h2>}
        {!isPending && !isError && (
          <ItemSummary products={results} title={`Search results for '${queryString}'`} />
        )}
      </div>
    </>
  );
}

export default SearchResults;
