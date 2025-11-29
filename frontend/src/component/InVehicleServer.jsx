import {
  Box,
  Button,
  Typography,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItem,
  ListItemText,
  Divider,
  List,
  Paper,
  Dialog,
  DialogContent,
  DialogContentText, DialogTitle, DialogActions,
  Grid,
  Container,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from '@mui/icons-material/Check';
import './Mqttcontent.css';
import tvs_logo from '../assets/tvs_logo.png';
import cdac_logo from '../assets/cdac_logo.png';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddIcon from '@mui/icons-material/Add';
import FunctionalitySection from './FunctionalitySection';
import SpecificationSection from './SpecificationSection';
import TrustedRootSection from './TrustedRootSection';






const InVehicleServer = ({ onValidationResult }) => {

  //MQTT code begin

  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [crlAction, setCrlAction] = useState('add');
  const [crlList, setCrlList] = useState({ ECU1: false, ECU2: false });
  const [receivedMessages, setReceivedMessages] = useState([]);
   /* =============== STATE ADD BY LOKESH =================== */
     
    const [pendingValidation, setPendingValidation] = useState(null);

    /* ======================================================= */


  const publishMessage = (topic, msg = '') => {
    if (client && isConnected) {
      client.publish(topic, msg, { retain: true });
      console.log(`Published to "${topic}" → "${msg}"`);
    } else {
      console.warn('MQTT client not connected');
    }
  };

  useEffect(() => {
    //const mqttClient = mqtt.connect('ws://192.168.137.73:8080/mqtt', {
      const mqttClient = mqtt.connect('wss://169.254.210.100:5173/mqtt', {
      clientId: 'react_mqtt_pub_' + Math.random().toString(16).slice(2, 10),
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });
    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      setIsConnected(true);

      mqttClient.subscribe([
        'PKI/WEB',
        'PKI/RQ/ECU_STATUS',
        'PKI/RQ/HLU_STATUS',
      ], (err) => {
        if (err) console.error('Subscription error:', err);
        else console.log('Subscribed to subscriber topics');
      });
    });
    mqttClient.on('message', (topic, message) => {
      const msgStr = message.toString();
      setReceivedMessages(prev => [...prev, { topic, message: msgStr }]);
      console.log(`Received on ${topic}: ${msgStr}`);

      if (topic === 'PKI/RQ/ECU_STATUS') {
        mqttClient.publish('PKI/RS/ECU_STATUS', 'true', { retain: true });
        console.log(`Published to "PKI/RS/ECU_STATUS" → "true"`);
      }
      if (topic === 'PKI/RQ/HLU_STATUS') {
        mqttClient.publish('PKI/RS/HLU_STATUS', 'true', { retain: true });
        console.log(`Published to "PKI/RS/HLU_STATUS" → "true"`);
      }

      /* ================= CODE BY LOKESH ==================== */

      if (topic === "PKI/WEB") {
      try {
        const response = JSON.parse(message.toString());
        const { deviceName, Verify, timestamp } = response;

        const isValid = !!Verify; // Convert to boolean

        if (deviceName === "Engine Control Unit") {
          setEcuValidationResult(isValid);
          setEcuTimestamps(prev => [...prev, {
            time: new Date().toLocaleString(),
            status: isValid ? "valid" : "invalid"
          }]);
        }

        if (deviceName === "Headlight Control Unit") {
          setHcuValidationResult(isValid);
          setHcuTimestamps(prev => [...prev, {
            time: new Date().toLocaleString(),
            status: isValid ? "valid" : "invalid"
          }]);
        }

        setPendingValidation(null); // Clear flag
      } catch (err) {
        console.error("Failed to parse PKI/WEB message", err);
      }
    }

      /* ===================================================== */


    });
    mqttClient.on('error', (err) => {
      console.error('MQTT error:', err);
      mqttClient.end();
    });

    setClient(mqttClient);
    return () => {
      mqttClient.end();
      console.log('MQTT client disconnected');
    };
  }, []);

  const handleAddCrl = () => {
    document.activeElement?.blur();
    setCrlAction('add');
    //setOpenDialog(true);
  };

  const handleRevokeCrl = () => {
    document.activeElement?.blur();
    setCrlAction('revoke');
    setOpenDialog(true);
  };

  const addECUtoCRL = () => {
    const topic = `PKI/CRL/ECU`;
    publishMessage(topic, 'ADD CRL');
  }

  const addHCUtoCRL = () => {
    const topic = `PKI/CRL/HCU`;
    publishMessage(topic, 'ADD CRL');
  }

  const revokeECUfromCRL = () => {
    const topic = `PKI/CRL/ECU`;
    publishMessage(topic, 'REVOKE CRL');
  }

  const revokeHCUfromCRL = () => {
    const topic = `PKI/CRL/HCU`;
    publishMessage(topic, 'REVOKE CRL');
  }


  const handleEcuSelect = (ecu) => {
    const topic = `PKI/CRL/${ecu}`;
    if (crlAction === 'add') {
      if (!crlList[ecu]) {
        setCrlList(prev => ({ ...prev, [ecu]: true }));
        publishMessage(topic, 'ADD CRL');
      } else {
        console.warn(`Certificate for ${ecu} is already added.`);
      }
    } else if (crlAction === 'revoke') {
      if (crlList[ecu]) {
        setCrlList(prev => ({ ...prev, [ecu]: false }));
        publishMessage(topic, 'REVOKE CRL');
      } else {
        console.warn(`Cannot revoke — Certificate for ${ecu} not added.`);
      }
    }
    setOpenDialog(false);
  };

  const handleVerifyCert = (ecu) => {
    const topic = `PKI/Verification/${ecu}`;
    const msg = ecu === 'ECU1' ? 'SENDCRT1' : 'SENDCRT2';
    publishMessage(topic, msg);
  };
  //MQTT code end




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
        " eMudhra is a licensed Certifying Authority (CA) under India’s IT Act, providing digital signature certificates, SSL/TLS certificates, device certificates, multifactor authentication, and comprehensive identity and access management solutions."

      ]
    }
  };
  // Initialize state with fake data
  const timeDate = new Date().toLocaleDateString('en-US');
  const times = new Date().toLocaleTimeString('en-US');
  const dateTime = `${timeDate} ${times}`;
  /*const fakedata = {
    1001: [{
      id: 1001,
      deviceName: "Infotainment System",
      Verify: true,
      certName: "IS.cert",
      rootCA: "rootCA",
      interCA: "intermediateCA",
      timestamp: dateTime,
      organisationto: "TVSS",
      organisationby: "CDAC Bangalore",
      organisationUnit: "Automotive",
      issuedOn: "August 22, 2024 at 06:52:00 PM",
      expiresOn: "August 22, 2025 at 06:51:00 PM"
    },
    ],
    1002: [
      {
        id: 1002,
        deviceName: "Instrument Cluster",
        Verify: true,
        certName: "IC.cert",
        rootCA: "rootCA",
        interCA: "intermediateCA",
        timestamp: dateTime,
        organisationto: "TVSS",
        organisationby: "CDAC Bangalore",
        organisationUnit: "Automotive",
        issuedOn: "Sept 03, 2024 at 06:52:00 PM",
        expiresOn: "Sept 25, 2025 at 06:51:00 PM"
      },
    ],
  };
  */


  /* ====================================================================================================================*/
