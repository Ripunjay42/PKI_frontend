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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const InstrumentCluster = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const ICdata = {
    title: "Instrument Cluster",
    function: [
      "The Instrument Cluster system used in this project is graciously sponsored by TVS Sensing Solutions.",
      "Display indicates whether ECU certificates are valid/invalid.",
      "Real-time verification status fetched from In-Vehicle Server (IVS).",
      "Displays vehicle speed when data is received from a trusted ECU",
    ],
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography
        variant={isSmallScreen ? "h6" : "h5"}
        fontWeight={600}
        mb={3}
        color="primary"
        textAlign="center"
      >
        {ICdata.title}
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Functionality</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Divider sx={{ mb: 1 }} />
          <List dense>
            {ICdata.function.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: isSmallScreen ? "0.85rem" : "1rem",
                    sx: { lineHeight: 1.4 },
                  }}
                  primary={`• ${item}`}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default InstrumentCluster;
