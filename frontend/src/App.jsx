import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Container,
  Stack,
  Paper,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import cdac_logo1 from './assets/cdac_logo1.png';
import cca_meity from './assets/cca_meity.png';
import tvs_logo from './assets/tvs_logo.png';
import sunboard2 from './assets/sunboard2.png';
import emblem1 from './assets/emblem1.png';
import logo_cca from './assets/logo_cca.png';
import './App.css';
import styled from 'styled-components';
import Home from './Home';
import InVehicleServer from './component/InVehicleServer';
import InstrumentCluster from './component/InstrumentCluster';
import HeadLightUnit from './component/HeadlightUnit';
import ElectronicThrottleBody from './component/ElectronicThrottleBody';
import EngineControlUnit from './component/EngineControlUnit';
const MotionBox = motion(Box);

const StyledWrapper = styled.div`
  button {
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
    user-select: none;
    touch-action: manipulation;
  }

  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: hsl(0deg 0% 0% / 0.25);
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(
      to left,
      hsl(340deg 100% 16%) 0%,
      hsl(340deg 100% 32%) 8%,
      hsl(340deg 100% 32%) 92%,
      hsl(340deg 100% 16%) 100%
    );
  }
  .front {
    display: block;
    position: relative;
    padding: 12px 27px;
    border-radius: 12px;
    font-size: 1.1rem;
    color: white;
    background: hsl(345deg 100% 47%);
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  button:hover {
    filter: brightness(110%);
  }
  button:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  button:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }
  button:focus:not(:focus-visible) {
    outline: none;
  }

  button.active .front {
    background: green !important;
  }
`;

function App() {
    const [validationStatus, setValidationStatus] = useState({});
    const [selectedComponent, setSelectedComponent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("home");
    /* =============== STATE ADD BY LOKESH =================== */
     
    const [pendingValidation, setPendingValidation] = useState(null);

    /* ======================================================= */


    const handleValidationUpdate = (name, isValid) => {
      setValidationStatus(prev => ({ ...prev, [name]: isValid }));
    };
  const componentMap = {
    'In-Vehicle Server': <InVehicleServer onValidationResult={handleValidationUpdate} />,
    'Instrument Cluster': <InstrumentCluster/>,
    'Engine Control Unit': <EngineControlUnit onValidationResult={handleValidationUpdate} />,
    'Headlight Unit': <HeadLightUnit onValidationResult={handleValidationUpdate} />,
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
    <Box sx={{ height: '100vh', bgcolor: '#F5F5F5', overflowX: 'hidden', width: '100vw' }}>
      {/* Top AppBar */}
<AppBar position="static">
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

      {/* Right Section (CDAC Logo) */}
      <Grid item xs={12} sm={4}>
        <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-end' }}>
          <img
            src={cdac_logo1}
            alt="CDAC logo"
            style={{ width: 'auto', maxHeight: '70px', maxWidth: '200px' }}
          />
        </Box>
      </Grid>
    </Grid>
  </Toolbar>
</AppBar>



      {/* Logo Header */}
<Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, md: 10 }, py: 3 }}>
  {/* <Box
    display="flex"
    justifyContent="space-between"
    alignItems="flex-end"
    flexWrap="wrap"
    gap={4} // More spacing between logo and nav
  > */}
    {/* Logos: More spacing and scaling
    <Box
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems="center"
       gap={{ xs: 6, sm: 8, md: 12, lg: 16 }}
      flexWrap="wrap"
      flexGrow={1}
    >

      <img
        src={tvs_logo}
        alt="TVS logo"
        style={{ width: 'auto', maxHeight: '80px', maxWidth: '900px' }}
      />

    </Box> */}

    {/* Navigation Buttons */}
    <Box
      mt={{ xs: 3, sm: 0 }}
      width={{ xs: '100%', sm: 'auto' }}
      display="flex"
      justifyContent={{ xs: 'center', sm: 'flex-end' }}
    >
      <StyledWrapper>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 6, md: 8 }}
          alignItems="center"
        >
          <button
            className={selectedCategory === 'home' ? 'active' : ''}
            onClick={() => handleSectionClick('home')}
          >
            <span className="shadow" />
            <span className="edge" />
            <span className="front text">Home</span>
          </button>
          <button
            className={selectedCategory === 'components' ? 'active' : ''}
            onClick={() => handleSectionClick('components')}
          >
            <span className="shadow" />
            <span className="edge" />
            <span className="front text">Components</span>
          </button>
        </Stack>
      </StyledWrapper>
    </Box>
  {/* </Box> */}
