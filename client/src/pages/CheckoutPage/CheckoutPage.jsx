import TabSelector from '../../components/TabSelector/TabSelector';
import styles from './CheckoutPage.module.scss';
import ShippingForm from '../../components/ShippingForm/ShippingForm';
import Delivery from '../../components/Delivery/Delivery';
import Payment from '../../components/Payment/Payment';

function CheckoutPage() {
  return (
    <div className={styles.checkoutPage}>
      <section className={styles.tabs}>
        <TabSelector tabs={['shipping information', 'delivery method', 'payment information']}>
          <ShippingForm />
          <Delivery />
          <Payment />
        </TabSelector>
      </section>
    </div>
  );
}

export default CheckoutPage;
