import { Grid, Box, Typography, Button, Tooltip, IconButton } from '@mui/material';
import { Help } from '@mui/icons-material';
import { useState } from 'react';
import sunboard2 from '../../assets/auto2.png';
import tvs_logo from '../../assets/tvs_logo.png';
import InVehicleServer from '../InVehicleServerNew';
import HelpDialog from './HelpDialog';

const ComponentsView = ({ selectedComponent, validationStatus, onComponentClick }) => {
  const [helpOpen, setHelpOpen] = useState(false);
  
  const components = [
    { name: 'In-Vehicle Server', top: '58.5%', left: '68.4%' },
    { name: 'Light control Unit', top: '58.5%', left: '54.4%' },
    { name: 'Instrument Cluster', top: '44%', left: '33.5%' },
    { name: 'Indicators', top: '58%', left: '17%' },
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
        maxWidth: selectedComponent ? {sm: '90vw', md: '90vw', lg: '90vw', xl: '50vw'} : '90vw',
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
            position: 'relative',
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
          
          {/* Help Button with Text */}
          <Box
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: '#fff',
                fontWeight: 500,
                cursor: 'pointer',
                display: { xs: 'none', sm: 'block' },
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              onClick={() => setHelpOpen(true)}
            >
              Help & Instructions
            </Typography>
            <Tooltip title="Help & Instructions" arrow>
              <IconButton
                onClick={() => setHelpOpen(true)}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  },
                }}
              >
                <Help fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Help Dialog */}
        <HelpDialog open={helpOpen} onClose={() => setHelpOpen(false)} />
        
        {/* Image Container with positioned buttons */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            display: 'inline-block',
          }}
        >
          <img
            src={sunboard2}
            alt="Bike View"
            style={{
              width: '100%',
              display: 'block',
              borderRadius: '12px',
            }}
          />
          
          {/* Overlay Buttons - positioned relative to image */}
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
                  fontSize: 'clamp(0.45rem, 1vw, 0.75rem)',
                  border: '1px solid #000000',
                  borderRadius: '8px',
                  px: 'clamp(4px, 0.8vw, 8px)',
                  py: 'clamp(3px, 0.5vw, 6px)',
                  minWidth: 'clamp(45px, 6vw, 80px)',
                  maxWidth: 'clamp(55px, 8vw, 100px)',
                  minHeight: 'clamp(24px, 3.5vw, 40px)',
                  textAlign: 'center',
                  whiteSpace: 'normal',
                  lineHeight: 1.1,
                  zIndex: 5,
                  textTransform: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#e0f7fa',
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
      </Box>
    </Grid>
  );
};

export default ComponentsView;
