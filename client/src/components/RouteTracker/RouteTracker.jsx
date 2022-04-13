import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {setResultsVisibility} from '../../store/reducers/searchReducer';

function RouteTracker({children}) {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setResultsVisibility(false));
  }, [location, dispatch]);

  return children || null;
}

export default RouteTracker;
