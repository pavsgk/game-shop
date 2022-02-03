import style from './SignModalContainer.module.scss';
import TabSelector from '../TabSelector/TabSelector';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import {ReactComponent as CloseButton} from '../../assets/svg/count_plus.svg';
// import {useSelector} from "react-redux"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react";
import {closeSignModal} from "../../store/reducers/signInUpReducer";

const SignModalContainer = () => {

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(closeSignModal())
    }

    const modalState = useSelector(state => state.signModal.modalState);

  if (!modalState) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
          <div onClick={closeModal} className={style.closeButton}>
              <CloseButton  />
          </div>
        <TabSelector tabs={['Sign-In', 'Sign-Up']} isSignForm={true}>
          <SignIn />
          <SignUp />
        </TabSelector>
      </div>
      <div onClick={closeModal} className={style.background} />
    </div>
  );
};

export default SignModalContainer;
