import { Box, Typography, Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import tvs_logo from '../assets/tvs_logo.png';
import cdac_logo from '../assets/cdac_logo.png';

// Helper function to generate random string
const Str_Random = (length) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    const randomInd = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomInd);
  }
  return result;
};

const CertificatePreview = ({ device, title, onClose }) => {
  return (
    <Paper elevation={2} sx={{ p: { xs: 1, sm: 1 }, position: "relative", mt: 2 }}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <Typography textAlign="center" fontWeight="bold" variant="h6" color='#d21919'>
        Certificate Preview
      </Typography>
      <Typography textAlign="center" mt={1} fontWeight="bold" variant="subtitle1" color='#71494cff'>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
        }}
      >
        <Box
          className="dialog-box"
          sx={{
            width: '100%',
            maxWidth: '100%',
          }}
        >
          <Box sx={{ mb: 4, p: -2 }}>
            <Typography variant="h6" align="center" gutterBottom fontWeight='bold'>
              Device Certificate Details
            </Typography>

            {/* Issued To */}
            <Box sx={{ mt: 2 }}>
              <Typography fontWeight="bold">Issued To:</Typography>
              <Typography variant="body2">
                <strong>Common Name (CN):</strong> {device.deviceName || 'pramani.cdac.in'}
              </Typography>
              <Typography variant="body2">
                <strong>Organization (O):</strong> {device.Verify ? device.organisationto : 'XYZ'}{" "}
                {device.Verify && <img src={tvs_logo} alt="TVS Logo" className='org1' />}
              </Typography>
              <Typography variant="body2">
                <strong>Organizational Unit (OU):</strong> IOT Security
              </Typography>
            </Box>

            {/* Issued By */}
            <Box sx={{ mt: 2 }}>
              <Typography fontWeight="bold">Issued By:</Typography>
              <Typography variant="body2">
                <strong>Common Name (CN):</strong> Intermediate CA
              </Typography>
              <Typography variant="body2">
                <strong>Organization (O):</strong> {device.Verify ? device.organisationby : 'ABC'}{" "}
                {device.Verify && <img src={cdac_logo} alt="C-DAC Logo" className='org1' />}
              </Typography>
              <Typography variant="body2">
                <strong>Organizational Unit (OU):</strong>{" "}
                {device.Verify ? device.organisationUnit : 'DEF'}
              </Typography>
            </Box>

            {/* Validity */}
            <Box sx={{ mt: 2 }}>
              <Typography fontWeight="bold">Validity Period:</Typography>
              <Typography variant="body2"><strong>Issued On:</strong> {device.issuedOn}</Typography>
              <Typography variant="body2"><strong>Expires On:</strong> {device.expiresOn}</Typography>
            </Box>

            {/* Fingerprints */}
            <Box sx={{ mt: 2 }}>
              <Typography fontWeight="bold">SHA-256 Fingerprints:</Typography>
              <Typography variant="body2"><strong>Certificate:</strong> {Str_Random(64)}</Typography>
              <Typography variant="body2"><strong>Public Key:</strong> {Str_Random(64)}</Typography>
            </Box>

            {/* Certificate Path */}
            <Box sx={{ mt: 2 }}>
              <Typography fontWeight="bold">Certificate Path:</Typography>
              <Typography variant="body2"><strong>Root CA:</strong> {device.Verify ? 'CCA' : 'Outside CA'}</Typography>
              <Typography variant="body2"><strong>Intermediate CA:</strong> {device.Verify ? 'cdac.blr' : 'Outside Intermediate CA'}</Typography>
              <Typography variant="body2"><strong>Device Certificate:</strong> {device.certName}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CertificatePreview;
