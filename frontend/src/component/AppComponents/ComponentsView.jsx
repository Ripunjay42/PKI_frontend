import { Grid, Box, Typography, Button, Tooltip } from '@mui/material';
import sunboard2 from '../../assets/reep.png';
import tvs_logo from '../../assets/tvs_logo.png';

const ComponentsView = ({ selectedComponent, validationStatus, onComponentClick }) => {
  const components = [
    { name: 'In-Vehicle Server', top: '53.8%', left: '72%' },
    { name: 'Light control Unit', top: '54.5%', left: '53.3%' },
    { name: 'Instrument Cluster', top: '37%', left: '34%' },
    { name: 'Indicators', top: '53%', left: '15.8%' },
  ];

  return (
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
        maxWidth: selectedComponent ? '50vw' : '90vw',
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
                backgroundColor: selectedComponent === comp.name ? '#FFD1DF' : '#FFD1DF',
                color: '#000',
                fontWeight: 500,
                fontSize: {
                  xs: '0.65rem',
                  sm: '0.75rem',
                  md: '0.85rem',
                  lg: '0.90rem',
                },
                // border: selectedComponent === comp.name ? '1px solid rgba(255, 140, 60, 1)' : '1px solid rgba(255, 140, 60, 1)',
                borderRadius: '8px',
                px: { xs: 0.5, sm: 1, md: 3 },
                py: { xs: 0.5, sm: 1, md: 2 },
                minWidth: { xs: '90px', sm: '110px', md: '150px' },
                maxWidth: { xs: '100px', sm: '120px', md: '150px' },
                textAlign: 'center',
                whiteSpace: 'normal',
                lineHeight: 1.2,
                zIndex: 5,
                textTransform: 'none',
                boxShadow: selectedComponent === comp.name 
                  ? '0 6px 20px rgba(25, 118, 210, 0.5)' 
                  : '0 4px 15px rgba(255, 140, 60, 0.4)',
                '&:hover': {
                  backgroundColor: selectedComponent === comp.name ? '#FFD1DF' : '#FFD1DF',
                  // boxShadow: '0 6px 20px rgba(255, 140, 60, 0.6)',
                },
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