const fakedata = {
1002: [{
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
],
1001: [
{
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
],
};

  const [dialogData, setDialogData] = useState(null);
  const handleDeviceClick = (item) => {
    setDialogData(item);
  };

  const closeDialog = () => {
    setDialogData(null);
  };
  function Str_Random(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Loop to generate characters for the specified length
    for (let i = 0; i < length; i++) {
      const randomInd = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomInd);
    }
    return result;
  }
  const [showData, setShowData] = useState(false);
  const [showEcu, setShowEcu] = useState(false);
  const [showRcu, setShowRcu] = useState(false);

  // const [ecuStatus, setEcuStatus] = useState("");
  const [ecuValidation, setEcuValidation] = useState(null);

  const [rcuStatus, setRcuStatus] = useState("");
  const [rcuValidation, setRcuValidation] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [showCertificateEcu, setShowCertificateEcu] = useState(false);
  const [showCertificateHcu, setShowCertificateHcu] = useState(false);

  const showPopup = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
    setTimeout(() => setOpenDialog(false), 2000);
  };

  const handleClickEcu = () => setShowCertificateEcu(true);
  const handleClickHcu = () => setShowCertificateHcu(true);
  // States for operation menu
  const [showOperation, setShowOperation] = useState(false);

  // States for Revoke box and list
  const [showRevokeBox, setShowRevokeBox] = useState(false);
  const [revokedList, setRevokedList] = useState({ ECU: false, HCU: false });

  // States for Add to List dialog
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);

  // States for Remove to List dialog
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState([]);

  // Confirmation dialog when adding component
  const [confirmAddDialogOpen, setConfirmAddDialogOpen] = useState(false);
  const [componentToAdd, setComponentToAdd] = useState("");

  // Validation box and states
  const [showValidationBox, setShowValidationBox] = useState(false);

  // ECU/HCU certificate status
  const [ecuStatus, setEcuStatus] = useState("available");
  const [hcuStatus, setHcuStatus] = useState("available");


  // Validation result true/false or null for both
  const [ecuValidationResult, setEcuValidationResult] = useState(null);
  const [hcuValidationResult, setHcuValidationResult] = useState(null);

  // Timestamp history for ECU and HCU - array of {time, status}
  const [ecuTimestamps, setEcuTimestamps] = useState([]);
  const [hcuTimestamps, setHcuTimestamps] = useState([]);

  // Fake data for lists
  const fakeECUList = ["ECU Certificate"];
  const fakeHCUList = ["HCU Certificate"];

  // Checkbox handler for Add to List dialog
  const toggleComponentSelection = (component) => {
    setSelectedComponents((prev) =>
      prev.includes(component)
        ? prev.filter((c) => c !== component)
        : [...prev, component]
    );
  };

  // Open confirmation dialog for each selected component
  const openConfirmDialog = () => {
    if (selectedComponents.length === 0) return;
    setComponentToAdd(selectedComponents[0]);
    setConfirmAddDialogOpen(true);
  };

  // Confirm adding component to revoke list
