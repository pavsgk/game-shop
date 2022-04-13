import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {pushHistory} from '../../store/reducers/routerReducer';
import {setResultsVisibility} from '../../store/reducers/searchReducer';

function RouteTracker({children}) {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(pushHistory(location));
    dispatch(setResultsVisibility(false));
  }, [location, dispatch]);

  return children || null;
}

export default RouteTracker;
