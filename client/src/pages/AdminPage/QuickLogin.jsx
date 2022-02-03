import {useEffect, useRef} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {newLogin, logout} from '../../store/reducers/userReducer';

export default function QuickLogin({className}) {
  const {
    isAuthorized,
    userData: {isAdmin, token},
  } = useSelector((state) => state.user, shallowEqual);
  const login = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    login.current.value = 'Customer';
    password.current.value = '1111111';
  }, []);

  return (
    <div className={className}>
      <h3>Quick login</h3>
      <label>
        Login / Email: <input ref={login} />
      </label>
      <label>
        Password: <input ref={password} />
      </label>
      <button
        onClick={() => {
          dispatch(
            newLogin({
              loginOrEmail: login.current.value,
              password: password.current.value,
            }),
          );
        }}
        disabled={isAuthorized}>
        Authorize
      </button>
      <button onClick={() => dispatch(logout())} disabled={!isAuthorized}>
        Unauthorize
      </button>
      <div>isAuthorized? {String(isAuthorized)}</div>
      <div>isAdmin? {String(isAdmin)}</div>
      <hr />
      Token:<p>{token}</p>
    </div>
  );
}
