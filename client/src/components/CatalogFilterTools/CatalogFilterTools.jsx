import PropTypes from 'prop-types';
import Button from '../Button/Button';
import {Select, MenuItem} from '@mui/material';
import styles from './CatalogFilterTools.module.scss';
import {useLocation, useNavigate} from 'react-router-dom';

function CatalogFilterTools({openFilters, isSale}) {
  let location = useLocation();
  let navigate = useNavigate();

  const handleChange = ({value}) => {
    if (location.search === '') {
      isSale
        ? navigate(`/sale/filters?sort=${value}/`)
        : navigate(`/catalog/filters?sort=${value}/`);
    } else {
      const objectOfParams = {};
      const substring = location.search.split('?')[1].split('&');
      substring.forEach((param) => {
        const keyValuePair = param.split('=');
        objectOfParams[keyValuePair[0]] = keyValuePair[1];
      });

      objectOfParams.sort = value;
      let queryString = '';
      for (let key in objectOfParams) {
        if (objectOfParams[key] !== undefined) {
          queryString += `${key}=${objectOfParams[key]}&`;
        }

        isSale
          ? navigate(`/sale/filters?${queryString.slice(0, -1)}/`)
          : navigate(`/catalog/filters?${queryString.slice(0, -1)}/`);
      }
    }
  };

  return (
    <div className={styles.filterToolsWrapper}>
      <Button className={styles.openFiltersBtn} onClick={openFilters}>
        Filter
      </Button>
      <Select
        defaultValue="default"
        sx={{color: '#ffc500', outline: 'none'}}
        filter-menu-fix
        classes={'.MuiSelect-icon {color: red}'}
        onChange={({target}) => handleChange(target)}>
        <MenuItem value="default" children="Recommended" />
        <MenuItem value="+currentPrice" children="Price: lowest first" />
        <MenuItem value="-currentPrice" children="Price: highest first" />
        <MenuItem value="-date" children="Time: newly listed" />
      </Select>
    </div>
  );
}

CatalogFilterTools.propTypes = {
  openFilters: PropTypes.func.isRequired,
};

export default CatalogFilterTools;