const confirmAddComponent = () => {
  // ✅ Mark the component as revoked
  setRevokedList((prev) => ({
    ...prev,
    [componentToAdd]: true,
  }));

  const now = new Date().toLocaleString();

  // ✅ Update status and timestamp for ECU
  if (componentToAdd === "ECU") {
    setEcuStatus("added");
    setEcuValidationResult(null);
    setEcuTimestamps((prev) => [...prev, { time: now, status: "added" }]);
  }

  // ✅ Update status and timestamp for HCU
  if (componentToAdd === "HCU") {
    setHcuStatus("added");
    setHcuValidationResult(null);
    setHcuTimestamps((prev) => [...prev, { time: now, status: "added" }]);
  }

  // ✅ Remove from current selection
  setSelectedComponents((prev) =>
    prev.filter((c) => c !== componentToAdd)
  );

  // ✅ Reset current component and close dialog
  setComponentToAdd("");
  setConfirmAddDialogOpen(false);

  // ✅ Move to next component if available
  setTimeout(() => {
    const remaining = selectedComponents.filter((c) => c !== componentToAdd);
    if (remaining.length > 0) {
      setComponentToAdd(remaining[0]);
      setConfirmAddDialogOpen(true);
    } else {
      setShowAddDialog(false);
      setSelectedComponents([]);
    }
  }, 200);
};


  // Remove component from revoke list
const removeComponentFromList = (component) => {
  const now = new Date().toLocaleString();
  setRevokedList(prev => ({ ...prev, [component]: false }));

  if (component === "ECU") {
    setEcuStatus("removed");
    setEcuValidationResult(null);
    //setEcuTimestamps(prev => [...prev, { time: now, status: "revoke" }]);
  }

  if (component === "HCU") {
    setHcuStatus("removed");
    setHcuValidationResult(null);
    //setHcuTimestamps(prev => [...prev, { time: now, status: "revoke" }]);
  }
};

