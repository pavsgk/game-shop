import QuickLogin from './QuickLogin';
import styles from './AdminPages.module.scss';
import CartInspector from './CartInspector';

export function AdminPage() {
  return (
    <div className={styles.page}>
      <QuickLogin className={styles.container} />
      {/* <CartInspector className={styles.container} /> */}
    </div>
  );
}
