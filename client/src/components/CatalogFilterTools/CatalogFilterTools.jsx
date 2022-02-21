import Button from '../Button/Button';
import {Select, MenuItem} from '@mui/material';
import styles from './CatalogFilterTools.module.scss';

function CatalogFilterTools({openFilters}) {
  return (
    <div className={styles.filterToolsWrapper}>
      <Button className={styles.openFiltersBtn} onClick={openFilters} children="Filter" />
      <Select defaultValue="Recomended" sx={{color: '#ffc500', outline: 'none'}}>
        <MenuItem value="Recomended" children="Recomended" />
        <MenuItem value="lowest" children="Price: lowest first" />
        <MenuItem value="highest" children="Price: highest first" />
        <MenuItem value="newest" children="Time: newly listed" />
      </Select>
    </div>
  );
}

export default CatalogFilterTools;
