import PropTypes from 'prop-types';
import styles from './TabSelector.module.scss';

function TabSelector(props) {
  const {tabs, children, isSignForm, active, setActive} = props;

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

TabSelector.propTypes = {
  active: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  isSignForm: PropTypes.bool,
  setActive: PropTypes.func,
  tabs: PropTypes.arrayOf(PropTypes.string),
};

export default TabSelector;
