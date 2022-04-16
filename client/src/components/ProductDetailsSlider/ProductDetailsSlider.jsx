import {Carousel} from 'react-carousel-minimal';

const ProductDetailsSlider = ({imageUrls}) => {
  const data = imageUrls.map((item) => {
    return {
      image: item,
    };
  });

  return (
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
  );
};

export default ProductDetailsSlider;
