
# Krishi Flow -SmartFarm Monitoring system

A comprehensive IoT solution for agricultural monitoring that bridges ESP32 devices through MQTT and provides real-time data visualization through a modern web dashboard.

## 🌟 Features

### Real-time Monitoring
- **Multi-sensor Data Collection**: pH, soil moisture, temperature, humidity, and gas concentration
- **Live Dashboard**: Real-time charts and analytics with automatic updates
- **Section Management**: Monitor up to 4 different agricultural sections simultaneously
- **Soil-Based Crop Recommendation**: AI model that interprets soil data to determine crop suitability — optimized for tomato cultivation in this version.

### IoT Integration
- **MQTT Communication**: Seamless device-to-dashboard communication
- **Firebase Real-time Database**: Cloud-based data storage and synchronization
- **ESP32 Support**: Optimized for ESP32-based sensor nodes and control devices
- **Automated Controls**: Smart irrigation and robotic car coordination

### Modern Web Interface
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Charts**: 24-hour trend analysis with multiple data views
- **Real-time Status**: Live connection monitoring and system health indicators
- **Manual Override**: Direct control panel for manual system operations

## 🏗️ System Architecture

```
┌─────────────────┐    MQTT     ┌─────────────────┐    HTTP/WS    ┌─────────────────┐
│   ESP32 Sensors │ ──────────→ │   Node.js       │ ────────────→ │   React         │
│   (Irrigation)  │             │   MQTT Bridge   │               │   Dashboard     │
└─────────────────┘             │   Server        │               └─────────────────┘
                                │                 │                        │
┌─────────────────┐    MQTT     │                 │               Firebase │
│   ESP32 Car     │ ←────────── │                 │               Real-time│
│   (Control)     │             │                 │               Database │
└─────────────────┘             └─────────────────┘                        │
                                         │                                  │
                                 Firebase Admin SDK                        │
                                         │                                  │
                                         ▼                                  │
                                ┌─────────────────┐                        │
                                │   Firebase      │ ←──────────────────────┘
                                │   Database      │
                                └─────────────────┘
