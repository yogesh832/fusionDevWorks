import { useState, useEffect } from "react";
import { Button } from "./ui/enhanced-button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 overflow-x-hidden ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/lovable-uploads/favicon.png"
            alt="FusionDevWorks Logo"
            className="h-12 w-12 md:h-16 md:w-16"
          />
          <span className="hidden md:inline text-xl font-bold text-gradient-primary">
            FusionDevWorks
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {["about", "services", "portfolio", "testimonials"].map((sec) => (
            <button
              key={sec}
              onClick={() => scrollToSection(sec)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
          <Button
            variant="minimal-outline"
            onClick={() => scrollToSection("contact")}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 w-full h-full overflow-x-hidden bg-background/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-6 px-6">
          {["about", "services", "portfolio", "testimonials"].map((sec) => (
            <button
              key={sec}
              onClick={() => scrollToSection(sec)}
              className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
          <Button
            variant="minimal-outline"
            className="mt-6"
            onClick={() => scrollToSection("contact")}
          >
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
