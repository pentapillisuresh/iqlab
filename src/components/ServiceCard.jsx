import React from 'react';
import { Shield, Compass, Users, Briefcase } from 'lucide-react';

const iconMap = {
  Shield,
  Compass,
  Users,
  Briefcase
};

const ServiceCard = ({ service, isSelected, onSelect }) => {
  const IconComponent = iconMap[service.icon];

  return (
    <div
      onClick={() => onSelect(service.id)}
      className={`relative bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
        isSelected ? 'ring-4 ring-cyan-300 ring-opacity-50' : ''
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-3">
          <IconComponent className="h-8 w-8 text-white mr-3" />
          <h3 className="text-lg font-bold text-white">{service.title}</h3>
        </div>
        <p className="text-cyan-100 text-sm flex-grow">{service.description}</p>
        {service.fee > 0 && (
          <div className="mt-3 text-right">
            <span className="bg-white bg-opacity-20 text-white px-2 py-1 rounded text-sm">
              ₹{service.fee}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;