import {useSelector} from 'react-redux';
import styles from './ActionMessage.module.scss';

function ActionMessage() {
  const [modalState, type, text] = useSelector((state) => [
    state.actionMessage.modalState,
    state.actionMessage.type,
    state.actionMessage.text,
  ]);

  if (!modalState) {
    return null;
  }

  return (
    <div className={type === 'successful' ? styles.successful : styles.error}>
      <span>{text}</span>
    </div>
  );
}

export default ActionMessage;
