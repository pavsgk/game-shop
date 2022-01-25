import TabSelector from '../../components/TabSelector/TabSelector';
import PaymentSuccess from '../../components/PaymentSuccess/PaymentSuccessful';
import styles from './CheckoutPage.module.scss';
import ShippingForm from '../../components/ShippingForm/ShippingForm';

function CheckoutPage() {
  return (
    <div className={styles.checkoutPage}>
      <section className={styles.tabs}>
        <TabSelector tabs={['shipping information', 'delivery method', 'payment information']}>
          <ShippingForm />
          <h2>tab2 content</h2>
          <div>
            <h2>tab3 content</h2>
            <PaymentSuccess />
          </div>
        </TabSelector>
      </section>
    </div>
  );
}

export default CheckoutPage;
