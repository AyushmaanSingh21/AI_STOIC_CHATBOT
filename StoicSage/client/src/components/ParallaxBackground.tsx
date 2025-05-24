import { useEffect, useState } from "react";

export default function ParallaxBackground() {
  // Track mouse position for additional parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Create stars and handle parallax effects when component mounts
  useEffect(() => {
    // Create stars
    const createStars = () => {
      const starsContainer = document.querySelector('.stars');
      if (!starsContainer) return;
      
      // Clear any existing stars
      starsContainer.innerHTML = '';
      
      const count = 200; // More stars for richer effect
      
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3; // Slightly larger stars
        const parallaxValue = Math.random() * 20; // Each star moves at different rate
        
        star.className = 'parallax-star';
        star.style.position = 'absolute';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.opacity = String(Math.random() * 0.8 + 0.2);
        star.style.animation = `pulse ${Math.random() * 4 + 2}s infinite`;
        star.dataset.parallax = String(parallaxValue);
        
        // Create some larger "bright" stars
        if (Math.random() > 0.97) {
          star.style.width = `${size + 2}px`;
          star.style.height = `${size + 2}px`;
          star.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.7)';
        }
        
        starsContainer.appendChild(star);
      }
    };
    
    createStars();
    
    // Handle window resize
    window.addEventListener('resize', createStars);
    
    // Create a parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Move the parallax layers
      const layers = document.querySelectorAll('.parallax-layer');
      layers.forEach((layer, index) => {
        const speed = 0.15 * (index + 1);
        const yPos = -(scrollY * speed);
        
        if (layer instanceof HTMLElement) {
          layer.style.transform = `translateY(${yPos}px) translateZ(${-index}px) scale(${1 + index * 0.125})`;
        }
      });
      
      // Move stars with parallax effect
      const stars = document.querySelectorAll('.parallax-star');
      stars.forEach(star => {
        if (star instanceof HTMLElement && star.dataset.parallax) {
          const parallaxValue = parseFloat(star.dataset.parallax);
          const starYPos = -(scrollY * 0.03 * (parallaxValue / 10));
          star.style.transform = `translateY(${starYPos}px)`;
        }
      });
      
      // Move moon with parallax effect
      const moon = document.querySelector('.parallax-moon');
      if (moon instanceof HTMLElement) {
        const moonSpeed = 0.05;
        const moonYPos = -(scrollY * moonSpeed);
        moon.style.transform = `translateY(${moonYPos}px)`;
      }
    };
    
    // Handle mouse movement for additional parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      
      const xRatio = e.clientX / window.innerWidth - 0.5;
      const yRatio = e.clientY / window.innerHeight - 0.5;
      
      // Apply mouse parallax to moon
      const moon = document.querySelector('.parallax-moon');
      if (moon instanceof HTMLElement) {
        moon.style.transform = `translate(${xRatio * -30}px, ${yRatio * -30}px)`;
      }
      
      // Apply subtle mouse parallax to layers
      const layers = document.querySelectorAll('.parallax-layer');
      layers.forEach((layer, index) => {
        if (layer instanceof HTMLElement) {
          const depth = (index + 1) * 10;
          const moveX = xRatio * depth;
          const moveY = yRatio * depth;
          
          // Combine with any existing transform
          const currentTransform = layer.style.transform || '';
          if (!currentTransform.includes('translate3d')) {
            layer.style.transform = `${currentTransform} translate3d(${moveX}px, ${moveY}px, 0)`;
          } else {
            // If already has translate3d, just update X and Y
            layer.style.transform = currentTransform.replace(
              /translate3d\([^)]+\)/,
              `translate3d(${moveX}px, ${moveY}px, 0)`
            );
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial call
    handleScroll();
    
    return () => {
      window.removeEventListener('resize', createStars);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] parallax-container">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0f0a29] via-[#1c1043] to-[#0d0d28]"></div>
      
      {/* Stars layer */}
      <div className="stars absolute top-0 left-0 w-full h-full"></div>
      
      {/* Moon */}
      <div className="parallax-moon absolute top-[10%] right-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-white opacity-90 shadow-[0_0_30px_10px_rgba(255,255,255,0.4)] transition-transform duration-200 ease-out"></div>
      
      {/* Far Stars - move slowest (parallax depth) */}
      <div className="parallax-stars-far absolute top-0 left-0 w-full h-full"></div>
      
      {/* Parallax mountains/landscape layers */}
      <div 
        className="parallax-layer absolute bottom-0 left-0 w-full h-[30vh] bg-bottom bg-no-repeat bg-cover transition-transform duration-200 ease-out will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1644009188191-0dd45c3b5390?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          opacity: 0.6,
          zIndex: 3
        }}
      ></div>
      
      <div 
        className="parallax-layer absolute bottom-0 left-0 w-full h-[35vh] bg-bottom bg-no-repeat bg-cover transition-transform duration-200 ease-out will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          opacity: 0.5,
          zIndex: 2
        }}
      ></div>
      
      <div 
        className="parallax-layer absolute bottom-0 left-0 w-full h-[40vh] bg-bottom bg-no-repeat bg-cover transition-transform duration-200 ease-out will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1610761975216-fa0e74a6e4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          opacity: 0.4,
          zIndex: 1
        }}
      ></div>
      
      {/* Overlay to create depth and darkness */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
      
      {/* Add some floating dust particles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-30"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`
            }}
          />
        ))}
      </div>
    </div>
  );
}