/*
  // Validate ECU or HCU: sets validation result based on current status
 const handleValidateAndVerify = (component) => {
  console.log("Clicked On Validate");
  const timestamp = new Date().toLocaleString();
  let isValid = false;

  if (component === "HCU") {
    publishMessage("PKI/Verification/HCU", "SENDCRT1");
    // isValid = hcuStatus === "removed";
    isValid = !revokedList[component]; // Valid if NOT revoked

    setHcuValidationResult(isValid);
    setHcuTimestamps(prev => [...prev, {
      time: timestamp,
      status: isValid ? "valid" : "invalid"
    }]);

    onValidationResult?.("Headlight Unit", isValid);
  }

  if (component === "ECU") {
    publishMessage("PKI/Verification/ECU", "SENDCRT2");
    // isValid = ecuStatus === "removed";
    isValid = !revokedList[component];

    setEcuValidationResult(isValid);
    setEcuTimestamps(prev => [...prev, {
      time: timestamp,
      status: isValid ? "valid" : "invalid"
    }]);

    onValidationResult?.("Engine Control Unit", isValid);
  }
};
*/

/*
const handleValidateAndVerify = (component) => {
  console.log("Clicked On Validate");
  const timestamp = new Date().toLocaleString();

  // Show a placeholder or spinner immediately (optional)
  if (component === "HCU") {
    publishMessage("PKI/Verification/HCU", "SENDCRT1");

    setHcuValidationResult(null); // Reset immediately
    setTimeout(() => {
      const isValid = !revokedList[component]; // Valid if NOT revoked
      setHcuValidationResult(isValid);
      setHcuTimestamps(prev => [...prev, {
        time: timestamp,
        status: isValid ? "valid" : "invalid"
      }]);

      onValidationResult?.("Headlight Unit", isValid);
    }, 2000); // 2-second delay
  }

  if (component === "ECU") {
    publishMessage("PKI/Verification/ECU", "SENDCRT2");

    setEcuValidationResult(null); // Reset immediately
    setTimeout(() => {
      const isValid = !revokedList[component];
      setEcuValidationResult(isValid);
      setEcuTimestamps(prev => [...prev, {
        time: timestamp,
        status: isValid ? "valid" : "invalid"
      }]);

      onValidationResult?.("Engine Control Unit", isValid);
    }, 2000); // 2-second delay
  }
};
*/

/* =========== CHANGES BY LOKESH ============== */
const handleValidateAndVerify = (component) => {
  console.log("Clicked On Validate");
  //const timestamp = new Date().toLocaleString();
  setPendingValidation(component); // ✅ Track which one is being validated

  // Send request to hardware
  if (component === "HCU") {
    publishMessage("PKI/Verification/HCU", "SENDCRT1");
    //setPendingValidation("HCU");
    setHcuValidationResult(null); // Reset
    //setHcuTimestamps(prev => [...prev, { time: timestamp, status: "waiting" }]);
  }

  if (component === "ECU") {
    publishMessage("PKI/Verification/ECU", "SENDCRT2");
    //setPendingValidation("ECU");
    setEcuValidationResult(null); // Reset
    //setEcuTimestamps(prev => [...prev, { time: timestamp, status: "waiting" }]);
  }
};

/* ============================================ */

// const handleValidateAndVerify = (component) => {
//   console.log("Clicked On Validate");
//   const timestamp = new Date().toLocaleString();

//   if (component === "HCU") {
//     publishMessage("PKI/Verification/HCU", "SENDCRT1");
//     setHcuValidationResult(null); // reset
//     setHcuResponseReceived(false); // wait for actual response
//     setHcuTimestamps(prev => [...prev, {
//       time: timestamp,
//       status: "waiting"
//     }]);
//   }

