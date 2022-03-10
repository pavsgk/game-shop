import styles from './Genres.module.scss';
import React, {useEffect, useState} from 'react';
import {getAllFilters} from '../../api/filters';
import {Link} from 'react-router-dom';

function GenreComponent(props) {
  const {genre} = props;
  const genreImg = './genres_img/' + genre + '.svg';
  const srcGenre = '/catalog/filters?genre=' + genre + '/';
  return (
    <>
      <Link exact="true" to={srcGenre}>
        <div className={styles.genre}>
          <img className={styles.img} src={genreImg} alt={genre} />
          <p>{genre}</p>
        </div>
      </Link>
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
              return <GenreComponent key={el._id} genre={el.name} />;
            })
          : null}
      </div>
    </>
  );
}

export default Genres;
