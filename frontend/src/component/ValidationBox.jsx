import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const ValidationBox = ({
  onClose,
  onValidateHCU,
  onValidateECU,
  hcuValidationResult,
  ecuValidationResult,
  hcuTimestamps,
  ecuTimestamps,
  showECU = false,
}) => {
  return (
    <Box mt={2}>
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
          position: 'relative',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" fontWeight="bold" gutterBottom textAlign="center" color="primary">
          Validation
        </Typography>

        <Grid container justifyContent="center" spacing={4}>
          {/* HCU Validation */}
          <Grid
            item
            xs={12}
            sm={showECU ? 6 : 12}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              backgroundColor: '#f9f9f9',
              p: 3,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Typography variant="subtitle1" fontWeight={700} color="primary.dark" gutterBottom>
              HCU Certificate
            </Typography>

            <Stack direction="row" spacing={2} mt={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={onValidateHCU}
                sx={{ fontWeight: 600 }}
              >
                Validate
              </Button>
            </Stack>

            <Box mt={2}>
              <Typography variant="subtitle2" fontWeight={600}>
                Timestamp History:
              </Typography>

              {hcuTimestamps.length === 0 && (
                <Typography color="success.main" fontWeight="600">
                  No timestamps yet
                </Typography>
              )}

              {hcuTimestamps.map(({ time, status }, index) => (
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

              {hcuValidationResult !== null && (
                <Typography
                  mt={1}
                  color={hcuValidationResult ? "green" : "red"}
                  fontWeight={600}
                  fontSize="14px"
                >
                  Result: {hcuValidationResult ? "✅ Valid" : "❌ Invalid"}
                </Typography>
              )}
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
                  sx={{ fontWeight: 600 }}
                >
                  Validate
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
