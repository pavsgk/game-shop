import styles from './ProductItem.module.scss';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {
  switchImagesModalState,
  addContentForImagesModal,
} from '../../store/reducers/imagesModalReducer';
import ProductItemSlider from '../ProductItemSlider/ProductItemSlider';
import {
  addItemToTheCartForNotLog,
  addMoreThanOneProductsToTheCart,
} from '../../store/reducers/cartReducer';
import {openSignModal} from '../../store/reducers/signInUpReducer';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Button from '../Button/Button';
import {addWishedProduct, removeWishedProduct} from '../../store/reducers/wishlistReducer';
import {ReactComponent as MinusPic} from '../../assets/svg/count_minus.svg';
import {ReactComponent as PlusPic} from '../../assets/svg/count_plus.svg';

const ProductItem = (props) => {
  const {
    title,
    currentPrice,
    previousPrice,
    description,
    itemNo,
    genre,
    publisher,
    imageUrls,
    age,
    _id,
    platform,
    quantity,
  } = props;

  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const sliderRef = useRef(null);
  const {wishlist} = useSelector((state) => state.wishlist);
  const [isFavourite, setIsFavourite] = useState(false);
  const [countInputValue, setCountInputValue] = useState(1);
  const [cart, sum] = useSelector((state) => [state.cart.products, state.cart.cartSum]);

  useEffect(() => {
    const openModalImages = (currentImg) => {
      const currentUrls = imageUrls.slice();
      const index = currentUrls.findIndex((item) => item === currentImg);
      currentUrls.splice(index, 1);
      currentUrls.unshift(currentImg);
      dispatch(addContentForImagesModal(currentUrls));
      dispatch(switchImagesModalState());
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.querySelector('#thumbnail-div').style.justifyContent = 'space-evenly';
      slider.querySelector('#thumbnail-div').style.marginTop = '40px';
      slider.querySelectorAll('.thumbnail').forEach((item) => (item.style.height = `70px`));

      slider.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
          openModalImages(event.target.src);
        }
      });
    }

    return () => {
      if (slider) {
        slider.removeEventListener('click', (event) => {
          if (event.target.tagName === 'IMG') {
            openModalImages(event.target.src);
          }
        });
      }
    };
  }, []);

  useEffect(() => {
    if (wishlist.length === 0) {
      setIsFavourite(false);
      return;
    }

    wishlist.forEach((item) => {
      if (item.itemNo === itemNo) {
        setIsFavourite(true);
        return;
      }
      setIsFavourite(false);
    });
  }, [wishlist]);

  const addToCart = () => {
    const cartItem = {product: props, cartQuantity: countInputValue};

    if (isAuthorized) {
      dispatch(addMoreThanOneProductsToTheCart(cartItem));
      return;
    }
    dispatch(addItemToTheCartForNotLog(cartItem));
  };

  const openModal = () => {
    dispatch(openSignModal());
  };

  const switchWishItem = () => {
    if (isAuthorized) {
      if (isFavourite) {
        dispatch(removeWishedProduct(_id));
        return;
      }
      dispatch(addWishedProduct(_id));
      return;
    }
    openModal();
  };

  if (!Object.keys(props).length) return <NotFoundPage />;
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
          {previousPrice !== 0 && previousPrice !== currentPrice ? (
            <div className={styles.priceBox}>
              <div className={styles.content_Price_Item}>{currentPrice} &#8372;</div>
              <div className={styles.previousPrice}>{previousPrice} &#8372;</div>
            </div>
          ) : (
            <div className={styles.content_Price_Item}>{currentPrice} &#8372;</div>
          )}
          <div className={styles.content_Price_ButtonsWrapper}>
            <div className={styles.content_Price_infoWrapperQuantity}>
              <div className={styles.content_Price_infoWrapperQuantityItem}>
                Quantity:{quantity}
              </div>
              <div className={styles.content_Price_infoWrapperQuantityBlock}>
                <div
                  onClick={() => countInputValue > 1 && setCountInputValue(countInputValue - 1)}
                  className={
                    countInputValue <= 1
                      ? styles.content_Price_infoWrapperQuantityBlockMinusNotWork
                      : styles.content_Price_infoWrapperQuantityBlockMinus
                  }>
                  <MinusPic
                    className={
                      countInputValue <= 1
                        ? styles.content_Price_infoWrapperQuantityBlockMinusItemNotWork
                        : styles.content_Price_infoWrapperQuantityBlockMinusItem
                    }
                  />
                </div>
                <input
                  className={styles.content_Price_infoWrapperQuantityBlockInput}
                  type="text"
                  value={countInputValue}
                  onChange={({target}) => {
                    setCountInputValue('');
                    if (!isNaN(target.value) && target.value <= quantity && target.value > 0) {
                      setCountInputValue(Number(target.value));
                    }
                  }}
                  onBlur={() => {
                    countInputValue === '' && setCountInputValue(1);
                  }}
                />
                <div
                  onClick={() =>
                    countInputValue < quantity && setCountInputValue(countInputValue + 1)
                  }
                  className={styles.content_Price_infoWrapperQuantityBlockPlus}>
                  <PlusPic className={styles.content_Price_infoWrapperQuantityBlockPlusItem} />
                </div>
                <Button
                  onClick={addToCart}
                  type={'button'}
                  className={styles.content_Price_infoWrapperQuantity_Button}>
                  add to cart
                </Button>
              </div>
            </div>
            <div className={styles.content_WishlistWrapper}>
              <Button
                onClick={switchWishItem}
                type={'button'}
                className={styles.content_WishlistWrapper_Item}>
                {isFavourite ? 'remove from wishlist' : 'add to wishlist'}
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.content_Wrapper}>
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
                  <p style={{width: '40%'}}>Platforms:</p>
                  <span>{Array.isArray(platform) ? platform.join(', ') : platform}</span>
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
            title="Shipping &#38; delivery"
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
                    Prices: courier - 120 &#8372;, express - 79,95 &#8372;, standard - 29,95
                    &#8372;.
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
