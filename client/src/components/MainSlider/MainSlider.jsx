import styles from './MainSlider.module.scss';
import {Carousel} from 'react-carousel-minimal';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getSliderItems} from '../../api/mainSlider';
import Preloader from '../Preloader/Preloader';
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong';

const captionStyle = {
  fontSize: '1.2em',
  fontWeight: '400',
  backgroundColor: '#8f8f89a3',
};

function MainSlider() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const result = await getSliderItems();
        const dataForSlider = result.map((item) => {
          return {
            image: item.imageUrl,
            caption: item.title,
            url: 'details?' + item.itemNo,
          };
        });
        setProducts(dataForSlider);
      })();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
  }, []);

  return (
    <div
      className={isLoading || !isError ? styles.noSlider : styles.slider}
      onClick={(event) => {
        if (event.target.tagName === 'IMG') {
          products.forEach((el) => {
            if (event.target.src === el.image.replace('.', window.location.origin)) {
              navigate(el.url);
            }
          });
        }
        if (event.target.className === 'carousel-caption-bottom') {
          products.forEach((el) => {
            if (event.target.innerText === el.caption) {
              navigate(el.url);
            }
          });
        }
      }}>
      {isLoading && <Preloader />}
      {isError && <SomethingWentWrong />}
      {products.length > 0 && (
        <Carousel
          data={products}
          time={3500}
          width="100%"
          height="400px"
          captionStyle={captionStyle}
          captionPosition="bottom"
          automatic={true}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
          style={{
            textAlign: 'center',
            width: '100%',
            maxHeight: '500px',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  );
}

export default MainSlider;
