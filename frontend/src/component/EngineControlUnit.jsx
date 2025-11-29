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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";


const EngineControlUnit = ({ validationStatus }) => {
  const ECdata = {
    title: "Engine Control Unit",
    function: [
      "Central controller managing engine operations including fuel injection, ignition timing, and throttle control",
      "Receives accelerator pedal input and determines the desired throttle valve position",
      "Sends control signals (PWM) to the ETB to actuate the throttle valve.",
      "Supports CAN communication for real-time data exchange with vehicle modules ",
      "Verifies the certificate revocation status via IVS (In-Vehicle Server) to ensure secure operation."
    ],
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h5"
        fontWeight={600}
        mb={1}
        color="primary"
        textAlign="center"
      >
        {ECdata.title}
      </Typography>

      {/* ✅ Certificate Status */}
      <Box textAlign="center" mb={2}>
        {validationStatus === true && (
          <Chip
            icon={<CheckCircleIcon color="success" />}
            label="Certificate Valid"
            color="success"
          />
        )}
        {validationStatus === false && (
          <Chip
            icon={<CancelIcon color="error" />}
            label="Certificate Invalid"
            color="error"
          />
        )}
      </Box>

      {/* ✅ Functionality */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Functionality</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ mb: 1 }} />
          <List dense>
            {ECdata.function.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

    </Container>
  );
};

export default EngineControlUnit;
