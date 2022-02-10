import styles from './CheckoutPage.module.scss';
import ShippingForm from '../../components/ShippingForm/ShippingForm';
import Delivery from '../../components/Delivery/Delivery';
import Payment from '../../components/Payment/Payment';
import ItemSummary from '../../components/ItemSummary/ItemSummary';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import CheckoutSelector from '../../components/CheckoutSelector/CheckoutSelector';

function CheckoutPage() {
  return (
    <div className={styles.checkoutPage}>
      <div className={styles.summary}>
        <ItemSummary />
        <OrderSummary subtotal={77.94} shipping={11.95} total={89.94} />
      </div>
      <section className={styles.tabs}>
        <CheckoutSelector tabs={['shipping information', 'delivery method', 'payment information']}>
          <ShippingForm />
          <Delivery />
          <Payment />
        </CheckoutSelector>
      </section>
    </div>
  );
}

export default CheckoutPage;
