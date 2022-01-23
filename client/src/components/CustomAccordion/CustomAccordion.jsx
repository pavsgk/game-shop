import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from '@mui/icons-material/Add';
import styles from "./CustomAccordion.module.scss";

function CustomAccordion({ title, content }) {
    return (
        <Accordion className={styles.accordion} sx={{border: 0, color: 'white', backgroundColor: "rgba(0, 0, 0, 0)", textTransform: 'uppercase'}}>
            <AccordionSummary
                expandIcon={<AddIcon sx={{color: 'white'}}/>}
            >
                <Typography>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography className={styles.checkboxesWrapper}>
                    {content}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};
   
export default CustomAccordion;