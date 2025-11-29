import { Accordion, AccordionSummary, AccordionDetails, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TrustedRootSection = ({ data }) => (
  <Accordion sx={{ mt: 2,maxWidth:'600px'}}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6">Trusted Root Information</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Divider sx={{ mb: 1 }} />
      <List dense>
        {Object.values(data).flat().map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText primary={`• ${item}`} />
          </ListItem>
        ))}
      </List>
    </AccordionDetails>
  </Accordion>
);

export default TrustedRootSection;
