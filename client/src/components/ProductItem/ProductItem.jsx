import styles from './ProductItem.module.scss';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import {addItemToTheCart} from '../../store/reducers/cartReducer';
import {useDispatch} from 'react-redux';
import {useEffect, useRef} from 'react';
import {
  switchImagesModalState,
  addContentForImagesModal,
} from '../../store/reducers/imagesModalReducer';
import ProductItemSlider from '../ProductItemSlider/ProductItemSlider';

const ProductItem = (props) => {
  const {title, currentPrice, description, itemNo, genre, publisher, imageUrls, age} = props.item;
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  useEffect(() => {
    const openModalImages = () => {
      dispatch(addContentForImagesModal(imageUrls));
      dispatch(switchImagesModalState());
    };

    const slider = sliderRef.current;

    slider.querySelector('#thumbnail-div').style.justifyContent = 'space-evenly';
    slider.querySelector('#thumbnail-div').style.marginTop = '40px';
    slider.querySelectorAll('.thumbnail').forEach((item) => (item.style.height = `70px`));

    slider.addEventListener('click', (event) => {
      if (event.target.tagName === 'IMG') {
        openModalImages();
      }
    });

    return () => {
      if (slider) {
        slider.removeEventListener('click', (event) => {
          if (event.target.tagName === 'IMG') {
            openModalImages();
          }
        });
      }
    };
  }, []);

  const addToCart = () => {
    dispatch(addItemToTheCart(props.item));
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mobileProductTitle}>
        <h2 className={styles.mobileProductTitle_Text}>{title}</h2>
        <span className={styles.mobileProductTitle_Code}>{itemNo}</span>
      </div>
      <div ref={sliderRef} className={styles.productIMGWrapper}>
        <ProductItemSlider imageUrls={imageUrls} />
      </div>
      <div className={styles.content}>
        <div className={styles.content_Title}>
          <h2 className={styles.content_Title_Text}>{title}</h2>
          <span className={styles.content_Title_Code}>{itemNo}</span>
        </div>
        <div className={styles.content_Price}>
          <div className={styles.content_Price_Item}>&#8372; {currentPrice}</div>
          <button onClick={addToCart} className={styles.content_Price_Button}>
            add to cart
          </button>
        </div>
        <div className={styles.content_Wrapper}>
          <CustomAccordion
            isExpanded={true}
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
                <div className={styles.content_Details_Wrapper_Item}>
                  <p style={{width: '40%'}}>Genre:</p>
                  <span>
                    {genre.map((e, index) => {
                      if (index < genre.length - 1) {
                        return `${e}, `;
                      } else return `${e}`;
                    })}
                  </span>
                </div>
                <div className={styles.content_Details_Wrapper_Item}>
                  <p style={{width: '40%'}}>Publisher:</p>
                  <span>{publisher}</span>
                </div>
                <div className={styles.content_Details_Wrapper_Item}>
                  <p style={{width: '40%'}}>Rating:</p>
                  <span>{age}</span>
                </div>
              </>
            }
          />

          <CustomAccordion
            title="Shipping & delivery"
            isProductPage={true}
            content={
              <>
                <div className={styles.content_Delivery_Text}>
                  <p className={styles.content_Delivery_Text_item}>
                    Product Delivery generally takes 1-6 business days, depending on location and
                    delivery method.
                  </p>
                  <p className={styles.content_Delivery_Text_item}>
                    Courier delivery in Kyiv. When ordering, our managers clarify all the necessary
                    information. Specialists check the address, find out when it is convenient for
                    you to meet the courier.
                  </p>
                  <p className={styles.content_Delivery_Text_item}>
                    You can also order delivery with Nova Posta. There are express (1-3 business
                    days) and standard (4-5 business days) delivery methods.
                  </p>
                  <p className={styles.content_Delivery_Text_item}>
                    Prices: courier - $16,95, express - $10,95, standard - $7,95.
                  </p>
                </div>
              </>
            }
          />

          <CustomAccordion
            title="Reviews"
            isProductPage={true}
            content={<p className={styles.content_Reviews_Title_Item}>Reviews</p>}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
