import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FunctionalitySection = ({ data }) => (
  <Accordion 
    sx={{
      maxWidth: '600px',
      borderRadius: '12px !important',
      overflow: 'hidden',
      '&:before': { display: 'none' },
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      mb: 1.5,
    }}
  >
    <AccordionSummary 
      expandIcon={<ExpandMoreIcon />}
      sx={{
        bgcolor: '#fff',
        '&:hover': { bgcolor: '#f5f5f5' },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "1rem", md: "1.1rem" } }}>
       Functionality
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ bgcolor: '#fafafa' }}>
      <List dense>
        {data.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ py: 0.3 }}>
            <ListItemText 
              primary={`• ${item}`} 
              sx={{ 
                '& .MuiTypography-root': { 
                  color: '#555',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                } 
              }}
            />
          </ListItem>
        ))}
      </List>
    </AccordionDetails>
  </Accordion>
);

export default FunctionalitySection;
