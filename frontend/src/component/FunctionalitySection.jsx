import { Accordion, AccordionSummary, AccordionDetails, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FunctionalitySection = ({ data }) => (
  <Accordion sx={{maxWidth:'600px'}}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6">Functionality</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Divider sx={{ mb: 1 }} />
      <List dense>
        {data.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText primary={`• ${item}`} />
          </ListItem>
        ))}
      </List>
    </AccordionDetails>
  </Accordion>
);

export default FunctionalitySection;
