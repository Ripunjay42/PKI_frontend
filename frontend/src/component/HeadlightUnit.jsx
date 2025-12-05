import React from "react";
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,  
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import headlight from "../assets/headlight.png";

const HeadLightUnit = ({ validationStatus }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const HUdata = {
    title: "Light Unit",
    function: [
      "Manages LED headlights based on the revocation status verified via IVS (in-vehicle-server).",
      "Communicates with the IVS (in-vehicle-server) via CAN.",
      "Validates IVS (in-vehicle-server) certificates status before executing critical operations.",
    ],
    Spec: {
      "1] Microcontroller Board": [
        "32-bit ARM Cortex-M4 core @ 168 MHz",
        "1 MB Flash, 192 KB RAM",
        "Multiple communication interfaces (CAN, SPI, I2C, USART)",
        "Built-in ADC/DAC for sensor interfacing",
      ],
      "2] Transceiver Module": [
        "CAN 2.0B compliant (up to 1 Mbps)",
        "3.3V or 5V logic compatibility",
      ],
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 1, sm: 2 }, overflow: 'visible' }}>
      {/* Title with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
        <LightbulbIcon sx={{ color: '#1976d2', fontSize: 32 }} />
        <Typography
          variant={isSmall ? "h6" : "h5"}
          fontWeight={700}
          color="#1565c0"
          textAlign="center"
        >
          {HUdata.title}
        </Typography>
      </Box>

      {/* Certificate Status */}
      <Box textAlign="center" mb={3}>
        {validationStatus === true && (
          <Chip
            icon={<CheckCircleIcon />}
            label="Certificate Valid"
            color="success"
            sx={{ 
              fontSize: { xs: "0.75rem", sm: "0.9rem" },
              fontWeight: 600,
              py: 2,
              px: 1,
            }}
          />
        )}
        {validationStatus === false && (
          <Chip
            icon={<CancelIcon />}
            label="Certificate Invalid"
            color="error"
            sx={{ 
              fontSize: { xs: "0.75rem", sm: "0.9rem" },
              fontWeight: 600,
              py: 2,
              px: 1,
            }}
          />
        )}
      </Box>

      {/* Functionality Accordion */}
      <Accordion
        sx={{
          borderRadius: '12px !important',
          overflow: 'hidden',
          '&:before': { display: 'none' },
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          mb: 2,
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
            {HUdata.function.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                <ListItemText
                  primary={`• ${item}`}
                  sx={{ 
                    '& .MuiTypography-root': { 
                      color: '#555',
                      fontSize: { xs: "0.9rem", sm: "0.95rem" },
                      lineHeight: 1.6,
                    } 
                  }}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Specification Accordion */}
      <Accordion
        sx={{
          borderRadius: '12px !important',
          overflow: 'hidden',
          '&:before': { display: 'none' },
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          mb: 2,
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
          {Object.entries(HUdata.Spec).map(([category, items]) => (
            <Box key={category} sx={{ mb: 2 }}>
              <Typography fontWeight={700} color="#1976d2" gutterBottom>
                {category}
              </Typography>
              <List dense>
                {items.map((item, idx) => (
                  <ListItem key={idx} disablePadding sx={{ py: 0.3 }}>
                    <ListItemText
                      primary={`• ${item}`}
                      sx={{ 
                        '& .MuiTypography-root': { 
                          color: '#555',
                          fontSize: { xs: "0.85rem", sm: "0.95rem" },
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
    </Container>
  );
};

export default HeadLightUnit;
