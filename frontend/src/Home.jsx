import { Box } from "@mui/material";
import vehicle from "./assets/vehicle.png";
import sunboardbike from "./assets/auto1.png";
import { useState } from 'react';
import './index.css';

// Component imports
import SectionNavigation from "./component/HomeComponents/SectionNavigation";
import SectionContent from "./component/HomeComponents/SectionContent";
import InfoPanel from "./component/HomeComponents/InfoPanel";
import DemoCenterPanel from "./component/HomeComponents/DemoCenterPanel";
import ProtocolCenterPanel from "./component/HomeComponents/ProtocolCenterPanel";
import PKISection from "./component/HomeComponents/PKISection";
import VehicleSection from "./component/HomeComponents/VehicleSection";

// Data imports
import { 
  pkiData, 
  vehicleData, 
  demoLeftPanelItems, 
  demoRightPanelItems,
  protocolLeftPanelItems,
  protocolRightPanelItems 
} from "./component/HomeComponents/homeData";

// Icons
import { FaCheckCircle, FaShieldAlt, FaCertificate, FaNetworkWired, FaBolt, FaLock } from 'react-icons/fa';
import { MdSpeed, MdSecurity, MdVerifiedUser, MdSettingsInputComponent } from 'react-icons/md';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { BiChip } from 'react-icons/bi';

const Home = ({setSelectedCategory }) => {
  const [activeSection, setActiveSection] = useState('demo');

  // Demo Left Panel
  const demoLeftPanel = (
    <InfoPanel
      title="Interactive Demo"
      icon={MdSettingsInputComponent}
      items={[
        <Box key="1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FaCheckCircle size={16} style={{ color: '#4caf50' }} />
          Real-time PKI showcase
        </Box>,
        <Box key="2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FaCertificate size={16} style={{ color: '#2196f3' }} />
          Live certificate validation
        </Box>,
        <Box key="3" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MdVerifiedUser size={16} style={{ color: '#ff9800' }} />
          LCU authentication workflow
        </Box>,
        <Box key="4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FaShieldAlt size={16} style={{ color: '#9c27b0' }} />
          Secure communication testing
        </Box>,
        <Box key="5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BiChip size={16} style={{ color: '#f44336' }} />
          Interactive component exploration
        </Box>,
      ]}
      footerText="Click the board to explore components"
      footerBorderColor="#7393B3"
    />
  );

  // Demo Center Panel
  const demoCenterPanel = (
    <DemoCenterPanel sunboardbike={sunboardbike} setSelectedCategory={setSelectedCategory} />
  );

  // Demo Right Panel
  const demoRightPanel = (
    <Box sx={{ display: 'flex' }}>
      <InfoPanel
        title="Key Features"
        icon={FaLock}
        items={demoRightPanelItems.map((feature, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <MdSecurity size={18} style={{ color: feature.color, marginTop: 2 }} />
            <Box>
              <Box sx={{ fontWeight: 600, color: '#333' }}>{feature.title}</Box>
              <Box sx={{ fontSize: '0.8rem', color: '#666' }}>{feature.description}</Box>
            </Box>
          </Box>
        ))}
        footerText="Industry Standards: CAN, CAN FD, FlexRay"
        footerBorderColor="#4caf50"
      />
    </Box>
  );

  // Protocol Left Panel
  const protocolLeftPanel = (
    <Box sx={{ display: 'flex' }}>
      <InfoPanel
        title="Protocol Overview"
        icon={FaNetworkWired}
        items={protocolLeftPanelItems.map((protocol, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <FaNetworkWired size={16} style={{ color: protocol.color, marginTop: 4 }} />
            <Box>
              <Box sx={{ fontWeight: 600, color: '#333' }}>{protocol.title}</Box>
              <Box sx={{ fontSize: '0.75rem', color: '#666' }}>{protocol.description}</Box>
            </Box>
          </Box>
        ))}
        footerText="📡 Protocol-specific requirements"
        footerBorderColor="#2196f3"
      />
    </Box>
  );

  // Protocol Center Panel
  const protocolCenterPanel = (
    <ProtocolCenterPanel vehicle={vehicle} />
  );

  // Protocol Right Panel
  const protocolRightPanel = (
    <Box sx={{ display: 'flex' }}>
      <InfoPanel
        title="Protocol Benefits"
        icon={FaBolt}
        items={protocolRightPanelItems.map((benefit, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IoMdCheckmarkCircle size={16} style={{ color: '#4caf50' }} />
            {benefit}
          </Box>
        ))}
        footerText="Standards Compliance: ISO 11898, ISO 17458, IEEE 802.3"
        footerBorderColor="#ff9800"
      />
    </Box>
  );

  // PKI Section
  const pkiSection = (
    <PKISection pkiData={pkiData} />
  );

  // Vehicle Section
  const vehicleSection = (
    <VehicleSection vehicleData={vehicleData} />
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <SectionNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <SectionContent
        activeSection={activeSection}
        demoLeftPanel={<Box sx={{ display: 'flex' }}>{demoLeftPanel}</Box>}
        demoCenterPanel={demoCenterPanel}
        demoRightPanel={demoRightPanel}
        protocolLeftPanel={protocolLeftPanel}
        protocolCenterPanel={protocolCenterPanel}
        protocolRightPanel={protocolRightPanel}
        pkiSection={pkiSection}
        vehicleSection={vehicleSection}
      />
    </Box>
  );
};

export default Home;

