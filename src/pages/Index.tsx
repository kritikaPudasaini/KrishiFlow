
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SensorCard } from '@/components/SensorCard';
import { VegetationCard } from '@/components/VegetationCard';
import { ChartSection } from '@/components/ChartSection';
import { ControlPanel } from '@/components/ControlPanel';
import { toast } from '@/hooks/use-toast';

// Simulated sensor data interface
interface SensorData {
  pH: number;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  gasConcentration: number;
  timestamp: number;
}

interface Section {
  id: string;
  name: string;
  sensorData: SensorData;
  recommendedVegetation: string[];
  lastUpdated: string;
  status: 'online' | 'offline' | 'warning';
}

const Index = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'section-1',
      name: 'North Field',
      sensorData: {
        pH: 6.8,
        soilMoisture: 45,
        temperature: 24.5,
        humidity: 62,
        gasConcentration: 0.3,
        timestamp: Date.now()
      },
      recommendedVegetation: ['Tomatoes', 'Peppers', 'Cucumbers'],
      lastUpdated: '2 min ago',
      status: 'online'
    },
    {
      id: 'section-2',
      name: 'South Field',
      sensorData: {
        pH: 7.2,
        soilMoisture: 38,
        temperature: 26.1,
        humidity: 58,
        gasConcentration: 0.25,
        timestamp: Date.now()
      },
      recommendedVegetation: ['Lettuce', 'Spinach', 'Herbs'],
      lastUpdated: '1 min ago',
      status: 'online'
    },
    {
      id: 'section-3',
      name: 'East Field',
      sensorData: {
        pH: 6.5,
        soilMoisture: 52,
        temperature: 23.8,
        humidity: 65,
        gasConcentration: 0.4,
        timestamp: Date.now()
      },
      recommendedVegetation: ['Carrots', 'Radishes', 'Onions'],
      lastUpdated: '3 min ago',
      status: 'warning'
    },
    {
      id: 'section-4',
      name: 'West Field',
      sensorData: {
        pH: 7.0,
        soilMoisture: 28,
        temperature: 25.3,
        humidity: 55,
        gasConcentration: 0.2,
        timestamp: Date.now()
      },
      recommendedVegetation: ['Beans', 'Peas', 'Corn'],
      lastUpdated: '5 min ago',
      status: 'offline'
    }
  ]);

  const [isConnected, setIsConnected] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSections(prevSections => 
        prevSections.map(section => ({
          ...section,
          sensorData: {
            ...section.sensorData,
            pH: Math.max(5.5, Math.min(8.5, section.sensorData.pH + (Math.random() - 0.5) * 0.2)),
            soilMoisture: Math.max(0, Math.min(100, section.sensorData.soilMoisture + (Math.random() - 0.5) * 5)),
            temperature: Math.max(15, Math.min(35, section.sensorData.temperature + (Math.random() - 0.5) * 2)),
            humidity: Math.max(30, Math.min(90, section.sensorData.humidity + (Math.random() - 0.5) * 3)),
            gasConcentration: Math.max(0, Math.min(1, section.sensorData.gasConcentration + (Math.random() - 0.5) * 0.1)),
            timestamp: Date.now()
          },
          lastUpdated: 'Just now'
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate connection status
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      const newConnectionStatus = Math.random() > 0.1; // 90% uptime
      if (newConnectionStatus !== isConnected) {
        setIsConnected(newConnectionStatus);
        toast({
          title: newConnectionStatus ? "Connected" : "Connection Lost",
          description: newConnectionStatus 
            ? "Successfully reconnected to IoT network" 
            : "Lost connection to MQTT broker",
          variant: newConnectionStatus ? "default" : "destructive"
        });
      }
    }, 10000);

    return () => clearInterval(connectionInterval);
  }, [isConnected]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌱</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EcoSmart Garden Hub</h1>
                <p className="text-gray-600">IoT Agricultural Monitoring System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span>{isConnected ? 'Connected' : 'Offline'}</span>
              </Badge>
              <div className="text-sm text-gray-500">
                Last sync: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Control Panel */}
        <div className="mb-8">
          <ControlPanel />
        </div>

        {/* Section Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sections.map((section) => (
            <Card key={section.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  {section.name}
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(section.status)}`}></div>
                </CardTitle>
                <p className="text-sm text-gray-500">Updated {section.lastUpdated}</p>
              </CardHeader>
              <CardContent>
                <SensorCard sensorData={section.sensorData} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <ChartSection sections={sections} />
        </div>

        {/* Vegetation Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <VegetationCard 
              key={`veg-${section.id}`}
              sectionName={section.name}
              recommendations={section.recommendedVegetation}
              sensorData={section.sensorData}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
