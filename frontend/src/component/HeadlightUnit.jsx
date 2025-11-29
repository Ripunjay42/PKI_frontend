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
import headlight from "../assets/headlight.png";

const HeadLightUnit = ({ validationStatus }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const HUdata = {
    title: "Headlight Unit",
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
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography
        variant={isSmall ? "h6" : "h5"}
        fontWeight={600}
        mb={2}
        color="primary"
        textAlign="center"
      >
        {HUdata.title}
      </Typography>

      {/*  Certificate Status */}
      <Box textAlign="center" mb={3}>
        {validationStatus === true && (
          <Chip
            icon={<CheckCircleIcon color="success" />}
            label="Certificate Valid"
            color="success"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.85rem" } }}
          />
        )}
        {validationStatus === false && (
          <Chip
            icon={<CancelIcon color="error" />}
            label="Certificate Invalid"
            color="error"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.85rem" } }}
          />
        )}
      </Box>

      {/*  Functionality Accordion */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Functionality</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ mb: 1 }} />
          <List dense>
            {HUdata.function.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    sx: { lineHeight: 1.5 },
                  }}
                  primary={`• ${item}`}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Specification Accordion */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Specification</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ mb: 1 }} />
          {Object.entries(HUdata.Spec).map(([category, items]) => (
            <Box key={category} sx={{ mb: 2 }}>
              <Typography fontWeight={700} gutterBottom>
                {category}
              </Typography>
              <List dense>
                {items.map((item, idx) => (
                  <ListItem key={idx} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: { xs: "0.85rem", sm: "1rem" },
                        sx: { lineHeight: 1.5 },
                      }}
                      primary={`• ${item}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      {/*  Image Display */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          mx: "auto",
          mt: 4,
          textAlign: "center",
        }}
      >
        <img
          src={headlight}
          alt="headlight"
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
      </Box>
    </Container>
  );
};

export default HeadLightUnit;
