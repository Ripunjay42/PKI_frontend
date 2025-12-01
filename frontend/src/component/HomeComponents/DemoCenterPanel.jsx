import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import tvs_logo from "../../assets/tvs_logo.png";

const DemoCenterPanel = ({ sunboardbike, setSelectedCategory }) => {
  return (
    <Grid item xs={12}  className="image-grid" sx={{ display: 'flex' }}>
      <Paper
        elevation={4}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          height: '85vh',
          mt: -2,
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
            PKI Security Demonstration Board
          </Typography>
        </Box>
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            p: 2, 
            bgcolor: '#fff',
            position: 'relative',
            '&:hover .explore-button': {
              opacity: 1,
            }
          }}
        >
          <img
            src={sunboardbike}
            alt="View"
            className="bike-image"
            style={{
              cursor: 'pointer',
              maxHeight: '100%',
              width: '100%',
              objectFit: 'contain',
            }}
            onClick={() => setSelectedCategory("components")}
          />
          <Button
            className="explore-button"
            variant="contained"
            size="large"
            sx={{
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: '#7393B3',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              px: 3,
              py: 1.5,
              opacity: 0,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                bgcolor: '#4a6fa5',
                transform: 'translateX(-50%) scale(1.05)',
              },
              zIndex: 10,
            }}
            onClick={() => setSelectedCategory("components")}
          >
            Explore Components →
          </Button>
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
  );
};

export default DemoCenterPanel;
