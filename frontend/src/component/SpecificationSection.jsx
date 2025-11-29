import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SpecificationSection = ({ data }) => (
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
       Specification
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ bgcolor: '#fafafa' }}>
      {Object.entries(data).map(([category, items]) => (
        <Box key={category} sx={{ mb: 2 }}>
          <Typography fontWeight="700" color="#1976d2" gutterBottom>{category}</Typography>
          <List dense>
            {items.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ py: 0.3 }}>
                <ListItemText 
                  primary={`• ${item}`} 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      color: '#555',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                    } 
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </AccordionDetails>
  </Accordion>
);

export default SpecificationSection;
