import styles from './ProductItemAbout.module.scss';
import CustomAccordion from '../CustomAccordion/CustomAccordion';

function ProductItemContent(props) {
  const {description, genre, platform, publisher, age} = props;

  return (
    <div className={styles.wrapper}>
      <CustomAccordion
        title="Description"
        isProductPage={true}
        content={description}
        style={{textTransform: 'initial'}}
      />

      <CustomAccordion
        title="Product details"
        isProductPage={true}
        content={
          <>
            <div className={styles.wrapperItem}>
              <p style={{width: '40%'}}>Genre:</p>
              <span>
                {genre.map((e, index) => {
                  if (index < genre.length - 1) {
                    return `${e}, `;
                  } else return `${e}`;
                })}
              </span>
            </div>
            <div className={styles.wrapperItem}>
              <p style={{width: '40%'}}>Platforms:</p>
              <span>{Array.isArray(platform) ? platform.join(', ') : platform}</span>
            </div>
            <div className={styles.wrapperItem}>
              <p style={{width: '40%'}}>Publisher:</p>
              <span>{publisher}</span>
            </div>
            <div className={styles.wrapperItem}>
              <p style={{width: '40%'}}>Rating:</p>
              <span>{age}</span>
            </div>
          </>
        }
      />

      <CustomAccordion
        title="Shipping &#38; delivery"
        isProductPage={true}
        content={
          <>
            <div className={styles.deliveryWrapper}>
              <p className={styles.deliveryWrapperItem}>
                Product Delivery generally takes 1-6 business days, depending on location and
                delivery method.
              </p>
              <p className={styles.deliveryWrapperItem}>
                Courier delivery in Kyiv. When ordering, our managers clarify all the necessary
                information. Specialists check the address, find out when it is convenient for you
                to meet the courier.
              </p>
              <p className={styles.deliveryWrapperItem}>
                You can also order delivery with Nova Posta. There are express (1-3 business days)
                and standard (4-5 business days) delivery methods.
              </p>
              <p className={styles.deliveryWrapperItem}>
                Prices: courier - 120 &#8372;, express - 79,95 &#8372;, standard - 29,95 &#8372;.
              </p>
            </div>
          </>
        }
      />

      <CustomAccordion
        title="Reviews"
        isProductPage={true}
        content={<p className={styles.reviews}>Reviews</p>}
      />
    </div>
  );
}

export default ProductItemContent;
