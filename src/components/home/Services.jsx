import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import serviceData from "./Data/ServiceData.js";

const Services = () => {
 

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(248,250,252,0.95), rgba(241,245,249,0.9)), url('https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient blobs animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-16 w-32 h-32 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-2xl"
        />
      </div>

      {/* Section content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full text-blue-700 font-semibold text-sm mb-4 border border-blue-300/50">
            Our Programs
          </span>
          {/* <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
            <span className="text-[#1D4ED8]">Career</span>
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Guidance Solutions
            </span>
          </h2> */}

          {/* <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            From school to higher education and career choices, we provide
            personalized assessments and guidance programs that shape bright
            futures.
          </p> */}
        </motion.div>

      
{/* Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

  {serviceData.map((service, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: idx * 0.2 }}
      whileHover={{
        scale: 1.03,
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="group relative h-full"
    >
      <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
        
        {/* Image */}
        <div
          className="h-40 relative overflow-hidden"
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="text-lg font-bold mb-3 group-hover:text-blue-700 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {service.description}
          </p>

          {/* Login Button (sticks to bottom) */}
          <div className="mt-auto">
            <Link
              to="/register"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 group/link"
            >
              REGISTER
              <svg
                className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>



      </div>
    </section>
  );
};

export default Services;
