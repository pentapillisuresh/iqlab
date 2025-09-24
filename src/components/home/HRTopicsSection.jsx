import React from 'react';
import './ClientLogos.css';

const ClientLogos = () => {
  const clientLogos = [
  { photo: "/images/logo1.jpeg", name: "AP Tourism" },
  { photo: "/images/logo2.jpeg", name: "BSNL" },
  { photo: "/images/logo3.jpeg", name: "IKEA" },
  { photo: "/images/logo4.jpeg", name: "IKEA" },
  { photo: "/images/logo5.jpeg", name: "qwert" },
  { photo: "/images/logo6.jpeg", name: "IKEA" },
  { photo: "/images/logo7.jpeg", name: "IKEA" },
  ];

  return (
    <div>
      <section className="client-section">
        <div className="client-swiper-container">
          <p className="client-subtext text-center mb-4">
            Certified for Quality, Trusted for Excellence
          </p>

          <div className="scroll-wrapper">
            <div className="scroll-track">
              {[...clientLogos, ...clientLogos].map((item, index) => (
                <div className="scroll-card" key={index}>
                  <img
                    src={item.photo}
                    alt={item.name || `Client-${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientLogos;