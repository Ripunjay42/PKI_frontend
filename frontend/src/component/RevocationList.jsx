import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';

const RevocationList = ({
  onClose,
  revokedList,
  onAddToCRL,
  onRemoveFromCRL,
}) => {
  const handleAddLCU = () => {
    if (revokedList?.LCU) return;
    onAddToCRL(["LCU"]);
    alert("LCU added to CRL");
  };

  const handleRemoveLCU = () => {
    if (!revokedList?.LCU) return;
    onRemoveFromCRL("LCU");
    alert("LCU removed from CRL");
  };

  return (
    <Box mt={3}>
      <Paper 
        elevation={1}
        sx={{ 
          p: 2, 
          position: 'relative',
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          // border: '1px solid #e0e0e0',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ 
            position: "absolute", 
            top: 12, 
            right: 12,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography 
          variant="h6" 
          fontWeight={700} 
          color="primary.dark"
          gutterBottom
          sx={{ mb: 3 }}
        >
          Revoke LCU Certificate
        </Typography>

        {/* LCU Status and Actions */}
        <Box
          sx={{
            borderRadius: 2,
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" spacing={2}>
            <Box>
              <Typography variant="subtitle1" fontWeight={700} color="primary.dark" sx={{ whiteSpace: 'nowrap' }}>
                Light Control Unit
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                {/* <Typography variant="body2" color="text.secondary">Status:</Typography>
                <Chip 
                  size="small"
                  label={revokedList?.LCU ? 'Revoked' : 'Active'}
                  sx={{
                    fontWeight: 600,
                    color: revokedList?.LCU ? '#c62828' : '#2e7d32',
                    backgroundColor: revokedList?.LCU ? '#ffebee' : '#e8f5e9',
                    border: `1px solid ${revokedList?.LCU ? '#ffcdd2' : '#c8e6c9'}`,
                  }}
                /> */}
              </Stack>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} width={{ xs: '100%', sm: 'auto' }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon fontSize="small" />}
                onClick={handleAddLCU}
                disabled={!!revokedList?.LCU}
                sx={{
                  background: 'linear-gradient(135deg, #00838F 0%, #00ACC1 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '12px',
                  textTransform: 'none',
                  px: 1.5,
                  py: 0.75,
                  lineHeight: 1.3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #006872 0%, #0097a7 100%)',
                  },
                  '&:disabled': {
                    background: '#e0e0e0',
                  }
                }}
              >
                Add to<br />Revocation
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<CloseIcon fontSize="small" />}
                onClick={handleRemoveLCU}
                disabled={!revokedList?.LCU}
                sx={{
                  background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '12px',
                  textTransform: 'none',
                  px: 1.5,
                  py: 0.75,
                  lineHeight: 1.3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #c62828 0%, #e53935 100%)',
                  },
                  '&:disabled': {
                    background: '#e0e0e0',
                  }
                }}
              >
                Remove from<br />Revocation
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default RevocationList;
