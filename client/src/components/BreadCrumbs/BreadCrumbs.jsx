import React from 'react';
import {Link, useLocation} from 'react-router-dom';
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
      {path.map((el) => (
        <React.Fragment key={el[0]}>
          <Link className={styles.link} to={el[1]}>
            {el[0]}
          </Link>
          <pre className={styles.separator}> &#62;&#62; </pre>
        </React.Fragment>
      ))}
    </div>
  );
}

export default BreadCrumbs;
