import { Box, Grid, Paper, Typography, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const VehicleSection = ({ vehicleData }) => {
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
            <DirectionsCarIcon sx={{ color: '#7b1fa2', fontSize: 32 }} />
            <Typography
              variant="h5"
              fontWeight={700}
              color="#6a1b9a"
              sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" } }}
            >
              {vehicleData.title}
            </Typography>
          </Box>

          {[
            { label: "1. CAN (Controller Area Network)", items: vehicleData.CAN1 },
            { label: "2. CAN FD (Flexible Data Rate)", items: vehicleData.CANFD },
            { label: "3. FlexRay", items: vehicleData.FlexRay },
            { label: "4. LIN (Local Interconnect Network)", items: vehicleData.LIN },
            { label: "5. Automotive Ethernet", items: vehicleData.Auto },
            { label: "6. MOST (Media Oriented Systems Transport)", items: vehicleData.MOST },
          ].map((protocol, idx) => (
            <Accordion
              key={idx}
              sx={{
                mt: idx === 0 ? 0 : 1.5,
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
                <Typography variant="h6" sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, fontWeight: 600 }}>
                  {protocol.label}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: '#fafafa' }}>
                <List dense>
                  {protocol.items.map((item, i) => (
                    <ListItem key={i} disablePadding sx={{ py: 0.3 }}>
                      <ListItemText primary={`• ${item}`} sx={{ '& .MuiTypography-root': { color: '#555' } }} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VehicleSection;
