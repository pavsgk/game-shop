import CustomAccordion from '../CustomAccordion/CustomAccordion';
import {Formik, Form, Field} from 'formik';
import styles from './FilterMenu.module.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

function FilterMenu({isOpen, closeFilters}) {
  let location = useLocation();
  let navigate = useNavigate();
  const getQueryParams = (paramName) => {
    const from = location.search.indexOf(paramName) + paramName.length;
    const to = location.search.indexOf('&', from);
    const substring = location.search.slice(from, to);
    const params = substring === '' ? [] : substring.split(',');
    return params;
  };
  const handleSubmit = (values) => {
    let query = '?';
    for (const key in values) {
      if (values[key].length > 0) {
        query += `${key}=${values[key]}&`;
      }
    }
    navigate(`/catalog/filters${query.slice(0, -1)}/`);
  };

  const initialValues = {
    genre: getQueryParams('genre='),
    age: getQueryParams('age='),
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
              title="genre"
              content={
                <>
                  <Field
                    id="Strategy"
                    className={styles.checkbox}
                    data-filter="genre"
                    type="checkbox"
                    name="genre"
                    value="Strategy"
                  />
                  <label for="Strategy">Strategy</label>

                  <Field
                    id="RPG"
                    className={styles.checkbox}
                    data-filter="genre"
                    type="checkbox"
                    name="genre"
                    value="RPG"
                  />
                  <label for="RPG">RPG</label>

                  <Field
                    id="MMO"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="MMO"
                  />
                  <label for="MMO">MMO</label>

                  <Field
                    id="Indie"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Indie"
                  />
                  <label for="Indie">Indie</label>

                  <Field
                    id="Simulator"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Simulator"
                  />
                  <label for="Simulator">Simulator</label>

                  <Field
                    id="Action"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Action"
                  />
                  <label for="Action">Action</label>

                  <Field
                    id="ForTwo"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="ForTwo"
                  />
                  <label for="ForTwo">For two</label>

                  <Field
                    id="Sport"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Sport"
                  />
                  <label for="Sport">Sport</label>

                  <Field
                    id="Shooters"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Shooters"
                  />
                  <label for="Shooters">Shooters</label>

                  <Field
                    id="Arcade"
                    className={styles.checkbox}
                    type="checkbox"
                    name="genre"
                    value="Arcade"
                  />
                  <label for="Arcade">Arcade</label>
                </>
              }
            />
            <CustomAccordion
              title="age"
              content={
                <>
                  <Field id="3" className={styles.checkbox} type="checkbox" name="age" value="3" />
                  <label for="3">3+</label>

                  <Field id="7" className={styles.checkbox} type="checkbox" name="age" value="7" />
                  <label for="7">7+</label>

                  <Field
                    id="13"
                    className={styles.checkbox}
                    type="checkbox"
                    name="age"
                    value="13"
                  />
                  <label for="13">13+</label>

                  <Field
                    id="18"
                    className={styles.checkbox}
                    type="checkbox"
                    name="age"
                    value="18"
                  />
                  <label for="18">18+</label>
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
                  resetForm({genre: [], age: []});
                  navigate('/catalog');
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

export default FilterMenu;
