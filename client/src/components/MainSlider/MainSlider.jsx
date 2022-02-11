import styles from './MainSlider.module.scss';
import {Carousel} from 'react-carousel-minimal';

const data = [
  {
    image: 'https://www.mobiflip.de/wp-content/uploads/2020/11/star-wars-jedi-fallen-order.jpg',
    caption: 'STAR WARS Jedi: Fallen Order',
  },
  {
    image:
      'https://img03.rl0.ru/afisha/e1500x600i/daily.afisha.ru/uploads/images/3/29/329e6a53757441f9b698ba928b4bd8ce.jpg',
    caption: 'The Witcher 3: Wild Hunt',
  },
  {
    image: 'https://gamemag.ru/images/cache/Reviews/Reviews2254/b8a188909e-2_1390x600.jpg',
    caption: 'Forza Horizon 5',
  },
  {
    image: 'https://vgtimes.ru/uploads/games_previews/60906/assassins-creed-valhalla_vgdb.jpg',
    caption: "Assassin's Creed Valhalla",
  },
  {
    image:
      'https://redrumers.files.wordpress.com/2016/08/no-mans-sky-large-hero-02-ps4-eu-16jun15.jpg?w=1400',
    caption: "No Man's Sky",
  },
];

const captionStyle = {
  fontSize: '1.2em',
  fontWeight: '400',
  backgroundColor: '#8f8f89a3',
};

function MainSlider() {
  return (
    <>
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
    </>
  );
}

export default MainSlider;
