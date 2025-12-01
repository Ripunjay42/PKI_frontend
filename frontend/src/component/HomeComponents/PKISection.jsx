import { Box, Grid, Paper, Typography, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';

const PKISection = ({ pkiData }) => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        flex: 1,
        alignItems: 'stretch',
      }}
    >
      <Grid item xs={12} className="image-grid" sx={{ display: 'flex' }}>
        <Paper
          elevation={4}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            background: 'linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)',
            height: '85vh',
            overflow: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <SecurityIcon sx={{ color: '#1976d2', fontSize: 32 }} />
            <Typography
              variant="h5"
              fontWeight={700}
              color="#1565c0"
              sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" } }}
            >
              {pkiData.title}
            </Typography>
          </Box>

          {/* Overview */}
          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.8)',
            }}
          >
            <List dense sx={{
              '& .MuiListItemText-primary': {
                fontSize: '0.95rem',
                color: '#333',
                fontFamily: 'Segoe UI, sans-serif',
                lineHeight: 1.6,
              }
            }}>
              {pkiData.overview.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.3 }}>
                  <ListItemText primary={`• ${item}`} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Benefits */}
          <Accordion
            sx={{
              mt: 2,
              borderRadius: '12px !important',
              overflow: 'hidden',
              '&:before': { display: 'none' },
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                bgcolor: '#fff',
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, fontWeight: 600 }}>
                🔐 Key Benefits
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#fafafa' }}>
              <List dense>
                {Object.entries(pkiData.benefits).map(([category, items]) => (
                  <Box key={category} sx={{ mb: 1.5 }}>
                    <Typography fontWeight="700" color="#1976d2" gutterBottom>
                      {category}
                    </Typography>
                    <List dense>
                      {items.map((item, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemText primary={`• ${item}`} sx={{ '& .MuiTypography-root': { color: '#555' } }} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Use Cases */}
          <Accordion
            sx={{
              mt: 1.5,
              borderRadius: '12px !important',
              overflow: 'hidden',
              '&:before': { display: 'none' },
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                bgcolor: '#fff',
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, fontWeight: 600 }}>
                🚘 Use Cases
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#fafafa' }}>
              <List dense>
                {Object.entries(pkiData.useCases).map(([category, items]) => (
                  <Box key={category} sx={{ mb: 1.5 }}>
                    <Typography fontWeight="700" color="#1976d2" gutterBottom>
                      {category}
                    </Typography>
                    <List dense>
                      {items.map((item, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemText primary={`• ${item}`} sx={{ '& .MuiTypography-root': { color: '#555' } }} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PKISection;
