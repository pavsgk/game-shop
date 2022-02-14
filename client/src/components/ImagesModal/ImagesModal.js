import styles from './ImagesModal.module.scss';
import {ReactComponent as CloseButton} from '../../assets/svg/close.svg';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import ModalSlider from '../ModalSlider/modalSlider';
import {switchImagesModalState} from '../../store/reducers/imagesModalReducer';

const ImagesModal = () => {
  const modalState = useSelector((state) => state.imagesModal.imagesModalState);
  const modalContent = useSelector((state) => state.imagesModal.imagesModalContent);
  const dispatch = useDispatch();

  const closeModalImagesContent = () => dispatch(switchImagesModalState());

  useEffect(() => {
    const stopScroll = () => {
      window.scrollTo({top: 0});
    };

    if (modalState) {
      window.addEventListener('scroll', stopScroll);
    }

    return () => {
      window.removeEventListener('scroll', stopScroll);
    };
  }, [modalState]);

  if (!modalState) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div onClick={closeModalImagesContent} className={styles.closeButton}>
          <CloseButton />
        </div>
        <ModalSlider modalContent={modalContent} />
      </div>
      <div onClick={closeModalImagesContent} className={styles.background} />
    </div>
  );
};

export default ImagesModal;
