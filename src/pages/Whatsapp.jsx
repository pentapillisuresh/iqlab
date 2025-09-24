import { useState } from 'react';
import './Whatsapp.css';

const Whatsapp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Floating WhatsApp Button */}
      <div
        className="whatsapp-button"
        onClick={() => setIsOpen(!isOpen)}
        data-aos="fade-up"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="chat-popup" data-aos="fade-in">
          <div className="chat-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/images/logo.png"
                alt="Chat Icon"
                style={{
                  width: '50px',
                  height: '50px',
                  // backgroundColor: 'white',
                  // borderRadius: '50%',
                  marginRight: '10px',
                }}
              />
              <div style={{ color: '#fff' }}>
                  <div className="leading-tight" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              {/* <img
                src="/images/offerletterlogo.png"
               
                alt="Logo Text"
                onError={(e) => {
                  e.target.style.display = "none";  
                }}  style={{ width: '100px', height: 'auto' }} 
              /> */}
            </div>
                {/* <span style={{ fontSize: '12px', color: '#ccc' }}>Typically replies within a day</span> */}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#fff',
              }}
              title="Close"
            >
              ×
            </button>
          </div>

          <div className="chat-body">
            <p>
              Hi 👋<br />
              How can we help you?
            </p>
          </div>

          <a
            href="https://wa.me/919949999381"
            target="_blank"
            rel="noopener noreferrer"
            className="chat-footer"
          >
            Start Chat
          </a>
        </div>
      )}
    </div>
  );
};

export default Whatsapp;
