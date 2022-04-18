import {useState} from 'react';
import PropTypes from 'prop-types';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import {Formik, Form, Field} from 'formik';
import styles from './FilterMenu.module.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {Slider} from '@mui/material';
import getQueryParams from '../../utils/queryParser';

function FilterMenu({isOpen, closeFilters, isSale}) {
  let location = useLocation();
  let navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(250);
  const [maxPrice, setMaxPrice] = useState(2250);
  const minPriceChangeHandler = ({value}) => {
    setMinPrice(value);
  };
  const maxPriceChangeHandler = ({value}) => {
    setMaxPrice(value);
  };
  const sliderPriceChangeHandler = ({value}) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };
  const handleSubmit = (values) => {
    let query = '?';
    for (const key in values) {
      if (values[key].length > 0) {
        query += `${key}=${values[key]}&`;
      }
    }
    query += `minPrice=${minPrice}&maxPrice=${maxPrice}&`;
    isSale ? navigate(`/sale/filters${query}`) : navigate(`/catalog/filters${query}`);
  };

  const initialValues = {
    genre: getQueryParams('genre', location),
    age: getQueryParams('age', location),
    publisher: getQueryParams('publisher', location),
  };

  const displayValue = isOpen ? 'block' : '';

  return (
    <div style={{display: displayValue}} className={styles.filter}>
      <div onClick={closeFilters} className={styles.menuBackground}></div>
      <div className={styles.closeFilter}>
        <span>Filters</span> <CloseIcon onClick={closeFilters} sx={{color: 'white'}} />
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({resetForm}) => (
          <Form style={{marginTop: '10px'}}>
            <CustomAccordion
              title="publisher"
              content={
                <>
                  <Field
                    id="Microsoft"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="Microsoft"
                  />
                  <label htmlFor="Microsoft">Microsoft</label>

                  <Field
                    id="Hello Games"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="Hello Games"
                  />
                  <label htmlFor="Hello Games">Hello Games</label>

                  <Field
                    id="Ninja Theory"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="Ninja Theory"
                  />
                  <label htmlFor="Ninja Theory">Ninja Theory</label>

                  <Field
                    id="EA Games"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="EA Games"
                  />
                  <label htmlFor="EA Games">EA Games</label>

                  <Field
                    id="Modus Games"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="Modus Games"
                  />
                  <label htmlFor="Modus Games">Modus Games</label>

                  <Field
                    id="CD Projekt RED"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="CD Projekt RED"
                  />
                  <label htmlFor="CD Projekt RED">CD Projekt RED</label>

                  <Field
                    id="Ubisoft Entertainment"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="Ubisoft Entertainment"
                  />
                  <label htmlFor="Ubisoft Entertainment">Ubisoft Entertainment</label>

                  <Field
                    id="GSC Game World"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="GSC Game World"
                  />
                  <label htmlFor="GSC Game World">GSC Game World</label>

                  <Field
                    id="Ubisoft"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="Ubisoft"
                  />
                  <label htmlFor="Ubisoft">Ubisoft</label>

                  <Field
                    id="Rockstar Games"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="Rockstar Games"
                  />
                  <label htmlFor="Rockstar Games">Rockstar Games</label>

                  <Field
                    id="505 Games"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="505 Games"
                  />
                  <label htmlFor="505 Games">505 Games</label>

                  <Field
                    id="Team17 Digital Ltd"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="Team17 Digital Ltd"
                  />
                  <label htmlFor="Team17 Digital Ltd">Team17 Digital Ltd</label>

                  <Field
                    id="THQ Nordic"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="THQ Nordic"
                  />
                  <label htmlFor="THQ Nordic">THQ Nordic</label>

                  <Field
                    id="Electronic Arts"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="Electronic Arts"
                  />
                  <label htmlFor="Electronic Arts">Electronic Arts</label>

                  <Field
                    id="Deep Silver"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="Deep Silver"
                  />
                  <label htmlFor="Deep Silver">Deep Silver</label>

                  <Field
                    id="Warner Bros. Interactive Entertainment"
                    className={styles.checkbox}
                    type="checkbox"
                    name="publisher"
                    value="Warner Bros. Interactive Entertainment"
                  />
                  <label htmlFor="Warner Bros. Interactive Entertainment">
                    Warner Bros. Interactive Entertainment
                  </label>
                </>
              }
            />

            <CustomAccordion
              title="platform"
              content={
                <>
                  <Field
                    id="Xbox Series X|S"
                    className={styles.checkbox}
                    type="checkbox"
                    name="platform"
                    value="Xbox Series X|S|S"
                  />
                  <label htmlFor="Xbox Series X|S">Xbox Series X|S</label>

                  <Field
                    id="Xbox One"
                    className={styles.checkbox}
                    type="checkbox"
                    name="platform"
                    value="Xbox One"
                  />
                  <label htmlFor="Xbox One">Xbox One</label>

                  <Field
                    id="Windows 7"
                    className={styles.checkbox}
                    type="checkbox"
                    name="platform"
                    value="Windows 7"
                  />
                  <label htmlFor="Windows 7">Windows 7</label>

                  <Field
                    id="Windows 8"
                    className={styles.checkbox}
                    type="checkbox"
                    name="platform"
                    value="Windows 8"
                  />
                  <label htmlFor="Windows 8">Windows 8</label>

                  <Field
                    id="Windows 10"
                    className={styles.checkbox}
                    type="checkbox"
                    name="platform"
                    value="Windows 10"
                  />
                  <label htmlFor="Windows 10">Windows 10</label>

                  <Field
                    id="Windows 11"
                    className={styles.checkbox}
                    type="checkbox"
                    name="platform"
                    value="Windows 11"
                  />
                  <label htmlFor="Windows 11">Windows 11</label>

                  <Field
                    id="MacOs"
                    className={styles.checkbox}
                    type="checkbox"
                    name="platform"
                    value="MacOs"
                  />
                  <label htmlFor="MacOs">MacOs</label>

                  <Field
                    id="PlayStation 3"
                    className={styles.checkbox}
                    type="checkbox"
                    name="platform"
                    value="PlayStation 3"
                  />
                  <label htmlFor="PlayStation 3">PlayStation 3</label>

                  <Field
                    id="PlayStation 4"
                    className={styles.checkbox}
                    type="checkbox"
                    name="platform"
                    value="PlayStation 4"
                  />
                  <label htmlFor="PlayStation 4">PlayStation 4</label>

                  <Field
                    id="PlayStation 5"
                    className={styles.checkbox}
                    type="checkbox"
                    name="platform"
                    value="PlayStation 5"
                  />
                  <label htmlFor="PlayStation 5">PlayStation 5</label>
                </>
              }
            />

            <CustomAccordion
              title="genre"
              content={
                <>
                  <Field
                    id="Simulator"
                    className={styles.checkbox}
                    data-filter="genre"
                    type="checkbox"
                    name="genre"
                    value="Simulator"
                  />
                  <label htmlFor="Simulator">Simulator</label>

                  <Field
                    id="RPG"
                    className={styles.checkbox}
                    data-filter="genre"
                    type="checkbox"
                    name="genre"
                    value="RPG"
                  />
                  <label htmlFor="RPG">RPG</label>

                  <Field
                    id="Indie"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Indie"
                  />
                  <label htmlFor="Indie">Indie</label>

                  <Field
                    id="Action"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Action"
                  />
                  <label htmlFor="Action">Action</label>

                  <Field
                    id="Shooters"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Shooters"
                  />
                  <label htmlFor="Shooters">Shooters</label>

                  <Field
                    id="Arcade"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Arcade"
                  />
                  <label htmlFor="Arcade">Arcade</label>

                  <Field
                    id="Adventure"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Adventure"
                  />
                  <label htmlFor="Adventure">Adventure</label>

                  <Field
                    id="Survival"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Survival"
                  />
                  <label htmlFor="Survival">Survival</label>

                  <Field
                    id="Fantasy"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Fantasy"
                  />
                  <label htmlFor="Fantasy">Fantasy</label>

                  <Field
                    id="Strategy"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Strategy"
                  />
                  <label htmlFor="Strategy">Strategy</label>

                  <Field
                    id="Real-time"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Real-time"
                  />
                  <label htmlFor="Real-time">Real-time</label>

                  <Field
                    id="Historical"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Historical"
                  />
                  <label htmlFor="Historical">Historical</label>
                </>
              }
            />
            <CustomAccordion
              title="age"
              content={
                <>
                  <Field
                    id="3"
                    className={styles.checkbox}
                    type="checkbox"
                    name="age"
                    value="3%2B"
                  />
                  <label htmlFor="3">3+</label>

                  <Field
                    id="7"
                    className={styles.checkbox}
                    type="checkbox"
                    name="age"
                    value="7%2B"
                  />
                  <label htmlFor="7">7+</label>

                  <Field
                    id="13"
                    className={styles.checkbox}
                    type="checkbox"
                    name="age"
                    value="13%2B"
                  />
                  <label htmlFor="13">13+</label>

                  <Field
                    id="18"
                    className={styles.checkbox}
                    type="checkbox"
                    name="age"
                    value="18%2B"
                  />
                  <label htmlFor="18">18+</label>
                </>
              }
            />
            <CustomAccordion
              title="price"
              content={
                <>
                  <Slider
                    getAriaLabel={() => 'Price'}
                    value={[minPrice, maxPrice]}
                    sx={{marginBottom: '16px', color: '#ffc500'}}
                    valueLabelDisplay="auto"
                    onChange={({target}) => sliderPriceChangeHandler(target)}
                    min={200}
                    max={2250}
                  />
                  <div className={styles.priceInputsWrapper}>
                    <Field
                      className={styles.priceInput}
                      name="minPrice"
                      onChange={({target}) => minPriceChangeHandler(target)}
                      value={minPrice}
                      placeholder="min price"
                    />
                    <Field
                      className={styles.priceInput}
                      name="maxPrice"
                      onChange={({target}) => maxPriceChangeHandler(target)}
                      value={maxPrice}
                      placeholder="max price"
                    />
                  </div>
                </>
              }
            />
            <div className={styles.conrolBtnsWrapper}>
              <button className={styles.addButton} type="submit">
                Apply filters
              </button>

              <button
                type="button"
                onClick={() => {
                  setMinPrice(250);
                  setMaxPrice(2250);
                  resetForm({genre: [], age: [], publisher: []});
                  navigate('/catalog');
                  isSale ? navigate('/sale') : navigate('/catalog');
                }}
                className={styles.addButton}>
                Clear filters
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

FilterMenu.propTypes = {
  closeFilters: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default FilterMenu;
