import {
  Box,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { useState, useCallback, useRef } from 'react';
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
      deviceName: "Light Control Unit",
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

const InVehicleServer = ({ 
  onValidationResult, 
  onGoToLiveDemo,
  onResetValidation,
  ecuTimestamps,
  setEcuTimestamps,
  hcuTimestamps,
  setHcuTimestamps,
  revokedList,
  setRevokedList,
  ecuValidationResult,
  setEcuValidationResult,
  hcuValidationResult,
  setHcuValidationResult,
}) => {
  // UI State
  const [showCertificateHcu, setShowCertificateHcu] = useState(false);
  const [showRevokeBox, setShowRevokeBox] = useState(false);
  const [showValidationBox, setShowValidationBox] = useState(false);

  // Loading states for validation
  const [isHcuValidating, setIsHcuValidating] = useState(false);
  const [isEcuValidating, setIsEcuValidating] = useState(false);
  
  // Timeout refs to clear on response
  const hcuTimeoutRef = useRef(null);
  const ecuTimeoutRef = useRef(null);
  
  // Refs to track if validation is pending (to prevent duplicate processing)
  const isHcuPendingRef = useRef(false);
  const isEcuPendingRef = useRef(false);

  // Handle MQTT validation response
  const handleValidationResponse = useCallback((response) => {
    console.log("Received validation response:", response);
    
    const { deviceName, Verify } = response;
    // Handle different formats: Verify could be boolean, string "true"/"false", or 0/1
    const isValid = Verify === true || Verify === "true" || Verify === 1 || Verify === "1";
    
    console.log("Device:", deviceName, "IsValid:", isValid, "Raw Verify:", Verify);

    if (deviceName === "Engine Control Unit") {
      // Only process if validation is pending
      if (!isEcuPendingRef.current) {
        console.log("ECU validation not pending, ignoring duplicate response");
        return;
      }
      isEcuPendingRef.current = false;
      
      // Clear timeout if response received
      if (ecuTimeoutRef.current) {
        clearTimeout(ecuTimeoutRef.current);
        ecuTimeoutRef.current = null;
      }
      setIsEcuValidating(false);
      setEcuValidationResult(isValid);
      setEcuTimestamps(prev => [...prev, {
        time: new Date().toLocaleString(),
        status: isValid ? "valid" : "invalid"
      }]);
      onValidationResult?.("Engine Control Unit", isValid);
    }

    if (deviceName === "Headlight Control Unit" || deviceName === "Light Control Unit" || deviceName === "LCU") {
      // Only process if validation is pending
      if (!isHcuPendingRef.current) {
        console.log("HCU/LCU validation not pending, ignoring duplicate response");
        return;
      }
      isHcuPendingRef.current = false;
      
      // Clear timeout if response received
      if (hcuTimeoutRef.current) {
        clearTimeout(hcuTimeoutRef.current);
        hcuTimeoutRef.current = null;
      }
      setIsHcuValidating(false);
      setHcuValidationResult(isValid);
      setHcuTimestamps(prev => [...prev, {
        time: new Date().toLocaleString(),
        status: isValid ? "valid" : "invalid"
      }]);
      onValidationResult?.("Headlight Unit", isValid);
    }
  }, [onValidationResult, setEcuValidationResult, setEcuTimestamps, setHcuValidationResult, setHcuTimestamps]);

  // MQTT Hook
  const {
    addECUtoCRL,
    addHCUtoCRL,
    revokeECUfromCRL,
    revokeHCUfromCRL,
    validateHCU,
    validateECU,
    resetPKI,
  } = useMqttConnection(handleValidationResponse);

  // Certificate Data
  const certData = getCertificateData();

  // Toggle certificate visibility
  const toggleCertificate = () => {
    setShowCertificateHcu(prev => !prev);
  };

  // CRL Handlers
  const handleAddToCRL = (components) => {
    components.forEach(comp => {
      setRevokedList(prev => ({ ...prev, [comp]: true }));
      if (comp === "LCU") {
        addHCUtoCRL(); // Uses HCU MQTT topic for LCU
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
    if (component === "LCU") {
      revokeHCUfromCRL(); // Uses HCU MQTT topic for LCU
      setHcuValidationResult(null);
    }
    if (component === "ECU") {
      revokeECUfromCRL();
      setEcuValidationResult(null);
    }
  };

  // Validation Handlers
  const handleValidateHCU = () => {
    setIsHcuValidating(true);
    isHcuPendingRef.current = true; // Mark as pending
    validateHCU();
    setHcuValidationResult(null);
    
    // Clear any existing timeout
    if (hcuTimeoutRef.current) {
      clearTimeout(hcuTimeoutRef.current);
    }
    
    // Timeout to stop loading after 10 seconds if no response
    hcuTimeoutRef.current = setTimeout(() => {
      setIsHcuValidating(false);
      isHcuPendingRef.current = false; // Clear pending on timeout
      hcuTimeoutRef.current = null;
    }, 10000);
  };

  const handleValidateECU = () => {
    setIsEcuValidating(true);
    isEcuPendingRef.current = true; // Mark as pending
    validateECU();
    setEcuValidationResult(null);
    
    // Clear any existing timeout
    if (ecuTimeoutRef.current) {
      clearTimeout(ecuTimeoutRef.current);
    }
    
    // Timeout to stop loading after 10 seconds if no response
    ecuTimeoutRef.current = setTimeout(() => {
      setIsEcuValidating(false);
      isEcuPendingRef.current = false; // Clear pending on timeout
      ecuTimeoutRef.current = null;
    }, 10000);
  };

  // Reset Handlers
  const handleResetHCU = () => {
    setHcuTimestamps([]);
    setHcuValidationResult(null);
    setRevokedList({ ECU: false, LCU: false });
    onResetValidation?.();
    resetPKI();
  };

  const handleResetECU = () => {
    setEcuTimestamps([]);
    setEcuValidationResult(null);
    setRevokedList({ ECU: false, LCU: false });
    onResetValidation?.();
    resetPKI();
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 1, sm: 1 }, overflow: 'visible' }}>
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

      {/* Connected Device Certificate - Expandable */}
      <Box mt={3}>
        <Button
          variant="contained"
          fullWidth
          onClick={toggleCertificate}
          endIcon={<ArrowDropDownIcon sx={{ transform: showCertificateHcu ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />}
          sx={{
            background: 'linear-gradient(135deg, #00838F)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '15px',
            borderRadius: 3,
            boxShadow: '0 4px 15px rgba(0, 131, 143, 0.3)',
            py: 1.5,
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, #006872 0%, #0097a7 100%)',
              boxShadow: '0 6px 20px rgba(0, 131, 143, 0.4)',
            }
          }}
        >
          Light Control Unit Certificate
        </Button>

        {/* Certificate Preview - Expandable */}
        {showCertificateHcu && (
          <Box mt={2}>
            <CertificatePreview
              device={certData.HCU}
              title="Light Control Unit certificate"
              onClose={toggleCertificate}
            />
          </Box>
        )}
      </Box>

      {/* Operations Buttons */}
      <Grid container spacing={2} justifyContent="center" mt={3}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setShowRevokeBox(prev => !prev);
              setShowValidationBox(false);
            }}
            sx={{
              background: 'linear-gradient(135deg, #00838F)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              borderRadius: 3,
              boxShadow: '0 4px 15px rgba(0, 131, 143, 0.3)',
              py: 1.5,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #006872 0%, #0097a7 100%)',
                boxShadow: '0 6px 20px rgba(0, 131, 143, 0.4)',
              }
            }}
          >
            Revoke LCU Certificate
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setShowValidationBox(prev => !prev);
              setShowRevokeBox(false);
            }}
            sx={{
              background: 'linear-gradient(135deg, #00838F)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              borderRadius: 3,
              boxShadow: '0 4px 15px rgba(0, 131, 143, 0.3)',
              py: 1.5,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #006872 0%, #0097a7 100%)',
                boxShadow: '0 6px 20px rgba(0, 131, 143, 0.4)',
              }
            }}
          >
            LCU Certificate Validation
          </Button>
        </Grid>
      </Grid>

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
          onGoToLiveDemo={onGoToLiveDemo}
          isHcuValidating={isHcuValidating}
          isEcuValidating={isEcuValidating}
          onResetHCU={handleResetHCU}
          onResetECU={handleResetECU}
        />
      )}
    </Container>
  );
};

export default InVehicleServer;
