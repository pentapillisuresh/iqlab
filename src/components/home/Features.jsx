import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Features = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      delay: 50
    });
  }, []);

  const features = [
    {
      icon: '🎯',
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms analyze skills and culture fit for perfect candidate-company alignment.',
      color: 'from-blue-500 to-blue-700',
      bgImage: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      animation: 'fade-right'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast Results',
      description: 'Streamlined processes deliver qualified candidates 3x faster than traditional methods.',
      color: 'from-emerald-500 to-emerald-700',
      bgImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      animation: 'fade-up'
    },
    {
      icon: '🎨',
      title: 'Tailored Solutions',
      description: 'Custom recruitment strategies designed for your industry and unique requirements.',
      color: 'from-orange-500 to-orange-700',
      bgImage: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      animation: 'fade-left'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level security with full GDPR and SOC 2 compliance protocols.',
      color: 'from-purple-500 to-purple-700',
      bgImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      animation: 'fade-right'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Comprehensive dashboards provide actionable insights to optimize hiring strategy.',
      color: 'from-teal-500 to-teal-700',
      bgImage: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      animation: 'fade-up'
    },
    {
      icon: '🌟',
      title: 'Dedicated Support',
      description: 'Personal account managers and 24/7 support ensure seamless experience.',
      color: 'from-rose-500 to-rose-700',
      bgImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      animation: 'fade-left'
    }
  ];

  return (
    <section className="py-8 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          // backgroundImage: `linear-gradient(135deg, rgba(185, 28, 28, 0.9), rgba(185, 28, 28, 0.6)), url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundImage: `linear-gradient(135deg, rgba(185, 28, 28, 0.85), rgba(254, 226, 226, 0.7)), url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,




          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Animated gradient blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-8 right-8 w-48 h-48 bg-gradient-to-r from-orange-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-8 left-8 w-56 h-56 bg-gradient-to-r from-blue-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1.5 bg-orange-500/20 backdrop-blur-sm rounded-full text-orange-300 font-semibold text-sm mb-4 border border-orange-400/30"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            Why Choose Us
          </span>
          <h2
            className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-6 leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Revolutionizing
            <span className="block  bg-clip-text text-transparent" style={{ color: "rgb(234, 179, 8)" }}>
              Recruitment
            </span>
          </h2>
          {/* <p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Experience the future of hiring with our innovative platform combining
            cutting-edge technology with human expertise.
          </p> */}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative"
              data-aos={feature.animation}
              data-aos-delay={idx * 100}
              data-aos-duration="800"
            >
              <div className="relative h-full bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-400 overflow-hidden hover:transform hover:scale-105 hover:-translate-y-1">
                {/* Hover background image */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-400"
                  style={{
                    backgroundImage: `url(${feature.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />

                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-400`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      {feature.icon}
                    </div>
                  </div>

                  {/* Title & description */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover accent border */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left`}
                />

                {/* Corner accent */}
                <div
                  className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-400 rounded-bl-2xl`}
                />

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 animate-ping" />
                  <div className="absolute bottom-6 left-4 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute top-1/2 left-3 w-1 h-1 bg-white/25 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}

      </div>

      {/* Decorative elements */}
      <div className="absolute top-16 left-8 w-16 h-16 border-2 border-white/10 rounded-full" data-aos="zoom-in" data-aos-delay="600" />
      <div className="absolute bottom-16 right-16 w-24 h-24 border-2 border-orange-400/20 rounded-full" data-aos="zoom-in" data-aos-delay="700" />
      <div className="absolute top-1/2 right-8 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" data-aos="fade-left" data-aos-delay="800" />
    </section>
  );
};

export default Features;