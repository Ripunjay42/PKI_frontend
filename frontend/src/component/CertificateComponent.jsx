// src/component/CertificateComponent.jsx
import React, { useState } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Stack,
} from '@mui/material';

const CertificateComponent = ({ title, componentKey, listItems, onValidationResult }) => {
  const [revoked, setRevoked] = useState(false);
  const [validated, setValidated] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  const handleRevoke = () => {
    setRevoked(true);
    setValidated(false);
    setTimestamp('');
  };

  const handleValidate = () => {
    
    const isValid = !revoked;
    setValidated(true);
    setTimestamp(new Date().toLocaleString());

    // Send result to parent
    if (onValidationResult) {
      onValidationResult(title, isValid);
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <List dense>
        {listItems.map((item, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Stack direction="row" spacing={2} mt={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleRevoke}
        >
          Revoke
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleValidate}
        >
          Validate
        </Button>
      </Stack>
      {validated && (
        <Typography variant="body2" mt={2} color={revoked ? 'error' : 'green'}>
          {revoked ? 'Validation Failed ❌' : 'Validation Successful ✅'} <br />
          Timestamp: {timestamp}
        </Typography>
      )}
    </Paper>
  );
};

export default CertificateComponent;
