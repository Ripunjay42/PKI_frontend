import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Chip,
} from "@mui/material";
import vehicle from "./assets/vehicle.png";
import sunboardbike from "./assets/reep.png";
import tvs_logo from './assets/tvs_logo.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import './index.css';

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
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)",
        width: "100%",
        minHeight: "100vh",
        maxWidth: "92vw",
        mx: "auto",
        py: 2,
      }}
    >
      {/* Top images side by side on md+, stacked on xs */}
      <Grid container spacing={3} sx={{ alignItems: 'stretch', mb: 3 }}>
        {/* Left Grid with Bike Image */}
        <Grid item xs={12} md={6} className="image-grid" sx={{ display: 'flex' }}>
          <Paper
            elevation={4}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              borderRadius: 3,
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              },
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(90deg, #7393B3, #7393B3)',
                py: 1.5,
                px: 2,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                sx={{ color: '#fff', fontWeight: '700', letterSpacing: 0.5 }}
              >
                Demonstration
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, bgcolor: '#fff' }}>
              <img
                src={sunboardbike}
                alt="View"
                className="bike-image"
                style={{
                  cursor: 'pointer',
                  maxHeight: '100%',
                  width: '100%',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                }}
                onClick={() => setSelectedCategory("components")}
              />
            </Box>
            <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={0}
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
          </Paper>
        </Grid>

        {/* Right Grid with Vehicle Protocol Image */}
        <Grid item xs={12} md={6} className="image-grid" sx={{ display: 'flex' }}>
          <Paper
            elevation={4}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              borderRadius: 3,
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              },
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(90deg, #483248)',
                py: 1.5,
                px: 2,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                sx={{ color: '#fff', fontWeight: '700', letterSpacing: 0.5 }}
              >
                Vehicle Communication Protocols
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, bgcolor: '#fff' }}>
              <img src={vehicle} alt="Vehicle View" className="vehicle-image" style={{ maxHeight: '100%', width: '100%', objectFit: 'contain' }} />
            </Box>
            <Box sx={{ py: 1.5, px: 2, bgcolor: '#fafafa', borderTop: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {['CAN', 'CAN FD', 'FlexRay', 'LIN', 'Ethernet', 'MOST'].map((protocol) => (
                  <Chip
                    key={protocol}
                    label={protocol}
                    size="small"
                    sx={{
                      bgcolor: '#e3f2fd',
                      color: '#1565c0',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>


      {/* Content below: two columns on md+, stacked on xs */}
      <Grid
        container
        spacing={3}
        sx={{
          flex: 1,
          alignItems: 'stretch',
        }}
      >
        {/* Left Column - PKI Info */}
        <Grid item xs={12} md={6} className="image-grid" sx={{ display: 'flex' }}>
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

        {/* Right Column - Protocol Info */}
        <Grid item xs={12} md={6} className="image-grid" sx={{ display: 'flex' }}>
          <Paper
            elevation={4}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              background: 'linear-gradient(145deg, #f3e5f5 0%, #e1bee7 100%)',
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
    </Box>
  );
};

export default Home;

