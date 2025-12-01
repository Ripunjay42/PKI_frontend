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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Indicators = () => {
  const indicatorsData = {
    title: "Vehicle Indicators",
    function: [
      "Provides visual feedback to driver and surrounding vehicles about vehicle status and intentions.",
      "Controls turn signals (left/right indicators) for directional changes.",
      "Manages hazard lights for emergency situations.",
      "Integrates with vehicle's CAN bus for synchronized operation.",
      "Receives control signals from In-Vehicle Server for automated indicator operations.",
    ],
    Spec: {
      "1] Indicator Control Module": [
        "Microcontroller: ARM Cortex-M0+ @ 48 MHz",
        "Flash Memory: 256 KB",
        "RAM: 32 KB",
        "Operating Voltage: 12V DC",
        "CAN Interface: CAN 2.0B compliant",
      ],
      "2] LED Indicators": [
        "Type: High-brightness amber LEDs",
        "Power Consumption: 5W per indicator",
        "Flash Rate: 60-120 flashes per minute",
        "Lifespan: 50,000+ hours",
        "Water Resistance: IP67 rated",
      ],
      "3] Communication Interface": [
        "Protocol: CAN Bus",
        "Data Rate: Up to 500 Kbps",
        "Message Format: Standard CAN frame",
        "Priority: High priority messages for safety-critical operations",
      ],
      "4] Safety Features": [
        "Auto-cancel after turn completion",
        "Fail-safe mode in case of communication loss",
        "Diagnostic capability for fault detection",
        "Emergency hazard activation support",
      ],
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h5"
        fontWeight={600}
        mb={3}
        color="primary"
        textAlign="center"
      >
        {indicatorsData.title}
      </Typography>

      {/* Functionality Accordion */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Functionality</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ mb: 1 }} />
          <List dense>
            {indicatorsData.function.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Specifications Accordion */}
      <Accordion sx={{ mt: 1 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Specification</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ mb: 1 }} />
          {Object.entries(indicatorsData.Spec).map(([category, items]) => (
            <Box key={category} mb={2}>
              <Typography fontWeight={700} gutterBottom>
                {category}
              </Typography>
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

      {/* Additional Info Box */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: '#f5f5f5',
          border: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          <strong>Note:</strong> The indicator system is a critical safety component that communicates 
          the vehicle's intended movements to other road users. It operates in conjunction with the 
          In-Vehicle Server to ensure secure and reliable signaling operations.
        </Typography>
      </Box>
    </Container>
  );
};

export default Indicators;
