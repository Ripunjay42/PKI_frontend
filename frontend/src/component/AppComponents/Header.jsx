import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import cdac_logo1 from '../../assets/cdac_logo1.png';
import emblem1 from '../../assets/emblem1.png';
import logo_cca from '../../assets/logo_cca.png';

const Header = ({ selectedCategory, onSectionClick, onBackToLanding }) => {
  return (
    <AppBar position="static" elevation={1} sx={{mb:2}}>
      <Toolbar
        sx={{
          bgcolor: 'lightblue',
        //   color: '#fff',
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
                onClick={() => onSectionClick('home')}
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
                onClick={() => onSectionClick('components')}
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
                onClick={onBackToLanding}
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
  );
};

export default Header;
