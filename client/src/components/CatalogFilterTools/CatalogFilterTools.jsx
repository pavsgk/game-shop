import PropTypes from 'prop-types';
import Button from '../Button/Button';
import {Select, MenuItem} from '@mui/material';
import styles from './CatalogFilterTools.module.scss';

function CatalogFilterTools({openFilters}) {
  return (
    <div className={styles.filterToolsWrapper}>
      <Button className={styles.openFiltersBtn} onClick={openFilters}>
        Filter
      </Button>
      <Select
        defaultValue="Recommended"
        sx={{color: '#ffc500', outline: 'none'}}
        classes={{'.MuiSelect-icon': {color: 'red'}}}>
        <MenuItem value="Recommended" children="Recommended" />
        <MenuItem value="lowest" children="Price: lowest first" />
        <MenuItem value="highest" children="Price: highest first" />
        <MenuItem value="newest" children="Time: newly listed" />
      </Select>
    </div>
  );
}

CatalogFilterTools.propTypes = {
  openFilters: PropTypes.func.isRequired,
};

export default CatalogFilterTools;
