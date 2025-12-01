import { Box, Grid, Paper, Typography, Chip } from "@mui/material";

const ProtocolCenterPanel = ({ vehicle }) => {
  return (
    <Grid item xs={12} md={7} className="image-grid" sx={{ display: 'flex' }}>
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
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(90deg, #483248)',
            py: 1.5,
            px: 2,
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{ color: '#fff', fontWeight: '700', letterSpacing: 0.5 }}
          >
            Vehicle Communication Protocols
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, bgcolor: '#fff' }}>
          <img src={vehicle} alt="Vehicle View" className="vehicle-image" style={{ maxHeight: '100%', width: '100%', objectFit: 'contain' }} />
        </Box>
        <Box sx={{ py: 1.5, px: 2, bgcolor: '#fafafa', borderTop: '1px solid #eee' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {['CAN', 'CAN FD', 'FlexRay', 'LIN', 'Ethernet', 'MOST'].map((protocol) => (
              <Chip
                key={protocol}
                label={protocol}
                size="small"
                sx={{
                  bgcolor: '#e3f2fd',
                  color: '#1565c0',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProtocolCenterPanel;
