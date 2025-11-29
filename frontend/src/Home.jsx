import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import vehicle from "./assets/vehicle.png";
import sunboardbike from "./assets/sunboardbike.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './index.css';
import tvs_logo from './assets/tvs_logo.png';

const Home = ({setSelectedCategory }) => {
 
  const pkiData = {
    title: "PKI in In-Vehicle Networks",
    overview: [
      "Ensures secure ECU communication using digital certificates.",
      "Authenticates ECUs and verifies message integrity via digital signatures.",
      "Prevents unauthorized access and data tampering.",
      "Certificates are issued/revoked by a Certificate Authority (CA).",
      "Certificate Trust Lists (CTLs) maintain a list of trusted entities.",
      "Enables secure Over-the-Air (OTA) updates.",
      "Forms the backbone of secure in-vehicle and V2X (Vehicle-to-Everything) communication.",
    ],
    benefits: {
      "1.Enhanced Security": ["Authenticates ECUs and ensures only trusted components communicate on the network."],
      "2.Data Integrity": ["Verifies that messages are not altered, preventing spoofing or tampering."],
      "3.Secure Updates": ["Enables safe over-the-air (OTA) firmware updates through digital signature verification."],
      "4.Scalable Trust Model": ["Allows centralized certificate management and easy revocation, making it suitable for large, complex vehicle systems."]
    },
    useCases: {
      "1.ECU Authentication": ["Ensures only trusted Electronic Control Units (ECUs) can participate in vehicle communication."],
      "2.Secure Boot and Firmware Updates": ["Verifies digital signatures of software/firmware before execution or OTA installation."],
      "3.Message Integrity Verification": ["Confirms that in-vehicle messages (e.g., speed, braking signals) are not tampered with."],
      "4.Access Control for Diagnostic Tools": ["Restricts diagnostic access to authorized tools with valid certificates."],
    },
    // standards: [
    //   "IEEE 1609.2 - V2X Security",
    //   "ISO/SAE 21434 - Vehicle Cybersecurity",
    //   "AUTOSAR SecOC - Secure Onboard Communication",
    // ],
  };

  const vehicleData = {
    title: "Vehicle Communication Protocols",
    CAN1: ["Used widely in vehicles to allow different ECUs (like engine, brake, transmission) to communicate.",
      "It is reliable, cost-effective, and ideal for real-time control applications.",
      "Helps maintain smooth vehicle operation by exchanging control signals.",
    ],
    CAN: ["Used widely in vehicles to allow different ECUs (like engine, brake, transmission) to communicate.",
      "It is reliable, cost-effective, and ideal for real-time control applications.",
      "Helps maintain smooth vehicle operation by exchanging control signals.",],
    CANFD: ["An improved version of CAN that can send more data at faster speeds.",
      "Useful in modern vehicles where advanced features need more bandwidth.",
      "Often used in ECUs that manage complex functions like ADAS (Advanced Driver Assistance Systems).",  ],
    FlexRay: ["Designed for high-speed and highly reliable communication.",
      "Used in systems where timing is critical, like brake-by-wire or steering systems.",
      "Ensures consistent and predictable communication even in harsh conditions.",],
    LIN: ["A simpler and cheaper network used for body electronics like door locks, mirrors, and windows.",
      "Works well when perfect timing and speed aren't needed.",
      "Often acts as a support system to more complex networks like CAN.",],
    Auto: ["Provides fast communication for high-bandwidth needs like cameras, infotainment, or V2X.",
      "Becoming popular in new vehicles because it supports modern features like autonomous driving.",
      "Can connect many systems over one network, just like your home or office Ethernet.",],
    MOST: ["Used mainly for in-car entertainment systems – audio, video, and navigation.",
      "Ensures smooth delivery of media without delays or interference.",
      "Good for high-quality multimedia transmission between devices in the car.",]
  };

  return (
    <Box
      sx={{
        bgcolor: "#F5F5F5",
        // px: { xs: 2, sm: 4, md: 6 },
        // py: 2,
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {/* Top images side by side on md+, stacked on xs */}
<Grid container spacing={2}>
  {/* Left Grid with Bike Image */}
  <Grid item xs={12} md={6} className="image-grid">
    <Box className="image-wrapper" sx={{ border: '2px solid' }}>
      <Typography variant="h6" align="center">
        Demonstration
      </Typography>
      <img src={sunboardbike} alt="View" className="bike-image" 
      style={{cursor:'pointer'}}
      onClick={() => setSelectedCategory("components")}/>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={1}
        gap={1}
      >
        <Typography
          variant="h6"
          component="span"
          color="black"
          sx={{ fontWeight: 500 }}
        >
          In Collaboration with:
        </Typography>
        <img
          src={tvs_logo}
          alt="TVS logo"
          style={{ width: 'auto', maxHeight: '80px', maxWidth: '150px' }}
        />
      </Box>
    </Box>
  </Grid>



        {/* Right Grid with Vehicle Protocol Image */}
        <Grid item xs={12} md={6} className="image-grid">
          <Typography variant="h4" className="protocol-title">
            Vehicle Communication Protocols
          </Typography>
          <Box className="image-wrapper right">
            <img src={vehicle} alt="Vehicle View" className="vehicle-image" />
          </Box>
        </Grid>
      </Grid>


      {/* Content below: two columns on md+, stacked on xs */}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        px={{ xs: 1, md: 3 }}
        py={2}
        sx={{
          flex: 1,
          bgcolor: "#f0f4f8", // light outer background
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {/* Left Column - PKI Info */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3 },
            bgcolor: "#c8e0f9ff", // white background
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            mb={2}
            color="primary"
            sx={{ fontSize: { xs: "1.3rem", md: "1.6rem" } }}
          >
            {pkiData.title}
          </Typography>

          {/* Overview */}
          <List dense sx={{
            '& .MuiListItemText-primary': {
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#333',
              fontFamily: 'Segoe UI, sans-serif',
            }
          }}>

            {pkiData.overview.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))}
          </List>


          {/* Benefits */}
          <Accordion sx={{ mt: 2, bgcolor: "#fdfdfd" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}>
                🔐 Key Benefits
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ mb: 1 }} />
              <List dense>
                {Object.entries(pkiData.benefits).map(([category, items]) => (
                  <Box key={category} sx={{ mb: 1 }}>
                    <Typography fontWeight="700" gutterBottom>
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
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Use Cases */}
          <Accordion sx={{ mt: 1, bgcolor: "#fdfdfd" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}>
                🚘 Use Cases
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ mb: 1 }} />
              <List dense>
                {Object.entries(pkiData.useCases).map(([category, items]) => (
                  <Box key={category} sx={{ mb: 1 }}>
                    <Typography fontWeight="700" gutterBottom>
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
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Right Column - Protocol Info */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3 },
            bgcolor: "#c8e0f9ff", // very light blueish background
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            mb={2}
            color="secondary"
            sx={{ fontSize: { xs: "1.3rem", md: "1.6rem" } }}
          >
            {vehicleData.title}
          </Typography>

          {[
            { label: "1. CAN (Controller Area Network)", items: vehicleData.CAN1 },
            { label: "2. CAN FD (Flexible Data Rate)", items: vehicleData.CANFD },
            { label: "3. FlexRay", items: vehicleData.FlexRay },
            { label: "4. LIN (Local Interconnect Network)", items: vehicleData.LIN },
            { label: "5. Automotive Ethernet", items: vehicleData.Auto },
            {
              label: "6. MOST (Media Oriented Systems Transport)",
              items: vehicleData.MOST,
            },
          ].map((protocol, idx) => (
            <Accordion key={idx} sx={{ mt: idx === 0 ? 0 : 1, bgcolor: "#ffffff" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}>
                  {protocol.label}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Divider sx={{ mb: 1 }} />
                <List dense>
                  {protocol.items.map((item, i) => (
                    <ListItem key={i} disablePadding>
                      <ListItemText primary={`• ${item}`} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>


    </Box>
  );
};

export default Home;

