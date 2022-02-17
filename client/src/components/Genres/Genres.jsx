import styles from './Genres.module.scss';
import React, {useEffect, useState} from 'react';
import {getAllFilters} from '../../api/filters';

function GenresComponent(props) {
  const {genre} = props;
  const genreImg = './genres_img/' + genre + '.svg';
  return (
    <>
      <div className={styles.genre}>
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
    </>
  );
}

export default Genres;
