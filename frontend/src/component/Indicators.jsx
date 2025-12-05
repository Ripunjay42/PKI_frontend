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
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import indicator from "../assets/indicators.jpeg";

const Indicators = () => {
  const indicatorsData = {
    title: "Vehicle Indicators",
    function: [
  `Indicators function as alert systems that highlight critical conditions, triggering actions or further investigation.`,  
  `Indicators serve as measuring tools that quantify progress against goals, targets, or benchmarks.`,
  `They act as visual shorthand that conveys complex information quickly and clearly to stakeholders.`,
    ],
    Spec: {
      "1] LED Indicators": [
       "Voltage: 12 Volts (DC).",
      "Wattage: 5 Watts.",
      "Light Source: Energy-saving LED.",
      ],
      "2] Build & Durability:": [
        "Material: High-quality ABS plastic with a flexible rubber stem.",
        "Features: Unbreakable, waterproof, shockproof, and anti-corrosion.",
      ],
      "3] Compatibility & Support:": [
        "Universally fits all bikes and motorcycles.",
        "Backed by a 3-month manufacturer's warranty against defects.",
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
            {/* Image Display */}
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 350,
          mx: "auto",
          mt: 3,
          p: 2,
          borderRadius: 3,
          textAlign: "center",
          bgcolor: '#fff',
        }}
      >
        <img
          src={indicator}
          alt="indicator"
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
      </Paper>
    </Container>
  );
};

export default Indicators;
