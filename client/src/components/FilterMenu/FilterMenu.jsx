import CustomAccordion from '../CustomAccordion/CustomAccordion';
import {Formik, Form, Field} from 'formik';
import styles from './FilterMenu.module.scss';
import {useLocation, useNavigate} from 'react-router-dom';

function FilterMenu() {
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

  return (
    <div className={styles.filter}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <CustomAccordion
              title="genre"
              content={
                <>
                  <label>
                    <Field data-filter="genre" type="checkbox" name="genre" value="Strategy" />
                    Strategy
                  </label>
                  <label>
                    <Field data-filter="genre" type="checkbox" name="genre" value="RPG" />
                    RPG
                  </label>
                  <label>
                    <Field type="checkbox" name="genre" value="MMO" />
                    MMO
                  </label>
                  <label>
                    <Field type="checkbox" name="genre" value="Indie" />
                    Indie
                  </label>
                  <label>
                    <Field type="checkbox" name="genre" value="Simulator" />
                    Simulator
                  </label>
                  <label>
                    <Field type="checkbox" name="genre" value="Action" />
                    Action
                  </label>
                  <label>
                    <Field type="checkbox" name="genre" value="ForTwo" />
                    For two
                  </label>
                  <label>
                    <Field type="checkbox" name="genre" value="Sport" />
                    Sport
                  </label>
                  <label>
                    <Field type="checkbox" name="genre" value="Shooters" />
                    Shooters
                  </label>
                  <label>
                    <Field type="checkbox" name="genre" value="Arcade" />
                    Arcade
                  </label>
                </>
              }
            />
            <CustomAccordion
              title="age"
              content={
                <>
                  <label>
                    <Field type="checkbox" name="age" value="3" />
                    3+
                  </label>
                  <label>
                    <Field type="checkbox" name="age" value="7" />
                    7+
                  </label>
                  <label>
                    <Field type="checkbox" name="age" value="13" />
                    13+
                  </label>
                  <label>
                    <Field type="checkbox" name="age" value="18" />
                    18+
                  </label>
                </>
              }
            />
            <button className={styles.addButton} type="submit">
              Apply filters
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FilterMenu;
