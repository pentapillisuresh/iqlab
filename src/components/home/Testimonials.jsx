import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Updated testimonials with Indian names + Lakshya Arthi style
  const testimonials = [
    {
      name: "Ramesh Patel",
      role: "Parent",
      company: "PPE (Positive Parenting Explorer)",
      image:
        "https://images.pexels.com/photos/3763585/pexels-photo-3763585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      quote:
        "PPE helped me understand my child’s learning style and habits. The insights gave me clarity on how to support their growth at home.",
      rating: 5,
    },
    {
      name: "Anita Sharma",
      role: "Graduate Student",
      company: "JRAP (Job Readiness Assessment Program)",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      quote:
        "JRAP gave me a clear picture of my strengths and areas to improve. The mentoring guidance made me feel job-ready with confidence.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      role: "College Student",
      company: "Disha",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      quote:
        "Disha helped me decide between pursuing higher studies and preparing for a career. It gave me the clarity I was looking for.",
      rating: 5,
    },
    {
      name: "Priya Nair",
      role: "High School Student",
      company: "Career Edge",
      image:
        "https://images.pexels.com/photos/774548/pexels-photo-774548.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      quote:
        "Career Edge helped me explore suitable career paths after class 10th. The detailed report made choosing my stream stress-free.",
      rating: 5,
    },
    {
      name: "Arjun Mehta",
      role: "Student",
      company: "OCSS (Overseas Career Suitability)",
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      quote:
        "OCSS guided me in selecting the right overseas education path. It matched my preferences and helped me prepare better.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], originalIndex: index });
    }
    return visible;
  };

  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ backgroundColor: "#e0f2ff" }} // light blue background
    >
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* <span className="font-semibold text-sm mb-3 block text-blue-800">
            Student & Parent Voices
          </span> */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What People Say About Us
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-blue-700">
            Real experiences from the clients who discovered clarity.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Three Testimonials Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AnimatePresence mode="wait">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${activeIndex}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${
                    index === 1 ? "md:scale-105 md:z-10" : "md:scale-95"
                  } transition-transform duration-300`}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-xl h-full flex flex-col relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full transform translate-x-8 -translate-y-8" />

                    {/* Quote Icon */}
                    <div className="absolute top-4 left-4 text-3xl text-blue-200">
                      "
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Quote */}
                      <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed font-medium flex-grow">
                        {testimonial.quote}
                      </p>

                      {/* Rating */}
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center space-x-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                        />
                        <div className="text-left">
                          <h4 className="text-sm font-bold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-blue-600 font-medium text-xs">
                            {testimonial.role}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-800 hover:bg-white/20 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-blue-600 w-6"
                      : "bg-blue-200 hover:bg-blue-400"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-800 hover:bg-white/20 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
