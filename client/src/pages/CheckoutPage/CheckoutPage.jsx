import styles from './CheckoutPage.module.scss';
import ShippingForm from '../../components/ShippingForm/ShippingForm';
import Delivery from '../../components/Delivery/Delivery';
import Payment from '../../components/Payment/Payment';
import ItemSummary from '../../components/ItemSummary/ItemSummary';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import CheckoutSelector from '../../components/CheckoutSelector/CheckoutSelector';
import {useSelector} from 'react-redux';

function CheckoutPage() {
  const products = useSelector(({cart}) => cart.products);

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.summary}>
        <ItemSummary products={products} />
        <OrderSummary />
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
