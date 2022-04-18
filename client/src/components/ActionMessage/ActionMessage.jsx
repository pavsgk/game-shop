import {useSelector} from 'react-redux';
import styles from './ActionMessage.module.scss';

function ActionMessage() {
  const {isActive, type, text} = useSelector(({message}) => message);

  if (!isActive) {
    return null;
  }

  return (
    <div className={type === 'success' ? styles.successful : styles.error}>
      <span>{text}</span>
    </div>
  );
}

export default ActionMessage;
