import {useSelector} from 'react-redux';
import styles from './SuccessfullyAddModal.module.scss';

function SuccessfullyAddModal() {
  const [modalState, text] = useSelector((state) => [
    state.successAddModal.modalState,
    state.successAddModal.modalText,
  ]);

  if (!modalState) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <span>{text}</span>
    </div>
  );
}

export default SuccessfullyAddModal;