</Container>


      {/* Content Switcher */}
      <Box>
        {/* Home Section */}
        {selectedCategory === 'home' && <Home  setSelectedCategory={setSelectedCategory} />}

        {/* Components Section */}
        {selectedCategory === 'components' && (
         <Grid
  container
  component={Paper}
  elevation={4}
  sx={{
    bgcolor: '#f5f5f5',
    overflow: 'hidden',
    transition: 'all 0.5s ease',
    flexDirection: {
      xs: 'column',
      md: selectedComponent ? 'row' : 'column', // Image in center or left
    },
    alignItems: selectedComponent ? 'stretch' : 'center', // center if nothing selected
    justifyContent: 'center',
    p: 2,
  }}
>
  {/* Left Side - Image */}
  <Grid
    item
    xs={12}
    md={selectedComponent ? 6 : 12}
    sx={{
      transition: 'all 0.5s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: 2,
      
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: selectedComponent ? '700px' : '1000px',
        transition: 'max-width 0.5s',
        position: 'relative',
        border: '2px solid' ,px:1
      }}
    >
       <Typography variant="h6" align="center">
        Demonstration
      </Typography>
      <img
  src={sunboard2}
  alt="Bike View"
  style={{
    width: '100%',
    objectFit: 'contain',
    maxHeight: selectedComponent ? '95vh' : '85vh', 
    height: 'auto',
    transition: 'all 0.5s ease',
  }}
/>
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

      {/* Overlay Buttons */}
{[
  { name: 'In-Vehicle Server', top: '34%', left: '50%' },
  { name: 'Engine Control Unit', top: '55%', left: '43%' },
  { name: 'Headlight Unit', top: '52.5%', left: '77.1%' },
  { name: 'Instrument Cluster', top: '18%', left: '83%' },
  {
    name: 'Electronic Throttle Body (Ride-by-wire)',
    top: '75%',
    left: '13%',
  },
].map((comp) => (
  <Tooltip key={comp.name} title={comp.name} arrow>
    <Button
      onClick={() => handleClick(comp.name)}
      sx={{
        position: 'absolute',
        top: comp.top,
        left: comp.left,
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: '#000',
        fontWeight: 600,
        fontSize: {
          xs: '0.55rem',
          sm: '0.65rem',
          md: '0.75rem',
          lg: '0.85rem',
        },
        border: '1px solid #ccc',
        borderRadius: '8px',
        px: { xs: 0.5, sm: 1 },
        py: { xs: 0.3, sm: 0.5 },
        minWidth: { xs: '90px', sm: '120px', md: '140px' },
        maxWidth: { xs: '100px', sm: '140px', md: '160px' }, // 🔹 Added for wrapping
        textAlign: 'center',
        whiteSpace: 'normal', // 🔹 Enables text wrap
        lineHeight: 1.2,
        zIndex: 5,
        boxShadow:
          selectedComponent === comp.name ? '0 0 8px 2px #1976d2' : 'none',
        transition: 'all 0.3s ease-in-out',
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
        alignItems: 'stretch',
      }}
    >
      <MotionBox
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: '100%' }}
      >
        <Box
          p={2}
          sx={{
            bgcolor: '#ffffff',
            height: '100%',
            borderRadius: '12px',
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              p: 3,
              bgcolor: '#f9f9f9',
              minHeight: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transition: 'background-color 0.3s',
              '&:hover': {
                bgcolor: '#f0f0f0',
              },
            }}
          >
            {componentMap[selectedComponent]}
          </Box>
        </Box>
      </MotionBox>
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