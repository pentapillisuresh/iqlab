import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import serviceData from "../components/home/Data/ServiceData";
import ServiceCard from "../components/ServiceCard";
import IsoRegistrationForm from "../components/auth/IsoRegistrationForm";
import ClubRegistrationForm from "../components/auth/ClubRegistrationForm";
import CareerRegistrationForm from "../components/auth/CareerRegistrationForm";
import SuccessScreen from "../components/SuccessScreen";

const ServiceRegistration = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceFromUrl = queryParams.get("service") || "iso";

  const [selectedService, setSelectedService] = useState(serviceFromUrl);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    setSelectedService(serviceFromUrl);
  }, [serviceFromUrl]);

  const currentService = serviceData.find(
    (service) => service.id === selectedService
  );

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setRegistrationSuccess(false);
  };

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
  };

  const resetForm = () => {
    setRegistrationSuccess(false);
    setSelectedService("iso");
  };

  if (registrationSuccess) {
    return <SuccessScreen service={currentService} onReset={resetForm} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-white text-center mb-12 mt-8">
          Service Registration
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Service Cards */}
          <div className="flex items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {serviceData.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isSelected={selectedService === service.id}
                  onSelect={handleServiceSelect}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
            {selectedService === "iso" && (
              <IsoRegistrationForm onSuccess={handleRegistrationSuccess} />
            )}
            {selectedService === "club" && (
              <ClubRegistrationForm onSuccess={handleRegistrationSuccess} />
            )}
            {selectedService === "career" && (
              <CareerRegistrationForm onSuccess={handleRegistrationSuccess} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRegistration;
