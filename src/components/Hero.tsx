import { useEffect, useRef } from "react";
import { Button } from "./ui/enhanced-button";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Hero text reveal animation
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-glow"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-secondary/30 rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 border border-accent/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 hero-text"
        >
          <span className="text-gradient-primary">Fusion</span>
          <span className="text-foreground">Dev</span>
          <span className="text-gradient-teal">Works</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto hero-text leading-relaxed"
        >
          Crafting cutting-edge web applications and mobile solutions with 
          <span className="text-primary font-semibold"> modern technology</span> and 
          <span className="text-secondary font-semibold"> innovative design</span>
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-text">
          <Button 
            variant="hero"
            onClick={() => scrollToSection("portfolio")}
            className="animate-glow"
          >
            View Our Work
          </Button>
          <Button 
            variant="neon-outline"
            size="xl"
            onClick={() => scrollToSection("contact")}
          >
            Start Your Project
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;