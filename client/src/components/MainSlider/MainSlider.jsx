import SimpleImageSlider from 'react-simple-image-slider';

const images = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/ru/thumb/3/3e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Star_Wars_Jedi_Fallen_Order.jpg/800px-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Star_Wars_Jedi_Fallen_Order.jpg',
  },
  {url: 'https://content1.rozetka.com.ua/goods/images/big/96862109.jpg'},
  {
    url: 'https://data3.origin.com/asset/content/dam/originx/web/app/games/it-takes-two/it-takes-two/Screenshots/Copy%20of%20Copy%20of%20ITT_Screenshot_1920x1080_GI_shot03.jpg/6da492ab-4c72-4150-bd6a-3fd3ce9a2610/original.jpg',
  },
  {
    url: 'https://image.api.playstation.com/cdn/EP0006/CUSA08004_00/FREE_CONTENT1D5PUy4Dszrm1qtiDwqF/PREVIEW_SCREENSHOT6_530713.jpg',
  },
  {
    url: 'https://img.championat.com/c/1350x759/news/big/c/f/insajder-podelilsya-podrobnostyami-prodolzheniya-star-wars-jedi-fallen-order_16417156602069706272.jpg',
  },
];

function MainSlider() {
  return (
    <div>
      <SimpleImageSlider
        width={1200}
        height={400}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
}

export default MainSlider;
