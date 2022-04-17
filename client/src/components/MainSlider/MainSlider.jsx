import styles from './MainSlider.module.scss';
import {Carousel} from 'react-carousel-minimal';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

const captionStyle = {
  fontSize: '1.2em',
  fontWeight: '400',
  backgroundColor: '#8f8f89a3',
};

function MainSlider({sliderProducts}) {
  const navigate = useNavigate();
  const sliderData = sliderProducts.map((item) => {
    return {
      image: item.imageUrl,
      caption: item.title,
      url: 'details?' + item.itemNo,
    };
  });

  function PicturesNavigate(event) {
    if (event.target.tagName === 'IMG') {
      sliderData.forEach((el) => {
        if (event.target.src === el.image.replace('.', window.location.origin)) {
          navigate(el.url);
        }
      });
    }
    if (event.target.className === 'carousel-caption-bottom') {
      sliderData.forEach((el) => {
        if (event.target.innerText === el.caption) {
          navigate(el.url);
        }
      });
    }
  }

  return (
    <div className={styles.slider} onClick={(event) => PicturesNavigate(event)}>
      {sliderData.length > 0 && (
        <Carousel
          data={sliderData}
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

MainSlider.propTypes = {
  sliderProducts: PropTypes.array,
};

export default MainSlider;
