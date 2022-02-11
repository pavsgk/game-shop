import styles from './Button.module.scss';

function Button(props) {
  const {type, children, onClick} = props;
  return (
    <button onClick={onClick} className={styles.btn} type={type}>
      {children}
    </button>
  );
}

export default Button;
