import { useState, useEffect, useCallback, useRef } from 'react';
import mqtt from 'mqtt';

// Singleton MQTT client to persist connection across component remounts
let globalMqttClient = null;
let globalIsConnected = false;

const useMqttConnection = (onValidationResponse) => {
  const [client, setClient] = useState(globalMqttClient);
  const [isConnected, setIsConnected] = useState(globalIsConnected);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const onValidationResponseRef = useRef(onValidationResponse);

  // Keep the callback ref updated
  useEffect(() => {
    onValidationResponseRef.current = onValidationResponse;
  }, [onValidationResponse]);

  const publishMessage = useCallback((topic, msg = '') => {
    if (globalMqttClient && globalIsConnected) {
      globalMqttClient.publish(topic, msg, { retain: true });
      console.log(`Published to "${topic}" → "${msg}"`);
    } else {
      console.warn('MQTT client not connected');
    }
  }, []);

  useEffect(() => {
    // If already connected, just update local state and return
    if (globalMqttClient && globalIsConnected) {
      setClient(globalMqttClient);
      setIsConnected(true);
      console.log('Using existing MQTT connection');
      return;
    }

    // Only create new connection if not already connected
    if (!globalMqttClient) {
      const mqttClient = mqtt.connect('ws://192.168.137.249:8080/mqtt', {
        clientId: 'react_mqtt_pub_' + Math.random().toString(16).slice(2, 10),
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 1000,
      });

      mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker');
        globalIsConnected = true;
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

        if (topic === "PKI/WEB" && onValidationResponseRef.current) {
          try {
            const response = JSON.parse(message.toString());
            onValidationResponseRef.current(response);
          } catch (err) {
            console.error("Failed to parse PKI/WEB message", err);
          }
        }
      });

      mqttClient.on('error', (err) => {
        console.error('MQTT error:', err);
      });

      mqttClient.on('close', () => {
        console.log('MQTT connection closed');
        globalIsConnected = false;
        setIsConnected(false);
      });

      mqttClient.on('reconnect', () => {
        console.log('MQTT reconnecting...');
      });

      globalMqttClient = mqttClient;
      setClient(mqttClient);
    }

    // Don't disconnect on cleanup - keep connection persistent
    return () => {
      // Intentionally not disconnecting to persist the connection
      console.log('Component unmounted, keeping MQTT connection alive');
    };
  }, []); // Empty dependency array - only run once

  // CRL operations
  const addECUtoCRL = useCallback(() => {
    publishMessage('PKI/CRL/ECU', 'ADD CRL');
  }, [publishMessage]);

  const addHCUtoCRL = useCallback(() => {
    publishMessage('PKI/CRL/HCU', 'ADD CRL');
  }, [publishMessage]);

  const revokeECUfromCRL = useCallback(() => {
    publishMessage('PKI/CRL/ECU', 'REVOKE CRL');
  }, [publishMessage]);

  const revokeHCUfromCRL = useCallback(() => {
    publishMessage('PKI/CRL/HCU', 'REVOKE CRL');
  }, [publishMessage]);

  // Validation operations
  const validateHCU = useCallback(() => {
    publishMessage('PKI/Verification/HCU', 'SENDCRT1');
  }, [publishMessage]);

  const validateECU = useCallback(() => {
    publishMessage('PKI/Verification/ECU', 'SENDCRT2');
  }, [publishMessage]);

  // Reset operation
  const resetPKI = useCallback(() => {
    publishMessage('PKI/Reset', 'RESET');
  }, [publishMessage]);

  return {
    client,
    isConnected,
    receivedMessages,
    publishMessage,
    addECUtoCRL,
    addHCUtoCRL,
    revokeECUfromCRL,
    revokeHCUfromCRL,
    validateHCU,
    validateECU,
    resetPKI,
  };
};

export default useMqttConnection;
