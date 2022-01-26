import TabSelector from '../../components/TabSelector/TabSelector';
import styles from './CheckoutPage.module.scss';
import ShippingForm from '../../components/ShippingForm/ShippingForm';

function CheckoutPage() {
  return (
    <div className={styles.checkoutPage}>
      <section className={styles.tabs}>
        <TabSelector tabs={['shipping information', 'delivery method', 'payment information']}>
          <ShippingForm />
          <div>
            <h2>tab2 content</h2>
          </div>
          <div>
            <h2>tab3 content</h2>
          </div>
        </TabSelector>
      </section>
    </div>
  );
}

export default CheckoutPage;
