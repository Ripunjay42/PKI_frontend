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
import ETB from "../assets/ETB.png"; 

const ElectronicThrottleBody = () => {
  const ETdata = {
    title: "Electronic Throttle Body (Ride-by-wire)",
    function: [
      "Controls throttle valve position based on driver input (accelerator pedal).",
      "Supports CAN communication for real-time data exchange with other vehicle modules like IVS (In-vehicle-server).",
      "Communicates with IVS to verify revocation status (Certificate Valid/Invalid).",
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
      "3] ETB Controller": [
        "PWM-driven DC motor control (H-bridge)",
        "Dual-throttle position sensor",
        "Operating voltage: 12V (automotive standard)",
      ],
      "4] ETB Valve Material": [
        "High-temperature-resistant metal",
        "Angular range: 0°–90° (or as per OEM specs)",
        "Feedback: accelerator pedal",
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
        {ETdata.title}
      </Typography>

      {/* Functionality Accordion */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Functionality</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ mb: 1 }} />
          <List dense>
            {ETdata.function.map((item, index) => (
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
          {Object.entries(ETdata.Spec).map(([category, items]) => (
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

      {/* ETB Image */}
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: "500px" },
          width: "100%",
          mx: "auto",
          mt: 4,
          textAlign: "center",
        }}
      >
        <img
          src={ETB}
          alt="Electronic Throttle Body"
          style={{
            width: "100%",
            maxHeight: "380px",
            objectFit: "cover",
            borderRadius: 12,
          }}
        />
      </Box>
    </Container>
  );
};

export default ElectronicThrottleBody;
