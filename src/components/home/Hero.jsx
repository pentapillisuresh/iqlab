import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Hero.css";

const gridSize = 5; // 5x5 grid
const autoSlideInterval = 5000; // 5 seconds

const bannerData = [
  {
    id: 1,
    image: "./images/Jungle.jpg",
    animationType: "randomScatter",
    buttonText: "Start Your Journey",
  },
  {
    id: 2,
    image: "./images/con3.jpg",
    animationType: "fadeIn",
    title: "Empowering students to discover their true potential and career path.",
    subtitle: "Professional Career Assessment & Guidance",
    buttonText: "Explore Programs",
  },
  {
    id: 3,
    image: "./images/medical.jpg",
    animationType: "zoomOut",
    title: "Transform your educational journey into meaningful career outcomes.",
    subtitle: "Purpose-Driven Educational Solutions",
    buttonText: "Contact Us",
  },
];

const Hero = () => {
  const containerRefs = useRef([]);
  const textRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateSlide = (slideIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tiles = containerRefs.current[slideIndex]?.querySelectorAll(".tile");
    const textElements = textRefs.current[slideIndex];
    const animationType = bannerData[slideIndex]?.animationType;

    if (!tiles) {
      setIsAnimating(false);
      return;
    }

    if (textElements) {
      gsap.set(
        textElements.querySelectorAll(
          ".hero-title, .hero-subtitle, .hero-button"
        ),
        {
          opacity: 0,
          y: 50,
        }
      );
    }

    let fromVars = {};
    switch (animationType) {
      case "fadeIn":
        fromVars = { opacity: 0 };
        break;
      case "zoomIn":
        fromVars = { scale: 0.4, opacity: 0 };
        break;
      case "zoomOut":
        fromVars = { rotation: 180, opacity: 0 };
        break;
      case "slideFromTop":
        fromVars = { y: -200, opacity: 0 };
        break;
      case "slideFromLeft":
        fromVars = { x: -200, opacity: 0 };
        break;
      case "randomScatter":
      default:
        fromVars = {
          opacity: 0,
          scale: 0.6,
          x: () => gsap.utils.random(-200, 200),
          y: () => gsap.utils.random(-200, 200),
        };
        break;
    }

    gsap.fromTo(
      tiles,
      fromVars,
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotation: 0,
        stagger: { each: 0.03, from: "random" },
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
          if (textElements) {
            const tl = gsap.timeline();
            tl.to(textElements.querySelector(".hero-title"), {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            })
              .to(
                textElements.querySelector(".hero-subtitle"),
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power3.out",
                },
                "-=0.4"
              )
              .to(
                textElements.querySelector(".hero-button"),
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "back.out(1.7)",
                },
                "-=0.3"
              )
              .set({}, { onComplete: () => setIsAnimating(false) });
          } else {
            setIsAnimating(false);
          }
        },
      }
    );
  };

  useEffect(() => {
    animateSlide(currentSlide);
  }, [currentSlide]);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentSlide((prev) => (prev + 1) % bannerData.length);
      }
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const nextSlide = () => {
    if (isAnimating) return;
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setCurrentSlide(index);
  };

  return (
    <div className="carousel-container relative h-64 md:h-80 lg:h-96 w-full">
      {/* Indicators */}
      <div className="carousel-indicators">
        {bannerData.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Carousel Inner */}
      <div className="carousel-inner">
        {bannerData.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-item ${index === currentSlide ? "active" : ""}`}
          >
            <div
              className="grid-image"
              ref={(el) => {
                if (el) containerRefs.current[index] = el;
              }}
            >
              {[...Array(gridSize * gridSize)].map((_, i) => {
                const row = Math.floor(i / gridSize);
                const col = i % gridSize;
                return (
                  <div
                    key={i}
                    className="tile"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundPosition: `${(col * 100) / (gridSize - 1)}% ${
                        (row * 100) / (gridSize - 1)
                      }%`,
                      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                    }}
                  />
                );
              })}
            </div>

            {/* Text Overlay */}
            <div
              className="hero-text-overlay"
              ref={(el) => {
                if (el) textRefs.current[index] = el;
              }}
            >
              <div className="hero-content">
                <p className="hero-subtitle">{item.subtitle}</p>
                <h1 className="hero-title">{item.title}</h1>
                {/* <button className="hero-button">{item.buttonText}</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        className="carousel-control prev"
        type="button"
        onClick={prevSlide}
        disabled={isAnimating}
      >
        <ChevronLeft size={24} />
        <span className="sr-only">Previous</span>
      </button>

      <button
        className="carousel-control next"
        type="button"
        onClick={nextSlide}
        disabled={isAnimating}
      >
        <ChevronRight size={24} />
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default Hero;
