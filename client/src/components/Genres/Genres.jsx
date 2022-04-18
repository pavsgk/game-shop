import PropTypes from 'prop-types';
import styles from './Genres.module.scss';
import React from 'react';
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

GenreComponent.propTypes = {
  genre: PropTypes.string,
};

function Genres({genres}) {
  const slicedGenre = genres.slice(0, 10);

  return (
    <>
      <Link exact="true" to="catalog" className={styles.title}>
        genres
      </Link>
      <div className={styles.wrapper}>
        {slicedGenre.length > 0
          ? slicedGenre.map((el) => {
              return <GenreComponent key={el._id} genre={el.name} />;
            })
          : null}
      </div>
    </>
  );
}

Genres.propTypes = {
  genres: PropTypes.array,
};

export default Genres;
