import { Box, Grid, Paper, Typography, List, ListItem, ListItemText } from "@mui/material";
import { FaCheckCircle, FaShieldAlt, FaCertificate, FaNetworkWired, FaBolt, FaLock } from 'react-icons/fa';
import { MdSpeed, MdSecurity, MdVerifiedUser, MdSettingsInputComponent } from 'react-icons/md';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { BiChip } from 'react-icons/bi';

const InfoPanel = ({ title, icon: Icon, iconSize = 24, items, footerText, footerBorderColor = '#1976d2' }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        flex: 1,
        p: 2.5,
        borderRadius: 3,
        bgcolor: '#fff',
        border: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Typography 
        variant="h6" 
        fontWeight={700} 
        gutterBottom 
        sx={{ mb: 2, color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Icon size={iconSize} /> {title}
      </Typography>
      <List dense sx={{ '& .MuiTypography-root': { fontSize: '0.9rem', lineHeight: 1.6, color: '#333' } }}>
        {items.map((item, idx) => (
          <ListItem key={idx} sx={{ py: 0.5, alignItems: 'flex-start' }}>
            {item.icon ? (
              <>
                {item.icon}
                <ListItemText primary={item.text} />
              </>
            ) : (
              <ListItemText primary={item} />
            )}
          </ListItem>
        ))}
      </List>
      {footerText && (
        <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 2, borderLeft: `4px solid ${footerBorderColor}` }}>
          <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#555' }}>
            {footerText}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default InfoPanel;
