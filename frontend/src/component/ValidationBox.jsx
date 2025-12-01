import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';

const ValidationBox = ({
  onClose,
  onValidateHCU,
  onValidateECU,
  hcuValidationResult,
  ecuValidationResult,
  hcuTimestamps,
  ecuTimestamps,
  showECU = false,
  onGoToLiveDemo,
  isHcuValidating = false,
  isEcuValidating = false,
  onResetHCU,
  onResetECU,
}) => {
  return (
    <Box mt={3}>
      <Paper
        elevation={1}
        sx={{
          p: { xs: 1, sm: 3 },
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          border: '1px solid #e0e0e0',
          position: 'relative',
          width: '70%',
          margin: '0 auto',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
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
          gutterBottom 
          textAlign="center" 
          color="primary.dark"
        >
          LCU Certificate Validation
        </Typography>

        <Grid container justifyContent="center" spacing={3}>
          {/* HCU Validation */}
          <Grid
            item
            xs={12}
            sm={showECU ? 6 : 12}
          >
            <Box
              sx={{
                // border: '2px solid #e0e0e0',
                // borderRadius: 2,
                // backgroundColor: '#fafafa',
                // p: 3,
                // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease',
              }}
            >
              {/* <Typography variant="subtitle1" fontWeight={700} color="primary.dark" gutterBottom>
                LCU Certificate
              </Typography> */}

              <Stack direction="row" spacing={2} mt={2}>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={onValidateHCU}
                  disabled={isHcuValidating}
                  sx={{ 
                    fontWeight: 600,
                    minWidth: 120,
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #00838F)',
                    boxShadow: '0 3px 10px rgba(0, 131, 143, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #006872)',
                    },
                    '&:disabled': {
                      background: '#e0e0e0',
                    }
                  }}
                >
                  {isHcuValidating ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    'Validate'
                  )}
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={onResetHCU}
                                    disabled={isHcuValidating}
                  startIcon={<RefreshIcon />}
                  sx={{ 
                    fontWeight: 600,
                    textTransform: 'none',
                    borderColor: '#ccc',
                    color: 'text.secondary',
                    '&:hover': {
                      borderColor: '#999',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    '&:disabled': {
                      borderColor: '#e0e0e0',
                      color: '#bdbdbd',
                    }
                  }}
                >
                  Reset
                </Button>
              </Stack>

              <Box mt={3}>
                <Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={1}>
                  Validation History:
                </Typography>

                {hcuTimestamps.length === 0 && (
                  <Box 
                    sx={{ 
                      textAlign: 'center', 
                      py: 2,
                      backgroundColor: '#f0f0f0',
                      borderRadius: 1,
                      border: '1px dashed #ccc'
                    }}
                  >
                    <Typography color="text.secondary" fontWeight={500} fontSize="14px">
                      No validation history yet
                    </Typography>
                  </Box>
                )}

                {hcuTimestamps.map(({ time, status }, index) => (
                  <Stack 
                    key={index} 
                    direction="row" 
                    alignItems="center" 
                    spacing={1.5} 
                    mt={1}
                    sx={{
                      p: 1.5,
                      backgroundColor: status === "valid" ? '#e8f5e9' : '#ffebee',
                      borderRadius: 1,
                      border: `1px solid ${status === "valid" ? '#c8e6c9' : '#ffcdd2'}`,
                    }}
                  >
                    {status === "valid" ? (
                      <CheckIcon color="success" fontSize="small" />
                    ) : (
                      <CloseOutlinedIcon color="error" fontSize="small" />
                    )}
                    <Typography variant="body2" color="text.primary" fontWeight={500}>
                      {time}
                    </Typography>
                  </Stack>
                ))}

                {hcuValidationResult !== null && (
                  <Box
                    mt={2}
                    p={2}
                    sx={{
                      backgroundColor: hcuValidationResult ? '#e8f5e9' : '#ffebee',
                      borderRadius: 2,
                      border: `2px solid ${hcuValidationResult ? '#4caf50' : '#f44336'}`,
                    }}
                  >
                    <Typography
                      color={hcuValidationResult ? "#2e7d32" : "#c62828"}
                      fontWeight={700}
                      fontSize="15px"
                      textAlign="center"
                    >
                      Result: {hcuValidationResult ? "✓ Valid Certificate" : "✗ Invalid Certificate"}
                    </Typography>
                  </Box>
                )}

                {/* Go to Live Demo button - only show when validation is successful */}
                {hcuValidationResult === true && onGoToLiveDemo && (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={onGoToLiveDemo}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: '15px',
                      textTransform: 'none',
                      background: 'linear-gradient(135deg, #00838F 0%, #00ACC1 100%)',
                      boxShadow: '0 4px 12px rgba(0, 131, 143, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #006872 0%, #0097a7 100%)',
                        boxShadow: '0 6px 16px rgba(0, 131, 143, 0.4)',
                      }
                    }}
                  >
                    Go to Dashboard →
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>

          {/* ECU Validation (conditionally rendered) */}
          {showECU && (
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                p: 3,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} color="primary.dark" gutterBottom>
                ECU Certificate
              </Typography>

              <Stack direction="row" spacing={2} mt={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={onValidateECU}
                  disabled={isEcuValidating}
                  sx={{ fontWeight: 600, minWidth: 100 }}
                >
                  {isEcuValidating ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    'Validate'
                  )}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={onResetECU}
                  color="secondary"
                  startIcon={<RefreshIcon />}
                  sx={{ fontWeight: 600 }}
                >
                  Reset
                </Button>
              </Stack>

              <Box mt={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Timestamp History:
                </Typography>

                {ecuTimestamps.length === 0 && (
                  <Typography color="success.main" fontWeight="600">
                    No timestamps yet
                  </Typography>
                )}

                {ecuTimestamps.map(({ time, status }, index) => (
                  <Stack key={index} direction="row" alignItems="center" spacing={1} mt={0.5}>
                    {status === "valid" ? (
                      <CheckIcon color="success" fontSize="small" />
                    ) : (
                      <CloseOutlinedIcon color="error" fontSize="small" />
                    )}
                    <Typography variant="body2" color="text.secondary">
                      {time}
                    </Typography>
                  </Stack>
                ))}

                {ecuValidationResult !== null && (
                  <Typography
                    mt={1}
                    color={ecuValidationResult ? "green" : "red"}
                    fontWeight={600}
                    fontSize="14px"
                  >
                    Result: {ecuValidationResult ? "✅ Valid" : "❌ Invalid"}
                  </Typography>
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ValidationBox;