//   if (component === "ECU") {
//     publishMessage("PKI/Verification/ECU", "SENDCRT2");
//     setEcuValidationResult(null); // reset
//     setEcuResponseReceived(false); // wait for actual response
//     setEcuTimestamps(prev => [...prev, {
//       time: timestamp,
//       status: "waiting"
//     }]);
//   }
// };


  // handler for adding
  //  const handleAddCrl = () => {
  //     document.activeElement?.blur();
  //     setCrlAction('add');
  //     setOpenDialog(true);
  //   };
  // const validateComponent = (component) => {
  //   const timestamp = new Date().toLocaleString();
  //   const isValid = Math.random() > 0.5; 

  //   if (component === "ECU") {
  //     setEcuValidationResult(isValid);
  //      onValidationResult && onValidationResult("Engine Control Unit", isValid);
  //     setEcuTimestamps((prev) => [
  //       ...prev,
  //       { time: timestamp, status: isValid ? "valid" : "invalid" }
  //     ]);
  //   } else if (component === "HCU") {
  //     setHcuValidationResult(isValid);
  //     onValidationResult && onValidationResult("Headlight Unit", isValid);
  //     setHcuTimestamps((prev) => [
  //       ...prev,
  //       { time: timestamp, status: isValid ? "valid" : "invalid" }
  //     ]);
  //   }
  // };

  const componentLabels = {
    ECU: "Engine Control Unit",
    HCU: "Headlight Control Unit",
  };

  // Confirmation dialog for remove
  const [removeConfirmDialogOpen, setRemoveConfirmDialogOpen] = useState(false);
  const [componentToRemove, setComponentToRemove] = useState("");
  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h5"
        fontWeight={600}
        mb={3}
        color="primary"
        textAlign="center"
        sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
      >
        {Ivsdata.title}
      </Typography>
      <FunctionalitySection data={Ivsdata.function} />
      <SpecificationSection data={Ivsdata.spec} />
      <TrustedRootSection data={Ivsdata.trusted} />
      <Grid container spacing={3} justifyContent="center" mt={3}>
        {/* Connected Devices Button */}
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            onClick={() => {
              setShowData((prev) => !prev);
              setShowOperation(false);
            }}
            sx={{
              backgroundColor: '#6A1B9A', // Deep Purple
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: 2,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              py: 1.5,
              '&:hover': {
                backgroundColor: '#8849d4ff',
              },
              '&:active .front': {
                background: '#8849d4ff !important'
              }
            }}
          >
            Connected Devices
          </Button>
        </Grid>

        {/* Operations Button */}
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            onClick={() => {
              setShowOperation((prev) => !prev);
              setShowData(false);
            }}
            sx={{
              backgroundColor: '#00838F', // Teal Blue
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: 2,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              py: 1.5,
              '&:hover': {
                backgroundColor: '#006064',
              },
            }}
          >
            Operations
          </Button>
        </Grid>
      </Grid>

      {/* Certificate Revoke and Validation buttons inside Operation */}
      {showOperation && (
        <Grid container spacing={3} justifyContent="center" mt={3}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setShowRevokeBox(true);
                setShowValidationBox(false);
              }}
              sx={{
                backgroundColor: '#9c4370',
                color: '#fff',
                fontWeight: 600,
                fontSize: '15px',
                borderRadius: 2,
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.12)',
                py: 1,
                '&:hover': {
                  backgroundColor: '#7b355a',
                },
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
                backgroundColor: '#388e3c',
                color: '#fff',
                fontWeight: 600,
                fontSize: '15px',
                borderRadius: 2,
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.12)',
                py: 1,
                '&:hover': {
                  backgroundColor: '#2e7d32',
                },
              }}
            >
              Validation
            </Button>
          </Grid>
        </Grid>
      )}

      {showData && (
        <Grid container spacing={3} justifyContent="center" mt={3}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setShowCertificateEcu(true);
                setShowCertificateHcu(false);
              }}
              sx={{
                backgroundColor: '#0D9276',
                color: '#fff',
                fontWeight: 600,
                fontSize: '16px',
                borderRadius: 2,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#0B7D66',
                },
                py: 1,
              }}
            >
              Engine Control Unit Certificate
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setShowCertificateHcu(true);
                setShowCertificateEcu(false);
              }}
              sx={{
                backgroundColor: '#0D9276',
                color: '#fff',
                fontWeight: 600,
                fontSize: '16px',
                borderRadius: 2,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#0B7D66',
                },
                py: 1,
              }}
            >
              HeadLight Unit Certificate
            </Button>
          </Grid>
        </Grid>
      )}

      {/* ECU Certificate Section */}
      {showCertificateEcu && (
        <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 }, position: "relative", mt: 2 }}>
          <IconButton
            aria-label="close"
            onClick={() => setShowCertificateEcu(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography textAlign="center" fontWeight="bold" variant="h6" color='#d21919' >
            Certificate Preview
          </Typography>
          <Typography textAlign="center" mt={1} fontWeight="bold" variant="subtitle1" color='#71494cff'>
            Engine Control Unit certificate
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              px: { xs: 1, sm: 2, md: 5 },
              py: 2,
            }}
          >
            <Box
              className="dialog-box"
              sx={{
                width: '100%',
                maxWidth: 800, // control the max width of your content
              }}
            >
              {fakedata[1001].map((device, index) => (
                <Box key={index} sx={{ mb: 4 }}>
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
              ))}
            </Box>
          </Box>
        </Paper>
      )}

      {/* HCU Certificate Section */}
      {showCertificateHcu && (
        <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 }, position: "relative", mt: 2 }}>
          <IconButton
            aria-label="close"
            onClick={() => setShowCertificateHcu(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography textAlign="center" fontWeight="bold" variant="h6" color='#d21919'>
            Certificate Preview
          </Typography>
          <Typography textAlign="center" mt={1} fontWeight="bold" variant="subtitle1" color='#71494cff'>
            HeadLight Unit certificate
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              px: { xs: 1, sm: 2, md: 5 },
              py: 2,
            }}
          >
            <Box
              className="dialog-box"
              sx={{
                width: '100%',
                maxWidth: 800, // control the max width of your content
              }}
            >
              {fakedata[1002].map((device, index) => (
                <Box key={index} sx={{ mb: 4 }}>
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
              ))}
            </Box>
          </Box>
        </Paper>
      )}

      {/* Device Certificate Details */}
      {/* {dialogData && (
                <div className="dialog-overlay" >
                    <div className='dialog_back'>
                        <div className="dialog-box">
                            <h3>Device Certificate Details</h3>
                            <div className='cert_head'>
                                <p><strong>Issued To:</strong></p>
                            </div>
                            <div className='cert_head2'>
                                <p><strong>Common Name (CN):</strong> {dialogData.deviceName || 'pramani.cdac.in'}</p>
                                {dialogData.Verify ? <p> <strong>Organization (O):</strong> {dialogData.organisationto}<img src={tvs_logo} alt="TVS Logo" className='org1' /></p> : <p> <strong>Organization (O):</strong> {'XYZ'}</p>}
                                <p><strong>Organizational Unit (OU):</strong> {'IOT Security'}</p></div>
                            <div className='cert_head'>
                                <p><strong>Issued By:</strong></p>
                            </div>
                            <div className='cert_head2'>
                                <p><strong>Common Name (CN):</strong> {'Intermediate CA'}</p>
                                {dialogData.Verify ? <p> <strong>Organization (O):</strong> {dialogData.organisationby}<img src={cdac_logo} alt="C-DAC Logo" className="org1" /></p> : <p> <strong>Organization (O):</strong> {'ABC'}</p>}
                                {dialogData.Verify ? <p> <strong>Organization Unit (OU):</strong> {dialogData.organisationUnit}</p> : <p> <strong>Organization Unit (OU):</strong> {'DEF'}</p>}</div>
                            <div className='cert_head'>
                                <p><strong>Validity Period:</strong></p>
                            </div>
                            <div className='cert_head2'>
                                <p><strong>Issued On:</strong> {dialogData.issuedOn}</p>
                                <p><strong>Expires On:</strong> {dialogData.expiresOn}</p></div>
                            <div className='cert_head'>
                                <p><strong>SHA-256 Fingerprints:</strong></p>
                            </div>
                            <div className='cert_head2'>
                                <p><strong>Certificate:</strong> {Str_Random(64)}</p>
                                <p><strong>Public Key:</strong> {Str_Random(64)}</p></div>
                            <div className='cert_head'>
                                <p><strong>Certificate Path:</strong></p>
                            </div>
                            <div className='cert_head2'>
                                {dialogData.Verify ? <p><strong>Root CA:</strong> {'CCA'}</p> : <p><strong>Root CA:</strong> {'Outside CA'}</p>}
                                {dialogData.Verify ? <p><strong>Intermediate CA:</strong> {'cdac.blr'}</p> : <p><strong>Intermediate CA:</strong> {'Outside Intermediate CA'}</p>}
                                <p><strong>Device Certificate:</strong> {dialogData.certName}</p>
                            </div>
                            <button onClick={closeDialog}>Close</button>
                        </div>
                    </div>
                </div>
            )} */}

      {/* Dialog Popup
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogContent>
                    <DialogContentText>{dialogMessage}</DialogContentText>
                </DialogContent>
            </Dialog> */}
      {/* Revoke List Box */}
      {showRevokeBox && (
        <Box mt={3}>
          <Paper sx={{ p: 2, position: 'relative' }}>
            <IconButton
              aria-label="crl-dialog-title"
              onClick={() => setShowRevokeBox(false)}
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


            {/* If HCU is revoked, show header with remove button */}
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
                  {/* <Button
                                        variant='outlined'
                                        onClick={() => {
                                            setComponentToRemove("ECU");
                                            setRemoveConfirmDialogOpen(true);
                                        }}
                                        sx={{ position: "absolute", right: 8, top: 8, fontWeight: 700 }}
                                    > Revoke
                                        <CloseIcon fontSize="small" />
                                    </Button> */}
                  <Button
                    variant='outlined'
                    onClick={() => {
                      removeComponentFromList("HCU");
                      if (selectedComponents.includes("HCU")) revokeHCUfromCRL();
                      alert(`${selectedComponents.join(" & ")} removed from CRL`); // Immediate removal
                    }}
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

            {/* If HCU is revoked, show header with remove button */}
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
                  {/* <Button
                                        variant='outlined'
                                        onClick={() => {
                                            setComponentToRemove("HCU");
                                            setRemoveConfirmDialogOpen(true);
                                        }}
                                        sx={{ position: "absolute", right: 8, top: 8, fontWeight: 700, maxWidth: 600 }}
                                    > Revoke
                                        <CloseIcon fontSize="small" />
                                    </Button> */}
                  <Button
                    variant='outlined'
                    onClick={() => {
                      removeComponentFromList("ECU"); // Immediate removal
                      if (selectedComponents.includes("ECU")) revokeECUfromCRL();
                      alert(`${selectedComponents.join(" & ")} removed from CRL`);
                    }}
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
              <Button variant="contained" onClick={() => {
                setShowAddDialog(true);
                handleAddCrl;
              }}  >
                <AddIcon />   Add to List
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
      {/* Remove Dialog */}
      {removeConfirmDialogOpen && <Dialog
        open={removeConfirmDialogOpen}
        onClose={() => setRemoveConfirmDialogOpen(false)} aria-labelledby="crl-dialog-title1" aria-modal="true"
      >
        <DialogTitle id="crl-dialog-title1">
          {`Are you sure you want to revoke ${componentToRemove}?`}
        </DialogTitle>
        <DialogActions>
          <Button variant='outlined' onClick={() => setRemoveConfirmDialogOpen(false)} color="primary">
            No
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              removeComponentFromList(componentToRemove);
              setRemoveConfirmDialogOpen(false);
            }}
            color="error"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>}

      {/* Add to List Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} aria-labelledby="crl-dialog-title2">
        <DialogTitle id="crl-dialog-title2"></DialogTitle>
        <DialogContent>
          <Typography variant="h6" mb={2}>
            Select components to be added to revocation list
          </Typography>
          <Stack spacing={1} sx={{ fontWeight: 700 }}>
            {["ECU", "HCU"].map((comp) => (
              <Box key={comp}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedComponents.includes(comp)}
                    onChange={() => toggleComponentSelection(comp)}
                  />
                  {" " + componentLabels[comp]}
                </label>
              </Box>
            ))}
          </Stack>
          <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={() => {
                if (selectedComponents.length === 0) return;
                if (selectedComponents.includes("HCU")) addHCUtoCRL();
                if (selectedComponents.includes("ECU")) addECUtoCRL();


                alert(`${selectedComponents.join(" & ")} added to CRL`);

                // Optionally update state if needed to reflect revoked list:
                selectedComponents.forEach((comp) => {
                  setRevokedList((prev) => ({
                    ...prev,
                    [comp]: true,
                  }));
                });
                document.activeElement?.blur();
                setShowAddDialog(false);
              }}
            >
              Add
            </Button>

            <Button variant="outlined" color="error" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
          </Stack>

        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for adding each component */}
      {confirmAddDialogOpen && <Dialog
        open={confirmAddDialogOpen}
        onClose={() => setConfirmAddDialogOpen(false)}
        aria-labelledby="crl-dialog-title3" aria-modal="true"
      >
        <DialogTitle id="crl-dialog-title3">test</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to add <strong>{componentToAdd}</strong> to the
            revocation list?
          </Typography>
          <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
            <Button variant="contained" onClick={confirmAddComponent}>
              Yes
            </Button>
            <Button onClick={() => setConfirmAddDialogOpen(false)}>No</Button>
          </Stack>
        </DialogContent>
      </Dialog>}

      {/* Validation Box */}
      {showValidationBox && (
        <Box mt={2}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
              position: 'relative',
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => setShowValidationBox(false)}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" fontWeight="bold" gutterBottom textAlign="center" color="primary">
              Validation
            </Typography>

            <Grid container justifyContent="center" spacing={4}>
              {/* ECU Validation */}
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9',
                  p: 3,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
                }}
              >
                <Typography variant="subtitle1" fontWeight={700} color="primary.dark" gutterBottom>
                  HCU Certificate
                </Typography>

                <Stack direction="row" spacing={2} mt={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleValidateAndVerify("HCU")}
                    sx={{ fontWeight: 600 }}
                  >
                    Validate
                  </Button>
                </Stack>

                <Box mt={2}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Timestamp History:
                  </Typography>

                  {hcuTimestamps.length === 0 && (
                    <Typography color="success.main" fontWeight="600">
                      No timestamps yet
                        {/* Status: ✅ Valid */}
                    </Typography>

                  )}

                  {hcuTimestamps.map(({ time, status }, index) => (
                    <Stack key={index} direction="row" alignItems="center" spacing={1} mt={0.5}>
                      {status === "valid" ? (
                        <CheckIcon color="success" fontSize="small" />
                      ) : (
                        <CloseOutlinedIcon color="error" fontSize="small" />
                      )}
                      <Typography variant="body2" color="text.secondary">
                        {time}
                      </Typography>
                    </Stack>
                  ))}


                  {hcuValidationResult !== null && (
                    <Typography
                      mt={1}
                      color={hcuValidationResult ? "green" : "red"}
                      fontWeight={600}
                      fontSize="14px"
                    >
                      Result: {hcuValidationResult ? "✅ Valid" : "❌ Invalid"}
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* HCU Validation */}
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9',
                  p: 3,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
                }}
              >
                <Typography variant="subtitle1" fontWeight={700} color="primary.dark" gutterBottom>
                  ECU Certificate
                </Typography>

                <Stack direction="row" spacing={2} mt={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleValidateAndVerify("ECU")}
                    sx={{ fontWeight: 600 }}
                  >
                    Validate
                  </Button>
                </Stack>

                <Box mt={2}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Timestamp History:
                  </Typography>

                  {ecuTimestamps.length === 0 && (
                    <Typography color="success.main" fontWeight="600">
                      No timestamps yet
                      {/* Status: ✅ Valid */}
                    </Typography>
                  )}

                  {ecuTimestamps.map(({ time, status }, index) => (
                    <Stack key={index} direction="row" alignItems="center" spacing={1} mt={0.5}>
                      {status === "valid" ? (
                        <CheckIcon color="success" fontSize="small" />
                      ) : (
                        <CloseOutlinedIcon color="error" fontSize="small" />
                      )}
                      <Typography variant="body2" color="text.secondary">
                        {time}
                      </Typography>
                    </Stack>
                  ))}

                  {ecuValidationResult !== null && (
                    <Typography
                      mt={1}
                      color={ecuValidationResult ? "green" : "red"}
                      fontWeight={600}
                      fontSize="14px"
                    >
                      Result: {ecuValidationResult ? "✅ Valid" : "❌ Invalid"}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}

    </Container>
  );
};

export default InVehicleServer;
