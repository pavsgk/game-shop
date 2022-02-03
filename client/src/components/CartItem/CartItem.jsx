import styles from './CartItem.module.scss';
import {ReactComponent as DeletePic} from '../../assets/svg/delete.svg';
import {ReactComponent as MinusPic} from '../../assets/svg/count_minus.svg';
import {ReactComponent as PlusPic} from '../../assets/svg/count_plus.svg';

const CartItem = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.infoWrapper}>
        <div className={styles.infoWrapperBlock}>
          <div className={styles.infoWrapperBlockImg}>
            <img
              src="https://steampay.com/product/star-wars-jedi-fallen-order.jpg?1640617604"
              alt="some product pic"
            />
          </div>
          <div className={styles.infoWrapperBlockTitle}>
            <p className={styles.infoWrapperBlockTitleText}>STAR WARS JEDI: FALLEN ORDER</p>
            <span className={styles.infoWrapperBlockTitleCode}>W42234</span>
          </div>
        </div>
        <div>
          <DeletePic className={styles.infoWrapperDeleteSVG} />
        </div>
      </div>
      <div className={styles.priceWrapper}>
        <div className={styles.priceWrapperQuantity}>
          <p className={styles.priceWrapperQuantityValue}>Quantity: 1</p>
          <div className={styles.priceWrapperQuantityBlock}>
            <div className={styles.priceWrapperQuantityBlockMinus}>
              <MinusPic className={styles.priceWrapperQuantityBlockMinusItem} />
            </div>
            <div className={styles.priceWrapperQuantityBlockValue}>1</div>
            <div className={styles.priceWrapperQuantityBlockPlus}>
              <PlusPic className={styles.priceWrapperQuantityBlockPlusItem} />
            </div>
          </div>
        </div>
        <div className={styles.priceWrapperValue}>$ 80.00</div>
      </div>
    </div>
  );
};

export default CartItem;
