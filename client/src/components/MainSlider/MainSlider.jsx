import styles from './MainSlider.module.scss';
import {Carousel} from 'react-carousel-minimal';
import {useNavigate} from 'react-router-dom';

const data = [
  {
    image: 'https://www.mobiflip.de/wp-content/uploads/2020/11/star-wars-jedi-fallen-order.jpg',
    caption: 'STAR WARS Jedi: Fallen Order',
    url: 'details?577563',
  },
  {
    image:
      'https://img03.rl0.ru/afisha/e1500x600i/daily.afisha.ru/uploads/images/3/29/329e6a53757441f9b698ba928b4bd8ce.jpg',
    caption: 'The Witcher 3: Wild Hunt',
    url: 'details?801934',
  },
  {
    image: 'https://gamemag.ru/images/cache/Reviews/Reviews2254/b8a188909e-2_1390x600.jpg',
    caption: 'Forza Horizon 5',
    url: 'details?564886',
  },
  {
    image: 'https://vgtimes.ru/uploads/games_previews/60906/assassins-creed-valhalla_vgdb.jpg',
    caption: "Assassin's Creed Valhalla",
    url: 'details?549083',
  },
  {
    image:
      'https://redrumers.files.wordpress.com/2016/08/no-mans-sky-large-hero-02-ps4-eu-16jun15.jpg?w=1400',
    caption: "No Man's Sky",
    url: 'details?840062',
  },
];

const captionStyle = {
  fontSize: '1.2em',
  fontWeight: '400',
  backgroundColor: '#8f8f89a3',
};

function MainSlider() {
  const navigate = useNavigate();

  return (
    <div
      className={styles.slider}
      onClick={(event) => {
        if (event.target.tagName === 'IMG') {
          data.forEach((el) => {
            if (event.target.src === el.image) {
              navigate(el.url);
            }
          });
        }
        if (event.target.className === 'carousel-caption-bottom') {
          data.forEach((el) => {
            if (event.target.innerText === el.caption) {
              navigate(el.url);
            }
          });
        }
      }}>
      <Carousel
        data={data}
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
        }}
      />
    </div>
  );
}

export default MainSlider;
