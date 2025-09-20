import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CountUp = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      let start = 0
      const increment = end / (duration * 60)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const Stats = () => {
  const stats = [
    {
      number: 500,
      suffix: '+',
      label: 'Successful Placements',
      description: 'Connecting top talent with leading companies',
      icon: '🎯',
      color: 'from-primary-600 to-primary-800'
    },
    {
      number: 50,
      suffix: '+',
      label: 'Partner Companies',
      description: 'Trusted by industry leaders worldwide',
      icon: '🏢',
      color: 'from-secondary-600 to-secondary-800'
    },
    {
      number: 95,
      suffix: '%',
      label: 'Success Rate',
      description: 'Exceptional placement success ratio',
      icon: '📈',
      color: 'from-accent-600 to-accent-800'
    },
    {
      number: 48,
      suffix: 'h',
      label: 'Average Response Time',
      description: 'Lightning-fast candidate delivery',
      icon: '⚡',
      color: 'from-emerald-600 to-emerald-800'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-300 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 font-semibold text-lg mb-4 block">By the Numbers</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-950 mb-6">
            Proven Results That Speak
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our track record demonstrates consistent excellence in connecting 
            exceptional talent with forward-thinking organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="text-center group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>

                {/* Number */}
                <div className="relative z-10 mb-2">
                  <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    <CountUp end={stat.number} suffix={stat.suffix} />
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-lg font-bold text-primary-950 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-primary-950 mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's discuss how we can help you achieve similar results
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Start Your Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats