import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const RevocationList = ({
  revokedList,
  onAddToCRL,
  onRemoveFromCRL,
}) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const handleAddLCU = () => {
    if (revokedList?.LCU) return;
    setOpenAddDialog(true);
  };

  const handleConfirmAdd = () => {
    onAddToCRL(["LCU"]);
    setOpenAddDialog(false);
  };

  const handleRemoveLCU = () => {
    if (!revokedList?.LCU) return;
    setOpenRemoveDialog(true);
  };

  const handleConfirmRemove = () => {
    onRemoveFromCRL("LCU");
    setOpenRemoveDialog(false);
  };

  return (
    <Box>
      <Paper 
        elevation={1}
        sx={{ 
          p: 2, 
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        }}
      >

        <Typography 
          variant="h6" 
          fontWeight={700} 
          color="primary.dark"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Revoke LCU Certificate
        </Typography>

        {/* LCU Status and Actions */}
        <Box
          sx={{
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} color="text.secondary" sx={{ mb: 1.5 }}>
            Light Control Unit
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon fontSize="small" />}
              onClick={handleAddLCU}
              disabled={!!revokedList?.LCU}
              fullWidth
              sx={{
                background: 'linear-gradient(135deg, #00838F 0%, #00ACC1 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '11px',
                textTransform: 'none',
                px: 1,
                py: 1,
                '&:hover': {
                  background: 'linear-gradient(135deg, #006872 0%, #0097a7 100%)',
                },
                '&:disabled': {
                  background: '#e0e0e0',
                }
              }}
            >
              Add to CRL
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<CloseIcon fontSize="small" />}
              onClick={handleRemoveLCU}
              disabled={!revokedList?.LCU}
              fullWidth
              sx={{
                background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '11px',
                textTransform: 'none',
                px: 1,
                py: 1,
                '&:hover': {
                  background: 'linear-gradient(135deg, #c62828 0%, #e53935 100%)',
                },
                '&:disabled': {
                  background: '#e0e0e0',
                }
              }}
            >
              Remove from CRL
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Add to CRL Confirmation Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: 320,
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: 'primary.dark' }}>
          Add to CRL
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to add the Light Control Unit certificate to the Certificate Revocation List?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={() => setOpenAddDialog(false)}
            variant="outlined"
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            No
          </Button>
          <Button 
            onClick={handleConfirmAdd}
            variant="contained"
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #00838F 0%, #00ACC1 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #006872 0%, #0097a7 100%)',
              }
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove from CRL Confirmation Dialog */}
      <Dialog
        open={openRemoveDialog}
        onClose={() => setOpenRemoveDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: 320,
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: 'primary.dark' }}>
          Remove from CRL
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove the Light Control Unit certificate from the Certificate Revocation List?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={() => setOpenRemoveDialog(false)}
            variant="outlined"
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            No
          </Button>
          <Button 
            onClick={handleConfirmRemove}
            variant="contained"
            color="error"
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RevocationList;
