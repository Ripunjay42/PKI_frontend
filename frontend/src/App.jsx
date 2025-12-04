import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import './App.css';
import Home from './Home';
import InVehicleServer from './component/InVehicleServerNew';
import InstrumentCluster from './component/InstrumentCluster';
import HeadLightUnit from './component/HeadlightUnit';
import ElectronicThrottleBody from './component/ElectronicThrottleBody';
import EngineControlUnit from './component/EngineControlUnit';
import Indicators from './component/Indicators';
import LandingPage from './component/LandingPage';
import LiveDemo from './realtimeDemo/LiveDemo';
import Header from './component/AppComponents/Header';
import ComponentsView from './component/AppComponents/ComponentsView';
import ComponentDetail from './component/AppComponents/ComponentDetail';

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
    'Electronic Throttle Body (Ride-by-wire)':<ElectronicThrottleBody/>,
    'Indicators': <Indicators/>
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
      <Header 
        selectedCategory={selectedCategory}
        onSectionClick={handleSectionClick}
        onBackToLanding={handleBackToLanding}
      />

      {/* Content Switcher */}
      <Box>
        {/* Home Section */}
        {selectedCategory === 'home' && <Home setSelectedCategory={setSelectedCategory} />}

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
              alignItems: {lg: 'flex-start', md: 'center', xs: 'center'},
              justifyContent: 'center',
              p: { xs: 1, md: 3 },
              minHeight: '60vh',
              borderRadius: 3,
              mx: 'auto',
              maxWidth: '100vw',
            }}
          >
            {/* Left Side - Image with Overlay Buttons */}
            <ComponentsView 
              selectedComponent={selectedComponent}
              validationStatus={validationStatus}
              onComponentClick={handleClick}
            />

            {/* Right Side - Component Details */}
            {selectedComponent && (
              <ComponentDetail>
                {componentMap[selectedComponent]}
              </ComponentDetail>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default App;