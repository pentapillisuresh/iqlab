import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/home/Hero'
// import Features from '../components/home/Features'
import Services from '../components/home/Services'
// import Stats from '../components/home/Stats'
import Testimonials from '../components/home/Testimonials'
import CTA from '../components/home/CTA'
import About from '../components/home/About'
import HRTopicsSection from '../components/home/HRTopicsSection'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const containerRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for sections
      gsap.utils.toArray('.parallax-section').forEach((section) => {
        gsap.to(section, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })

      // Stagger animation for cards
      gsap.utils.toArray('.stagger-card').forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden"
    >
      <Hero />
     <About />
      <Services />
      <HRTopicsSection />
       {/* <Features /> */}
      {/* <Stats /> */}
      <Testimonials />
      {/* <CTA /> */}
    </motion.div>
  )
}

export default Home