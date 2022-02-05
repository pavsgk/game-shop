import TabSelector from '../../components/TabSelector/TabSelector';
import styles from './CheckoutPage.module.scss';
import ShippingForm from '../../components/ShippingForm/ShippingForm';
import Delivery from '../../components/Delivery/Delivery';
import Payment from '../../components/Payment/Payment';
import ItemSummary from '../../components/ItemSummary/ItemSummary';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

function CheckoutPage() {
  return (
    <div className={styles.checkoutPage}>
      <div section className={styles.summary}>
        <ItemSummary />
        <OrderSummary subtotal={77.94} shipping={11.95} total={89.94} />
      </div>
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
