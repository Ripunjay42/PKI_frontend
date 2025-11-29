import { Accordion, AccordionSummary, AccordionDetails, Typography, Divider, Box, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SpecificationSection = ({ data }) => (
  <Accordion sx={{ mt: 1,maxWidth:'600px' }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6">Specification</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Divider sx={{ mb: 1, }} />
      {Object.entries(data).map(([category, items]) => (
        <Box key={category} sx={{ mb: 2 }}>
          <Typography fontWeight="700" gutterBottom>{category}</Typography>
          <List dense>
            {items.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </AccordionDetails>
  </Accordion>
);

export default SpecificationSection;
