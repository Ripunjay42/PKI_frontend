import { Box, Typography } from "@mui/material";

const SectionContent = ({ activeSection, demoLeftPanel, demoCenterPanel, demoRightPanel, protocolLeftPanel, protocolCenterPanel, protocolRightPanel, pkiSection, vehicleSection }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: "95vw", mx: "auto", py: 3 }}>
      {/* Demonstration Section */}
      {activeSection === 'demo' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2.5fr 7fr 2.5fr' }, gap: 3, alignItems: 'stretch' }}>
          {demoLeftPanel}
          {demoCenterPanel}
          {demoRightPanel}
        </Box>
      )}

      {/* Protocol Section */}
      {activeSection === 'protocols' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2.5fr 7fr 2.5fr' }, gap: 3, alignItems: 'stretch' }}>
          {protocolLeftPanel}
          {protocolCenterPanel}
          {protocolRightPanel}
        </Box>
      )}

      {/* PKI Section */}
      {activeSection === 'pki' && pkiSection}

      {/* Vehicle Section */}
      {activeSection === 'vehicle' && vehicleSection}
    </Box>
  );
};

export default SectionContent;
