import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';

const componentLabels = {
  ECU: "Engine Control Unit",
  HCU: "Headlight Control Unit",
};

const fakeECUList = ["ECU Certificate"];
const fakeHCUList = ["HCU Certificate"];

const RevocationList = ({
  onClose,
  revokedList,
  onAddToCRL,
  onRemoveFromCRL,
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);

  const toggleComponentSelection = (component) => {
    setSelectedComponents((prev) =>
      prev.includes(component)
        ? prev.filter((c) => c !== component)
        : [...prev, component]
    );
  };

  const handleAddComponents = () => {
    if (selectedComponents.length === 0) return;
    onAddToCRL(selectedComponents);
    alert(`${selectedComponents.join(" & ")} added to CRL`);
    setSelectedComponents([]);
    setShowAddDialog(false);
  };

  const handleRemoveComponent = (component) => {
    onRemoveFromCRL(component);
    alert(`${component} removed from CRL`);
  };

  return (
    <Box mt={3}>
      <Paper sx={{ p: 2, position: 'relative' }}>
        <IconButton
          aria-label="crl-dialog-title"
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography fontWeight="bold">Revocation List</Typography>

        {!revokedList.ECU && !revokedList.HCU && (
          <Typography color="text.secondary" mt={2}>
            List is empty
          </Typography>
        )}

        {/* HCU Revoked Section */}
        {revokedList.HCU && (
          <Box
            sx={{
              border: "1px solid #ccc",
              mt: 2,
              p: 1,
              position: "relative",
            }}
          >
            <Typography variant="h6" component="div">
              Head Light unit
              <Button
                variant='outlined'
                onClick={() => handleRemoveComponent("HCU")}
                sx={{ position: "absolute", right: 8, top: 8, fontWeight: 700 }}
              >
                Remove
                <CloseIcon fontSize="small" />
              </Button>
            </Typography>
            <List dense>
              {fakeHCUList.map((item) => (
                <ListItem key={item}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* ECU Revoked Section */}
        {revokedList.ECU && (
          <Box
            sx={{
              border: "1px solid #ccc",
              mt: 2,
              p: 1,
              position: "relative",
            }}
          >
            <Typography variant="h6" component="div">
              Engine control unit
              <Button
                variant='outlined'
                onClick={() => handleRemoveComponent("ECU")}
                sx={{ position: "absolute", right: 8, top: 8, fontWeight: 700 }}
              >
                Remove
                <CloseIcon fontSize="small" />
              </Button>
            </Typography>
            <List dense>
              {fakeECUList.map((item) => (
                <ListItem key={item}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Add to List button */}
        <Box mt={2} textAlign="center">
          <Button variant="contained" onClick={() => setShowAddDialog(true)}>
            <AddIcon /> Add to List
          </Button>
        </Box>
      </Paper>

      {/* Add to List Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} aria-labelledby="crl-dialog-title2">
        <DialogTitle id="crl-dialog-title2">Add to Revocation List</DialogTitle>
        <DialogContent>
          <Typography variant="h6" mb={2}>
            Select components to be added to revocation list
          </Typography>
          <Stack spacing={1} sx={{ fontWeight: 700 }}>
            {["HCU"].map((comp) => (
              <Box key={comp}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedComponents.includes(comp)}
                    onChange={() => toggleComponentSelection(comp)}
                    disabled={revokedList[comp]}
                  />
                  {" " + componentLabels[comp]}
                  {revokedList[comp] && " (Already in list)"}
                </label>
              </Box>
            ))}
          </Stack>
          <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleAddComponents}>
              Add
            </Button>
            <Button variant="outlined" color="error" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RevocationList;
