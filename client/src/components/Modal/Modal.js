import style from './Modal.module.scss';
import TabSelector from '../../../../../../TabSelector/TabSelector';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import {ReactComponent as CloseButton} from '../../assets/svg/count_plus.svg';

const ModalContainer = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <CloseButton className={style.closeButton} />
        <TabSelector tabs={['Sign-In', 'Sign-Up']} isSignForm={true}>
          <SignIn />
          <SignUp />
        </TabSelector>
      </div>
      <div className={style.background} />
    </div>
  );
};

export default ModalContainer;
