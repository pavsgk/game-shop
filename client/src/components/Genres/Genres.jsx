import styles from './Genres.module.scss';
import React, {useEffect, useState} from 'react';
import {getAllFilters} from '../../api/filters';
import {ReactComponent as Action} from './img/Action.svg';
// import {ReactComponent as Arcade} from './img/Arcade.svg';
// import {ReactComponent as Indie} from './img/Indie.svg';
// import {ReactComponent as MMO} from './img/MMO.svg';
// import {ReactComponent as RPG} from './img/RPG.svg';
// import {ReactComponent as Shooters} from './img/Shooters.svg';
// import {ReactComponent as Simulator} from './img/Simulator.svg';
// import {ReactComponent as Sport} from './img/Sport.svg';
// import {ReactComponent as Strategy} from './img/Strategy.svg';
// import {ReactComponent as For_two} from './img/two1.svg';

function GenresComponent(props) {
  const {genre} = props;
  const genreImg = './img/' + genre + '.svg';
  return (
    <>
      <div className={styles.genre}>
        {/*<Action className={styles.img}/>*/}
        <img className={styles.img} src={genreImg} alt={genre} />
        <p>{genre}</p>
      </div>
    </>
  );
}

function Genres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllFilters();
      const genres = data.slice(0, 10);
      setGenres(genres);
    })();
  }, []);

  return (
    <>
      <p className={styles.title}>genres</p>
      <div className={styles.wrapper}>
        {genres.length > 0
          ? genres.map((el) => {
              return <GenresComponent genre={el.name} />;
            })
          : null}
      </div>

      {/*<p className={styles.title}>genres</p>*/}
      {/*<div className={styles.wrapper}>*/}
      {/*  <div className={styles.genre}>*/}
      {/*    <Action className={styles.img} />*/}
      {/*    <p>action</p>*/}
      {/*  </div>*/}
      {/*  <div className={styles.genre}>*/}
      {/*    <Arcade className={styles.img} />*/}
      {/*    <p>arcade</p>*/}
      {/*  </div>*/}
      {/*  <div className={styles.genre}>*/}
      {/*    <Indie className={styles.img} />*/}
      {/*    <p>indie</p>*/}
      {/*  </div>*/}
      {/*  <div className={styles.genre}>*/}
      {/*    <MMO className={styles.img} />*/}
      {/*    <p>MMO</p>*/}
      {/*  </div>*/}
      {/*  <div className={styles.genre}>*/}
      {/*    <RPG className={styles.img} />*/}
      {/*    <p>RPG</p>*/}
      {/*  </div>*/}
      {/*  <div className={styles.genre}>*/}
      {/*    <Shooters className={styles.img} />*/}
      {/*    <p>shooters</p>*/}
      {/*  </div>*/}
      {/*  <div className={styles.genre}>*/}
      {/*    <Simulator className={styles.img} />*/}
      {/*    <p>simulator</p>*/}
      {/*  </div>*/}
      {/*  <div className={styles.genre}>*/}
      {/*    <Sport className={styles.img} />*/}
      {/*    <p>sport</p>*/}
      {/*  </div>*/}
      {/*  <div className={styles.genre}>*/}
      {/*    <Strategy className={styles.img} />*/}
      {/*    <p>strategy</p>*/}
      {/*  </div>*/}
      {/*  <div className={styles.genre}>*/}
      {/*    <Two className={styles.img} />*/}
      {/*    <p>for two</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}

export default Genres;
