import styles from './SomethingWentWrong.module.scss';
import oopsImage from '../OrderConfirmed/success.png';
import Button from '../Button/Button';

function SomethingWentWrong() {
  return (
    <section className={styles.root}>
      <h1>Something went wrong...</h1>
      <img src={oopsImage} alt="Oooops" width={170} height={150} />
      <p>Try to reload page</p>
      <Button onClick={() => window?.location?.reload()}>Reload</Button>
    </section>
  );
}

export default SomethingWentWrong;
