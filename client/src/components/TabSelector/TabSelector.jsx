import {useState} from 'react';
import styles from './TabSelector.module.scss';

function TabSelector(props) {
  const {tabs, children, isSignForm} = props;
  const [active, setActive] = useState(0);
  if (tabs.lenght < 1) return null;

  return (
    <>
      <div className={isSignForm ? styles.selectorSign : styles.selectorCheckout}>
        {tabs.map((tab, index) => {
          if (index === active)
            return (
              <button
                className={isSignForm ? styles.btnSignActive : styles.btnCheckoutActive}
                key={tab}
                onClick={() => setActive(index)}>
                {tab}
              </button>
            );
          return (
            <button
              className={isSignForm ? styles.btnSign : styles.btnCheckout}
              key={tab}
              onClick={() => setActive(index)}>
              {tab}
            </button>
          );
        })}
      </div>

      {children[active]}
    </>
  );
}

export default TabSelector;
