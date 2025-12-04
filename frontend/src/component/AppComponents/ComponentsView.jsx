import { Grid, Box, Typography, Button, Tooltip } from '@mui/material';
import sunboard2 from '../../assets/auto2.png';
import tvs_logo from '../../assets/tvs_logo.png';
import InVehicleServer from '../InVehicleServerNew';

const ComponentsView = ({ selectedComponent, validationStatus, onComponentClick }) => {
  const components = [
    { name: 'In-Vehicle Server', top: '53.9%', left: '68.4%' },
    { name: 'Light control Unit', top: '53.9%', left: '54.4%' },
    { name: 'Instrument Cluster', top: '43%', left: '33.5%' },
    { name: 'Indicators', top: '54%', left: '17%' },
  ];

  return (
    <Grid
      item
      xs={12}
      md={selectedComponent ? 6 : 12}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 2,
        position: selectedComponent ? 'sticky' : 'static',
        top: 0,
        maxWidth: selectedComponent ? {sm: '90vw', md: '90vw', lg: '50vw'} : '90vw',
        width: '90%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: selectedComponent ? 'none' : '1100px',
          position: 'relative',
          borderRadius: '16px',
          bgcolor: '#ffffff',
          px: 1,
          pb: 1,
          pt: 1,
        //   boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        //   border: '1px solid rgba(255,255,255,0.8)',
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(90deg, #7393B3, #7393B3)',
            py: 1,
            px: 1,
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
            PKI Security Demonstration
          </Typography>
        </Box>
        
        <img
          src={sunboard2}
          alt="Bike View"
          style={{
            width: '100%',
            objectFit: 'contain',
            maxHeight: selectedComponent ? '100vh' : '90vh', 
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
        {components.map((comp) => (
          <Tooltip key={comp.name} title={comp.name} arrow>
            <Button
              onClick={() => onComponentClick(comp.name)}
              sx={{
                position: 'absolute',
                top: comp.top,
                left: comp.left,
                transform: 'translate(-50%, -50%)',
                backgroundColor: selectedComponent === comp.name ? '#F0FFFF' : '#F0FFFF',
                color: '#000',
                fontWeight: 600,
                fontSize: {
                  xs: '0.5rem',
                  sm: '0.6rem',
                  md: '0.75rem',
                  lg: '0.75rem',
                },
                border: '1px solid #000000',
                borderRadius: '8px',
                px: { xs: 0.8, sm: 0.5, md: 0.6 },
                py: { xs: 0.6, sm: 0.8, md: 0.6 },
                minWidth: { xs: '50px', sm: '55px', md: '50px' },
                maxWidth: comp.name === InVehicleServer ? { xs: '55px', sm: '65px', md: '70px', lg: '80px', xl: '80px' } :{ xs: '65px', sm: '75px', md: '80px', lg: '90px', xl: '100px' },
                minHeight: { xs: '28px', sm: '36px', md: '40px' },
                textAlign: 'center',
                whiteSpace: 'normal',
                lineHeight: 1.1,
                zIndex: 5,
                textTransform: 'none',
                transition: 'all 0.2s ease',
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
  );
};

export default ComponentsView;
