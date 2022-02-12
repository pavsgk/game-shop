import styles from './ProductItem.module.scss';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import {addItemToTheCart} from '../../store/reducers/cartReducer';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import {
  switchImagesModalState,
  addContentForImagesModal,
} from '../../store/reducers/imagesModalReducer';
import {Carousel} from 'react-carousel-minimal';

const ProductItem = (props) => {
  const {title, currentPrice, description, itemNo, genre, publishe, imageUrls, age} = props.item;
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  const data = imageUrls.map((item) => {
    return {
      image: item,
    };
  });

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
        <Carousel
          data={data}
          time={4000}
          width="850px"
          radius="10px"
          automatic={true}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="#1e1e1e"
          slideImageFit="contain"
          thumbnails={true}
          thumbnailWidth="100px"
          showNavBtn={true}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.content_Title}>
          <h2 className={styles.content_Title_Text}>{title}</h2>
          <span className={styles.content_Title_Code}>{itemNo}</span>
        </div>
        <div className={styles.content_Price}>
          <div className={styles.content_Price_Item}>{currentPrice}</div>
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
          />

          <CustomAccordion
            title="Product details"
            isProductPage={true}
            content={
              <>
                <div className={styles.content_Details_Wrapper_Item}>
                  <p>Genre:</p>
                  <span>{genre}</span>
                </div>
                <div className={styles.content_Details_Wrapper_Item}>
                  <p>Company:</p>
                  <span>{publishe}</span>
                </div>
                <div className={styles.content_Details_Wrapper_Item}>
                  <p>Rating:</p>
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
