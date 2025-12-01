import { Box, Button } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';

const SectionNavigation = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: 'demo', label: 'Demonstration', icon: <ImageIcon /> },
    { id: 'protocols', label: 'Protocols', icon: <DirectionsCarIcon /> },
    { id: 'pki', label: 'PKI Security', icon: <SecurityIcon /> },
    { id: 'vehicle', label: 'Communication', icon: <BuildIcon /> },
  ];

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        // bgcolor: '#ffffff',
        // borderBottom: '2px solid #e0e0e0',
        // boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        py: 1.5,
        px: 2,
        mt: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            startIcon={section.icon}
            variant={activeSection === section.id ? 'contained' : 'outlined'}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'none',
              borderRadius: 2,
              minWidth: { xs: '120px', sm: '150px' },
              bgcolor: activeSection === section.id ? '#6082B6' : 'transparent',
              color: activeSection === section.id ? '#fff' : '#1976d2',
              borderColor: '#1976d2',
              '&:hover': {
                bgcolor: activeSection === section.id ? '#6082B6' : '#e3f2fd',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {section.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SectionNavigation;
