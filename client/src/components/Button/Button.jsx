import styles from './Button.module.scss';

function Button(props) {
  const {type, children} = props;
  return (
    <button className={styles.btn} type={type}>
      {children}
    </button>
  );
}

export default Button;
