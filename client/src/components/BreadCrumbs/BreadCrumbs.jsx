import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import NavButton from '../NavButton/NavButton';
import styles from './BreadCrumbs.module.scss';

function BreadCrumbs() {
  const location = useLocation();
  const locations = location.pathname.split('/');

  const path = locations
    .reduce((prev, cur, i) => {
      if (i === 0) return [['home', '/']];
      prev.push([cur, (prev[i - 1][1] + '/' + cur).replace('//', '/')]);
      if (locations.length - 1 === i && location.search) prev[i][1] += location.search;
      return prev;
    }, [])
    .filter((el) => el[0]);

  return (
    <div className={styles.breadCrumbs}>
      <NavButton />
      {path.map((el, i) => (
        <React.Fragment key={el[0]}>
          <Link className={styles.link} to={el[1]}>
            {el[0]}
          </Link>
          {i !== path.length - 1 && <pre className={styles.separator}> &#62;&#62; </pre>}
        </React.Fragment>
      ))}
      <NavButton direction={1}>&#62;</NavButton>
    </div>
  );
}

export default BreadCrumbs;
