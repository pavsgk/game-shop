import styles from './Button.module.scss';

function Button(props) {
  const {children} = props;
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  );
}

export default Button;
