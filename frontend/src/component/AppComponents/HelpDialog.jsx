import { Box, Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { TouchApp, Security, CheckCircle, Cancel, Help, Close, DirectionsCar, Memory, Speed, Lightbulb } from '@mui/icons-material';

const HelpDialog = ({ open, onClose }) => {
  const componentButtons = [
    { name: 'In-Vehicle Server', icon: <Memory sx={{ fontSize: 18 }} />, desc: 'Central communication hub' },
    { name: 'Light Control Unit', icon: <Lightbulb sx={{ fontSize: 18 }} />, desc: 'Headlight & lighting system' },
    { name: 'Instrument Cluster', icon: <Speed sx={{ fontSize: 18 }} />, desc: 'Dashboard display unit' },
    { name: 'Indicators', icon: <DirectionsCar sx={{ fontSize: 18 }} />, desc: 'Turn signal controls' },
  ];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          background: 'linear-gradient(90deg, #7393B3, #5a7a9a)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Help />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Help & Instructions
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose}
          sx={{ color: '#fff' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        {/* Component Buttons Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)',
            p: 2.5,
            borderBottom: '1px solid #fde047',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <DirectionsCar sx={{ color: '#ca8a04', fontSize: 24 }} />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 700, 
                color: '#0f172a',
              }}
            >
              Vehicle Components
            </Typography>
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 1.5 }}>
            {componentButtons.map((comp) => (
              <Box 
                key={comp.name}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  bgcolor: '#F0FFFF',
                  border: '1px solid #94a3b8',
                  borderRadius: 2,
                  px: 1.5,
                  py: 1,
                }}
              >
                <Box sx={{ color: '#0891b2' }}>{comp.icon}</Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#334155', fontWeight: 600, display: 'block', lineHeight: 1.2 }}>
                    {comp.name}
                  </Typography>
                  {/* <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.65rem' }}>
                    {comp.desc}
                  </Typography> */}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 0 }}>
          {/* Left Side - Steps */}
          <Box
            sx={{
              flex: 1,
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              p: 2.5,
              borderRight: { sm: '1px solid #e2e8f0' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TouchApp sx={{ color: '#0891b2', fontSize: 24 }} />
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#0f172a',
                }}
              >
                Steps to Follow
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box 
                  sx={{ 
                    minWidth: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    bgcolor: '#0891b2', 
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  1
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5 }}>
                  <strong>Click on "In-Vehicle Server"</strong> button on the diagram
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box 
                  sx={{ 
                    minWidth: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    bgcolor: '#0891b2', 
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  2
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5 }}>
                  <strong>View certificate</strong> details and information
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box 
                  sx={{ 
                    minWidth: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    bgcolor: '#0891b2', 
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  3
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5 }}>
                  <strong>Click "Validate"</strong> to verify the certificate chain
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box 
                  sx={{ 
                    minWidth: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    bgcolor: '#0891b2', 
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  4
                </Box>
                  <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5 }}>
                  <strong>Click on other components</strong> to view their details
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Side - Status Legend */}
          <Box
            sx={{
              flex: 1,
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              p: 2.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Security sx={{ color: '#16a34a', fontSize: 24 }} />
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#0f172a',
                }}
              >
                Status Indicators
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ color: '#22c55e', fontSize: 24 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                    Valid & Trusted
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Certificate verified successfully
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Cancel sx={{ color: '#ef4444', fontSize: 24 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                    Invalid / Revoked
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Validation failed or revoked
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Revocation List Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
            p: 2.5,
            borderTop: '1px solid #fca5a5',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Cancel sx={{ color: '#dc2626', fontSize: 24 }} />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 700, 
                color: '#0f172a',
              }}
            >
              Add to Revocation List
            </Typography>
          </Box>
          
          <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
            Use the <strong>"Add to Revocation List"</strong> button to simulate revoking a certificate. 
            Once revoked, the component will show <Cancel sx={{ color: '#ef4444', fontSize: 16, verticalAlign: 'middle', mx: 0.5 }} /> 
            status and validation will fail. This demonstrates how PKI handles compromised or expired certificates.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
