export const pkiData = {
  title: "PKI in In-Vehicle Networks",
  overview: [
    "Ensures secure ECU communication using digital certificates.",
    "Authenticates ECUs and verifies message integrity via digital signatures.",
    "Prevents unauthorized access and data tampering.",
    "Certificates are issued/revoked by a Certificate Authority (CA).",
    "Certificate Trust Lists (CTLs) maintain a list of trusted entities.",
    "Enables secure Over-the-Air (OTA) updates.",
    "Forms the backbone of secure in-vehicle and V2X (Vehicle-to-Everything) communication.",
  ],
  benefits: {
    "1.Enhanced Security": ["Authenticates ECUs and ensures only trusted components communicate on the network."],
    "2.Data Integrity": ["Verifies that messages are not altered, preventing spoofing or tampering."],
    "3.Secure Updates": ["Enables safe over-the-air (OTA) firmware updates through digital signature verification."],
    "4.Scalable Trust Model": ["Allows centralized certificate management and easy revocation, making it suitable for large, complex vehicle systems."]
  },
  useCases: {
    "1.ECU Authentication": ["Ensures only trusted Electronic Control Units (ECUs) can participate in vehicle communication."],
    "2.Secure Boot and Firmware Updates": ["Verifies digital signatures of software/firmware before execution or OTA installation."],
    "3.Message Integrity Verification": ["Confirms that in-vehicle messages (e.g., speed, braking signals) are not tampered with."],
    "4.Access Control for Diagnostic Tools": ["Restricts diagnostic access to authorized tools with valid certificates."],
  },
};

export const vehicleData = {
  title: "Vehicle Communication Protocols",
  CAN1: [
    "Used widely in vehicles to allow different ECUs (like engine, brake, transmission) to communicate.",
    "It is reliable, cost-effective, and ideal for real-time control applications.",
    "Helps maintain smooth vehicle operation by exchanging control signals.",
  ],
  CAN: [
    "Used widely in vehicles to allow different ECUs (like engine, brake, transmission) to communicate.",
    "It is reliable, cost-effective, and ideal for real-time control applications.",
    "Helps maintain smooth vehicle operation by exchanging control signals.",
  ],
  CANFD: [
    "An improved version of CAN that can send more data at faster speeds.",
    "Useful in modern vehicles where advanced features need more bandwidth.",
    "Often used in ECUs that manage complex functions like ADAS (Advanced Driver Assistance Systems).",
  ],
  FlexRay: [
    "Designed for high-speed and highly reliable communication.",
    "Used in systems where timing is critical, like brake-by-wire or steering systems.",
    "Ensures consistent and predictable communication even in harsh conditions.",
  ],
  LIN: [
    "A simpler and cheaper network used for body electronics like door locks, mirrors, and windows.",
    "Works well when perfect timing and speed aren't needed.",
    "Often acts as a support system to more complex networks like CAN.",
  ],
  Auto: [
    "Provides fast communication for high-bandwidth needs like cameras, infotainment, or V2X.",
    "Becoming popular in new vehicles because it supports modern features like autonomous driving.",
    "Can connect many systems over one network, just like your home or office Ethernet.",
  ],
  MOST: [
    "Used mainly for in-car entertainment systems – audio, video, and navigation.",
    "Ensures smooth delivery of media without delays or interference.",
    "Good for high-quality multimedia transmission between devices in the car.",
  ]
};

export const demoLeftPanelItems = [
  { 
    icon: null, 
    text: "Real-time PKI showcase" 
  },
  { 
    icon: null, 
    text: "Live certificate validation" 
  },
  { 
    icon: null, 
    text: "ECU authentication workflow" 
  },
  { 
    icon: null, 
    text: "Secure communication testing" 
  },
  { 
    icon: null, 
    text: "Interactive component exploration" 
  },
];

export const demoRightPanelItems = [
  { 
    title: "In-Vehicle Server",
    description: "Central PKI management hub",
    color: "#1976d2"
  },
  { 
    title: "Light Control Unit",
    description: "Authenticated headlight system",
    color: "#ff9800"
  },
  { 
    title: "Certificate Validation",
    description: "Real-time trust verification",
    color: "#9c27b0"
  },
];

export const protocolLeftPanelItems = [
  { 
    title: "CAN Bus",
    description: "Industry standard for ECU communication",
    color: "#2196f3"
  },
  { 
    title: "FlexRay",
    description: "High-speed deterministic protocol",
    color: "#ff9800"
  },
  { 
    title: "Ethernet",
    description: "Advanced connectivity & bandwidth",
    color: "#4caf50"
  },
  { 
    title: "LIN Bus",
    description: "Cost-effective sub-network",
    color: "#9c27b0"
  },
];

export const protocolRightPanelItems = [
  "Real-time data transmission",
  "Fault-tolerant communication",
  "Deterministic message delivery",
  "Multi-node architecture",
  "Bandwidth optimization",
  "Safety-critical compliance",
];
