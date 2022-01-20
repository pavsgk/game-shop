import {useState} from 'react';
import styles from './TabSelector.module.scss';

function TabSelector(props) {
  const {tabs, children} = props;
  const [active, setActive] = useState(0);
  if (tabs.lenght < 1) return null;

  return (
    <div>
      {tabs.map((tab, index) => {
        if (index === active)
          return (
            <button className={styles.btnActive} key={tab} onClick={() => setActive(index)}>
              {tab}
            </button>
          );
        return (
          <button className={styles.btn} key={tab} onClick={() => setActive(index)}>
            {tab}
          </button>
        );
      })}

      {children[active]}
    </div>
  );
}

export default TabSelector;
