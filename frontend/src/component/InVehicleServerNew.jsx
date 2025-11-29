import {
  Box,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { useState, useCallback } from 'react';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import './Mqttcontent.css';

// Components
import FunctionalitySection from './FunctionalitySection';
import SpecificationSection from './SpecificationSection';
import TrustedRootSection from './TrustedRootSection';
import CertificatePreview from './CertificatePreview';
import RevocationList from './RevocationList';
import ValidationBox from './ValidationBox';

// Custom Hook
import useMqttConnection from './useMqttConnection';

// Static Data
const Ivsdata = {
  title: "InVehicle Server",
  function: [
    "Verifies vehicle-specific digital certificates (device, ECU, software).",
    "Adds certificates from trusted authorities and revokes certificates using Certificate Revocation Lists.",
    "Verifies incoming signed certificates for authenticity.",
    "Maintains Certificate Trust Lists (CTLs) to define which certificates or issuers are trusted.",
  ],
  spec: {
    "1] Microcontroller": [
      "Processor: Broadcom BCM2711",
      "Quad-core Cortex-A72 (ARM v8) 64-bit SoC",
      "Clock speed: 1.5 GHz",
      "RAM options: 2 GB, 4 GB, or 8 GB LPDDR4-3200 SDRAM",
      "Power: 5V/3A via USB-C",
    ],
    "2] Transceiver IC": [
      "Voltage: Operates at 5V",
      "Data Rate: Up to 1 Mbps",
      "Function: Converts TTL CAN signals to differential signals for CAN bus",
    ],
  },
  trusted: {
    "General Info": [
      "Under the Controller of Certifying Authorities (CCA), eMudhra is an approved Certifying Authority in India. This demonstrate has test certificate issued by eumdhra"
    ],
    "Licensed CA as per CCA": [
      "eMudhra is a licensed Certifying Authority (CA) under India's IT Act, providing digital signature certificates, SSL/TLS certificates, device certificates, multifactor authentication, and comprehensive identity and access management solutions."
    ]
  }
};

// Certificate Data
const getCertificateData = () => {
  const timeDate = new Date().toLocaleDateString('en-US');
  const times = new Date().toLocaleTimeString('en-US');
  const dateTime = `${timeDate} ${times}`;

  return {
    HCU: {
      id: 1002,
      deviceName: "Headlight Control Unit",
      Verify: true,
      certName: "emudhra_dev_crt.cer",
      rootCA: "eMudhra Ltd",
      interCA: "eMudhra Ltd",
      timestamp: dateTime,
      organisationto: "TVSSS",
      organisationby: "CDAC Bangalore",
      organisationUnit: "Automotive",
      issuedOn: "Nov 27 12:36:54 2024 GMT",
      expiresOn: "Nov 27 18:29:59 2026 GMT"
    },
    ECU: {
      id: 1001,
      deviceName: "Engine Control Unit",
      Verify: true,
      certName: "emudhra_dev_crt.cer",
      rootCA: "eMudhra Ltd",
      interCA: "eMudhra Ltd",
      timestamp: dateTime,
      organisationto: "TVSSS",
      organisationby: "CDAC Bangalore",
      organisationUnit: "Automotive",
      issuedOn: "Nov 27 12:36:54 2024 GMT",
      expiresOn: "Nov 27 18:29:59 2026 GMT"
    },
  };
};

const InVehicleServer = ({ onValidationResult }) => {
  // UI State
  const [showData, setShowData] = useState(false);
  const [showOperation, setShowOperation] = useState(false);
  const [showCertificateEcu, setShowCertificateEcu] = useState(false);
  const [showCertificateHcu, setShowCertificateHcu] = useState(false);
  const [showRevokeBox, setShowRevokeBox] = useState(false);
  const [showValidationBox, setShowValidationBox] = useState(false);

  // Revocation State
  const [revokedList, setRevokedList] = useState({ ECU: false, HCU: false });

  // Validation State
  const [ecuValidationResult, setEcuValidationResult] = useState(null);
  const [hcuValidationResult, setHcuValidationResult] = useState(null);
  const [ecuTimestamps, setEcuTimestamps] = useState([]);
  const [hcuTimestamps, setHcuTimestamps] = useState([]);

  // Handle MQTT validation response
  const handleValidationResponse = useCallback((response) => {
    const { deviceName, Verify } = response;
    const isValid = !!Verify;

    if (deviceName === "Engine Control Unit") {
      setEcuValidationResult(isValid);
      setEcuTimestamps(prev => [...prev, {
        time: new Date().toLocaleString(),
        status: isValid ? "valid" : "invalid"
      }]);
      onValidationResult?.("Engine Control Unit", isValid);
    }

    if (deviceName === "Headlight Control Unit") {
      setHcuValidationResult(isValid);
      setHcuTimestamps(prev => [...prev, {
        time: new Date().toLocaleString(),
        status: isValid ? "valid" : "invalid"
      }]);
      onValidationResult?.("Headlight Unit", isValid);
    }
  }, [onValidationResult]);

  // MQTT Hook
  const {
    addECUtoCRL,
    addHCUtoCRL,
    revokeECUfromCRL,
    revokeHCUfromCRL,
    validateHCU,
    validateECU,
  } = useMqttConnection(handleValidationResponse);

  // Certificate Data
  const certData = getCertificateData();

  // Reset all panels
  const resetPanels = () => {
    setShowCertificateHcu(false);
    setShowCertificateEcu(false);
    setShowRevokeBox(false);
    setShowValidationBox(false);
  };

  // Handle Connected Devices toggle
  const handleConnectedDevicesClick = () => {
    setShowData(prev => !prev);
    setShowOperation(false);
    resetPanels();
  };

  // Handle Operations toggle
  const handleOperationsClick = () => {
    setShowOperation(prev => !prev);
    setShowData(false);
    resetPanels();
  };

  // CRL Handlers
  const handleAddToCRL = (components) => {
    components.forEach(comp => {
      setRevokedList(prev => ({ ...prev, [comp]: true }));
      if (comp === "HCU") {
        addHCUtoCRL();
        setHcuValidationResult(null);
      }
      if (comp === "ECU") {
        addECUtoCRL();
        setEcuValidationResult(null);
      }
    });
  };

  const handleRemoveFromCRL = (component) => {
    setRevokedList(prev => ({ ...prev, [component]: false }));
    if (component === "HCU") {
      revokeHCUfromCRL();
      setHcuValidationResult(null);
    }
    if (component === "ECU") {
      revokeECUfromCRL();
      setEcuValidationResult(null);
    }
  };

  // Validation Handlers
  const handleValidateHCU = () => {
    validateHCU();
    setHcuValidationResult(null);
  };

  const handleValidateECU = () => {
    validateECU();
    setEcuValidationResult(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 1, sm: 2 }, overflow: 'visible' }}>
      {/* Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="#1565c0"
          textAlign="center"
          sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
        >
          {Ivsdata.title}
        </Typography>
      </Box>

      {/* Info Sections */}
      <FunctionalitySection data={Ivsdata.function} />
      <SpecificationSection data={Ivsdata.spec} />
      <TrustedRootSection data={Ivsdata.trusted} />

      {/* Main Buttons */}
      <Grid container spacing={2} justifyContent="center" mt={3}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            endIcon={<ArrowDropDownIcon />}
            onClick={handleConnectedDevicesClick}
            sx={{
              background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              borderRadius: 3,
              boxShadow: '0 4px 15px rgba(106, 27, 154, 0.3)',
              py: 1.5,
            }}
          >
            Connected Devices
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            endIcon={<ArrowDropDownIcon />}
            onClick={handleOperationsClick}
            sx={{
              background: 'linear-gradient(135deg, #00838F 0%, #00ACC1 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              borderRadius: 3,
              boxShadow: '0 4px 15px rgba(0, 131, 143, 0.3)',
              py: 1.5,
            }}
          >
            Operations
          </Button>
        </Grid>
      </Grid>

      {/* Operations Sub-buttons */}
      {showOperation && (
        <Grid container spacing={2} justifyContent="center" mt={2}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setShowRevokeBox(true);
                setShowValidationBox(false);
              }}
              sx={{
                background: 'linear-gradient(135deg, #9c4370 0%, #c2185b 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '14px',
                borderRadius: 3,
                boxShadow: '0 3px 12px rgba(156, 67, 112, 0.3)',
                py: 1.2,
              }}
            >
              Certificate Revocation List
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setShowValidationBox(true);
                setShowRevokeBox(false);
              }}
              sx={{
                background: 'linear-gradient(135deg, #388e3c 0%, #4caf50 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '14px',
                borderRadius: 3,
                boxShadow: '0 3px 12px rgba(56, 142, 60, 0.3)',
                py: 1.2,
              }}
            >
              Validation
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Connected Devices Sub-buttons */}
      {showData && (
        <Grid container spacing={2} justifyContent="center" mt={2}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setShowCertificateHcu(true);
                setShowCertificateEcu(false);
              }}
              sx={{
                background: 'linear-gradient(135deg, #0D9276 0%, #26a69a 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '15px',
                borderRadius: 3,
                boxShadow: '0 4px 15px rgba(13, 146, 118, 0.3)',
                py: 1.2,
              }}
            >
              HeadLight Unit Certificate
            </Button>
          </Grid>
        </Grid>
      )}

      {/* ECU Certificate Preview */}
      {showCertificateEcu && (
        <CertificatePreview
          device={certData.ECU}
          title="Engine Control Unit certificate"
          onClose={() => setShowCertificateEcu(false)}
        />
      )}

      {/* HCU Certificate Preview */}
      {showCertificateHcu && (
        <CertificatePreview
          device={certData.HCU}
          title="HeadLight Unit certificate"
          onClose={() => setShowCertificateHcu(false)}
        />
      )}

      {/* Revocation List */}
      {showRevokeBox && (
        <RevocationList
          onClose={() => setShowRevokeBox(false)}
          revokedList={revokedList}
          onAddToCRL={handleAddToCRL}
          onRemoveFromCRL={handleRemoveFromCRL}
        />
      )}

      {/* Validation Box */}
      {showValidationBox && (
        <ValidationBox
          onClose={() => setShowValidationBox(false)}
          onValidateHCU={handleValidateHCU}
          onValidateECU={handleValidateECU}
          hcuValidationResult={hcuValidationResult}
          ecuValidationResult={ecuValidationResult}
          hcuTimestamps={hcuTimestamps}
          ecuTimestamps={ecuTimestamps}
          showECU={false}
        />
      )}
    </Container>
  );
};

export default InVehicleServer;
