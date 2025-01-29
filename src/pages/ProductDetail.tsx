import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ZoomIn, Package, Cpu, Info } from 'lucide-react';
import OrderModal from '../components/OrderModal';

const components = [
  "Arduino UNO R3 SMD board with USB cable",
  "Bread board",
  "Ultrasonic sensor",
  "HC05 module",
  "220ohm resistance",
  "1k ohm resistance",
  "10k ohm resistance",
  "Buzzer",
  "Capacitor 104uF",
  "Capacitor 10uF",
  "I2C module LCD 16x2",
  "L293D",
  "Tilt sensor",
  "Relay",
  "RGB LED",
  "Male to male jumper wire",
  "Male to female jumper wire",
  "Servo motor",
  "Piezoelectric sensor",
  "7 segment display",
  "4 x module ldr",
  "Optocoupler",
  "Switch",
  "LM35",
  "NPN transistor 8050",
  "PNP transistor 8550",
  "Button switch large",
  "Red LED",
  "Green LED",
  "Yellow LED",
  "IR sensor",
  "Potentiometer",
  "Thermistor",
  "DC motor",
  "Header pin",
  "IN418 diode",
  "IN4001 diode",
  "Laser diode"
];

const specifications = [
  "Board: Arduino UNO R3 SMD",
  "Input Voltage: 7-12V",
  "Digital I/O Pins: 14",
  "Analog Input Pins: 6",
  "DC Current per I/O Pin: 40 mA",
  "Flash Memory: 32 KB",
  "SRAM: 2 KB",
  "EEPROM: 1 KB",
  "Clock Speed: 16 MHz"
];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const images = [
    'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1608564697071-ddf911d81370?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?auto=format&fit=crop&q=80&w=800'
  ];

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={images[selectedImage]}
                alt="Arduino Starter Kit"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg">
                <ZoomIn className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`Arduino Kit View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Arduino Starter Kit</h1>
            <p className="text-gray-600">
              Complete Arduino starter kit with everything you need to begin your electronics journey.
              Perfect for beginners and intermediate users alike.
            </p>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-blue-600">₹1,200</span>
              <span className="text-sm text-gray-500">(Inclusive of GST)</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Package className="h-5 w-5" />
              <span>Order Now</span>
            </button>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Technical Specifications</h2>
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {specifications.map((spec, index) => (
                  <li key={index} className="text-gray-600 text-sm flex items-center space-x-2">
                    <Info className="h-4 w-4 text-gray-400" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Components Included</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {components.map((component, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <Package className="h-4 w-4 text-gray-400" />
                    <span>{component}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        basePrice={1200}
      />
    </div>
  );
}