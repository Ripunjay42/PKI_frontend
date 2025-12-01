import { Grid, Box } from '@mui/material';

const ComponentDetail = ({ children }) => {
  return (
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
      <Box style={{ width: '100%', maxWidth: '700px' }}>
        <Box
          p={{ xs: 1, md: 1 }}
          sx={{
            bgcolor: '#ffffff',
            borderRadius: '16px',
            // boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            // border: '1px solid rgba(255,255,255,0.8)',
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
            {children}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ComponentDetail;
