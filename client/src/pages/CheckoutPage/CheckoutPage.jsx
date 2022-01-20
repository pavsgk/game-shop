import TabSelector from '../../components/TabSelector/TabSelector';
import styles from './CheckoutPage.module.scss';

function CheckoutPage() {
  return (
    <div className={styles.CheckoutPage}>
      <section className={styles.Tabs}>
        <TabSelector tabs={['shipping information', 'delivery method', 'payment information']}>
          <h2>tab1 content</h2>
          <h2>tab2 content</h2>
          <h2>tab3 content</h2>
        </TabSelector>
      </section>
    </div>
  );
}

export default CheckoutPage;
