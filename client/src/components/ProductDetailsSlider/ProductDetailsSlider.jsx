import {Carousel} from 'react-carousel-minimal';
import {useEffect, useRef} from 'react';
import {
  addContentForImagesModal,
  switchImagesModalState,
} from '../../store/reducers/imagesModalReducer';
import {useDispatch} from 'react-redux';

const ProductDetailsSlider = ({imageUrls}) => {
  const data = imageUrls.map((item) => {
    return {
      image: item,
    };
  });

  const dispatch = useDispatch();
  const sliderRef = useRef(null);

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
      slider.querySelectorAll('.thumbnail').forEach((item) => {
        item.style.objectFit = `contain`;
        item.style.height = '70px';
      });

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

  return (
    <div ref={sliderRef}>
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
  );
};

export default ProductDetailsSlider;
