import {Accordion, Container} from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import styles from './CustomAccordion.module.scss';

function CustomAccordion({title, content, isProductPage, isExpanded}) {
  return (
    <Accordion
      expanded={isExpanded}
      className={styles.accordion}
      sx={
        isProductPage
          ? {
              border: 0,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              textTransform: 'uppercase',
              '&::after': {display: 'none !important'},
              '&::before': {display: 'none !important'},
              boxShadow: 'none !important',
            }
          : {
              border: 0,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              textTransform: 'uppercase',
              boxShadow: 'none !important',
            }
      }>
      <AccordionSummary
        expandIcon={<AddIcon sx={isProductPage ? {color: '#7D7D78'} : {color: 'white'}} />}
        sx={isProductPage && {flexDirection: 'row-reverse'}}>
        <Typography sx={isProductPage && {color: '#7D7D78'}}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isProductPage ? (
          <Container
            className={styles.checkboxesWrapper}
            sx={{fontWeight: '400', size: '20px', lineHeight: '35px', color: '#FFFFFF'}}>
            {content}
          </Container>
        ) : (
          <Typography component={'div'} className={styles.checkboxesWrapper}>
            {content}
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default CustomAccordion;
