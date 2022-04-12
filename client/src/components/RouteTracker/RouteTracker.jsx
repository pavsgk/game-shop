import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {setResultsVisibility} from '../../store/reducers/searchReducer';

function RouteTracker({children}) {
  const loaction = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setResultsVisibility(false));
  }, [loaction.pathname, dispatch]);

  return children || null;
}

export default RouteTracker;
