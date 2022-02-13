import SlideShow from 'react-image-show';

const ModalSlider = ({modalContent}) => {
  return (
    <SlideShow
      images={modalContent}
      width="920px"
      imagesWidth="100%"
      imagesHeight="450px"
      imagesHeightMobile="65vw"
      indicators
      fixedImagesHeight
      infinite={true}
    />
  );
};

export default ModalSlider;
