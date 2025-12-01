import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  Tooltip,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import cdac_logo1 from './assets/cdac_logo1.png';
import tvs_logo from './assets/tvs_logo.png';
import sunboard2 from './assets/reepl3.png';
import emblem1 from './assets/emblem1.png';
import logo_cca from './assets/logo_cca.png';
import './App.css';
import Home from './Home';
import InVehicleServer from './component/InVehicleServerNew';
import InstrumentCluster from './component/InstrumentCluster';
import HeadLightUnit from './component/HeadlightUnit';
import ElectronicThrottleBody from './component/ElectronicThrottleBody';
import EngineControlUnit from './component/EngineControlUnit';
import LandingPage from './component/LandingPage';
import LiveDemo from './realtimeDemo/LiveDemo';

function App() {
    const [validationStatus, setValidationStatus] = useState({});
    const [selectedComponent, setSelectedComponent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("home");
    const [currentMode, setCurrentMode] = useState(null); // null = landing page, 'static' = main app
    /* =============== STATE ADD BY LOKESH =================== */
     
    const [pendingValidation, setPendingValidation] = useState(null);

    /* ======================================================= */

    // Lifted state for persistence across navigation
    const [ecuTimestamps, setEcuTimestamps] = useState([]);
    const [hcuTimestamps, setHcuTimestamps] = useState([]);
    const [revokedList, setRevokedList] = useState({ ECU: false, LCU: false });
    const [ecuValidationResult, setEcuValidationResult] = useState(null);
    const [hcuValidationResult, setHcuValidationResult] = useState(null);

    const handleModeSelect = (mode) => {
      if (mode === 'static') {
        setCurrentMode('static');
      }
      if (mode === 'realtime') {
        setCurrentMode('realtime');
      }
    };

    const handleBackToLanding = () => {
      setCurrentMode(null);
      setSelectedCategory("home");
      setSelectedComponent('');
    };

    const handleValidationUpdate = (name, isValid) => {
      setValidationStatus(prev => ({ ...prev, [name]: isValid }));
    };

    const handleResetValidation = () => {
      setValidationStatus({});
    };

    const handleGoToComponents = () => {
      setCurrentMode('static');
      setSelectedCategory('components');
      setSelectedComponent('In-Vehicle Server');
    };

  // Show landing page if no mode is selected
  if (currentMode === null) {
    return <LandingPage onModeSelect={handleModeSelect} />;
  }

  // Show Live Demo for realtime mode
  if (currentMode === 'realtime') {
    const isHcuValidated = validationStatus['Headlight Unit'] === true;
    return <LiveDemo onBack={handleBackToLanding} isValidated={isHcuValidated} onGoToComponents={handleGoToComponents} />;
  }

  const handleGoToLiveDemo = () => {
    setCurrentMode('realtime');
  };

  const componentMap = {
    'In-Vehicle Server': <InVehicleServer 
      onValidationResult={handleValidationUpdate} 
      onGoToLiveDemo={handleGoToLiveDemo}
      onResetValidation={handleResetValidation}
      ecuTimestamps={ecuTimestamps}
      setEcuTimestamps={setEcuTimestamps}
      hcuTimestamps={hcuTimestamps}
      setHcuTimestamps={setHcuTimestamps}
      revokedList={revokedList}
      setRevokedList={setRevokedList}
      ecuValidationResult={ecuValidationResult}
      setEcuValidationResult={setEcuValidationResult}
      hcuValidationResult={hcuValidationResult}
      setHcuValidationResult={setHcuValidationResult}
    />,
    'Instrument Cluster': <InstrumentCluster/>,
    'Engine Control Unit': <EngineControlUnit onValidationResult={handleValidationUpdate} />,
    'Light control Unit': <HeadLightUnit onValidationResult={handleValidationUpdate} />,
    'Electronic Throttle Body (Ride-by-wire)':<ElectronicThrottleBody/>
  };
  
  const handleClick = (componentName) => {
    setSelectedComponent(componentName);
  };

  const handleSectionClick = (category) => {
    setSelectedCategory(category);
    setSelectedComponent('');
  };

  
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)', overflowX: 'hidden', width: '100vw' }}>
      {/* Top AppBar */}
<AppBar position="static" elevation={4}>
  <Toolbar
    sx={{
      bgcolor: 'lightblue',
      color: '#fff',
      py: { xs: 1, sm: 2 },
    }}
  >
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: '100%' }}
    >
      {/* Left Section (Emblem + CCA) */}
      <Grid item xs={12} sm={4}>
        <Box
          display="flex"
          justifyContent={{ xs: 'center', sm: 'flex-start' }}
          alignItems="center"
          gap={2}
        >
          <img
            src={emblem1}
            alt="lion"
            style={{ maxHeight: '70px', width: 'auto' }}
          />
          <img
            src={logo_cca}
            alt="CCA logo"
            style={{ maxHeight: '70px', maxWidth: '300px', width: 'auto' }}
          />
        </Box>
      </Grid>

      {/* Center Section (PKI Title) */}
      <Grid item xs={12} sm={4}>
        <Typography
          fontFamily="Arial"
          fontWeight="bold"
          sx={{
            fontSize: { xs: '1.6rem', sm: '2.2rem', md: '2.4rem' },
            textAlign: 'center',
            color: 'black',
          }}
        >
          PKI Based Automotive Security
        </Typography>
      </Grid>

      {/* Right Section (Buttons + CDAC Logo) */}
      <Grid item xs={12} sm={4}>
        <Box 
          display="flex" 
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          alignItems="center"
          gap={1}
        >
          <Button
            onClick={() => handleSectionClick('home')}
            startIcon={<HomeIcon />}
            sx={{
              bgcolor: selectedCategory === 'home' ? '#1976d2' : '#fff',
              color: selectedCategory === 'home' ? '#fff' : '#1a365d',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              px: { xs: 1, sm: 1.5 },
              py: 0.8,
              borderRadius: 2,
              textTransform: 'none',
              border: '2px solid #1976d2',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: selectedCategory === 'home' ? '#1565c0' : '#e3f2fd',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => handleSectionClick('components')}
            startIcon={<SettingsIcon />}
            sx={{
              bgcolor: selectedCategory === 'components' ? '#1976d2' : '#fff',
              color: selectedCategory === 'components' ? '#fff' : '#1a365d',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              px: { xs: 1, sm: 1.5 },
              py: 0.8,
              borderRadius: 2,
              textTransform: 'none',
              border: '2px solid #1976d2',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: selectedCategory === 'components' ? '#1565c0' : '#e3f2fd',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Components
          </Button>
          <Button
            onClick={handleBackToLanding}
            startIcon={<ExitToAppIcon />}
            sx={{
              bgcolor: '#fff',
              color: '#d32f2f',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              px: { xs: 1, sm: 1.5 },
              py: 0.8,
              borderRadius: 2,
              textTransform: 'none',
              border: '2px solid #d32f2f',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: '#ffebee',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Exit
          </Button>
          <img
            src={cdac_logo1}
            alt="CDAC logo"
            style={{ width: 'auto', maxHeight: '70px', maxWidth: '200px', marginLeft: '8px' }}
          />
        </Box>
      </Grid>
    </Grid>
  </Toolbar>
</AppBar>

      {/* Content Switcher */}
      <Box>
        {/* Home Section */}
        {selectedCategory === 'home' && <Home  setSelectedCategory={setSelectedCategory} />}

        {/* Components Section */}
        {selectedCategory === 'components' && (
         <Grid
            container
            sx={{
              marginTop: -4,
              overflow: 'hidden',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              alignItems: 'flex-start',
              justifyContent: 'center',
              p: { xs: 1, md: 3 },
              minHeight: '60vh',
              borderRadius: 3,
              mx: 'auto',
              maxWidth: '100vw',
            }}>
  {/* Left Side - Image */}
  <Grid
    item
    xs={12}
    md={selectedComponent ? 6 : 12}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      py: 2,
      position: selectedComponent ? 'sticky' : 'static',
      top: 0,
      maxWidth: '45vw',
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: selectedComponent ? '700px' : '950px',
        position: 'relative',
        borderRadius: '16px',
        bgcolor: '#ffffff',
        px: 3,
        pb: 3,
        pt: 2,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        border: '1px solid rgba(255,255,255,0.8)',
      }}
    >
       <Box
         sx={{
           background: 'linear-gradient(90deg, #7393B3, #7393B3)',
           py: 1.5,
           px: 2,
           borderRadius: 2,
           mb: 2,
         }}
       >
         <Typography 
           variant="h5" 
           align="center" 
           sx={{ 
             fontWeight: 700, 
             color: '#fff',
             letterSpacing: '0.5px'
           }}
         >
          Demonstration
         </Typography>
       </Box>
      <img
  src={sunboard2}
  alt="Bike View"
  style={{
    width: '100%',
    objectFit: 'contain',
    maxHeight: selectedComponent ? '95vh' : '85vh', 
    height: 'auto',
    borderRadius: '12px',
  }}
/>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={2}
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

      {/* Overlay Buttons */}
{[
  { name: 'In-Vehicle Server', top: '40%', left: '70%' },
  { name: 'Light control Unit', top: '40%', left: '33%' },
].map((comp) => (
  <Tooltip key={comp.name} title={comp.name} arrow>
    <Button
      onClick={() => handleClick(comp.name)}
      sx={{
        position: 'absolute',
        top: comp.top,
        left: comp.left,
        transform: 'translate(-50%, -50%)',
        backgroundColor: selectedComponent === comp.name ? '#1976d2' : 'rgba(255, 255, 255, 0.98)',
        color: selectedComponent === comp.name ? '#fff' : '#333',
        fontWeight: 600,
        fontSize: {
          xs: '0.6rem',
          sm: '0.7rem',
          md: '0.8rem',
          lg: '0.9rem',
        },
        border: selectedComponent === comp.name ? 'none' : '1px solid #e0e0e0',
        borderRadius: '12px',
        px: { xs: 1.5, sm: 2 },
        py: { xs: 1, sm: 1.5 },
        minWidth: { xs: '100px', sm: '130px', md: '150px' },
        maxWidth: { xs: '120px', sm: '150px', md: '180px' },
        textAlign: 'center',
        whiteSpace: 'normal',
        lineHeight: 1.3,
        zIndex: 5,
        boxShadow: selectedComponent === comp.name 
          ? '0 6px 20px rgba(25, 118, 210, 0.4)' 
          : '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      {comp.name}
      {validationStatus[comp.name] === true && ' ✅'}
      {validationStatus[comp.name] === false && ' ❌'}
    </Button>
  </Tooltip>
))}


    </Box>
  </Grid>

  {/* Right Side - Component Details */}
  {selectedComponent && (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        px: { xs: 1, sm: 2, md: 4 },
        py: 2,
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <Box
        style={{ width: '100%', maxWidth: '700px' }}
      >
        <Box
          p={{ xs: 2, md: 3 }}
          sx={{
            bgcolor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid rgba(255,255,255,0.8)',
            width: '100%',
          }}
        >
          <Box
            sx={{
              borderRadius: '12px',
              p: { xs: 2, md: 3 },
              background: 'linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              overflow: 'visible',
            }}
          >
            {componentMap[selectedComponent]}
          </Box>
        </Box>
      </Box>
    </Grid>
  )}
</Grid>

)}
 {/* </Grid> </Grid>
        )} */}

        {/* CRL List Section */}
        {/* {selectedCategory === 'crl' && (
          <Typography textAlign="center" p={4}>
            CRL List will be shown here.
          </Typography>
        )} */}
      </Box>
    </Box>
  );
}

export default App;