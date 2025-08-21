import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/enhanced-button";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      company: "TechStart Solutions",
      content: "FusionDevWorks transformed our vision into a stunning web application. Their attention to detail and technical expertise exceeded our expectations.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateCorp",
      content: "The mobile app they developed for us has been a game-changer. User engagement increased by 200% within the first month of launch.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Founder",
      company: "GreenTech Startup",
      content: "Professional, responsive, and incredibly talented. They delivered our project on time and within budget. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "David Park",
      role: "CTO",
      company: "DataFlow Systems",
      content: "Their expertise in modern web technologies is impressive. The dashboard they built for us handles millions of data points seamlessly.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % testimonials.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="testimonials" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card 
            className="fusion-card p-8 md:p-12 text-center min-h-[400px] flex items-center"
            data-aos="fade-up"
          >
            <CardContent className="w-full">
              <div className="mb-8">
                <img 
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 border-2 border-primary/30"
                />
                
                {/* Star rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <span key={i} className="text-2xl text-yellow-400">★</span>
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                
                <div>
                  <h4 className="text-xl font-semibold text-gradient-teal mb-2">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-muted-foreground">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button 
              variant="neon-outline" 
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              ←
            </Button>
            
            {/* Dots indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary glow-blue' 
                      : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            
            <Button 
              variant="neon-outline" 
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              →
            </Button>
          </div>
        </div>

        <div className="text-center mt-16" data-aos="fade-up">
          <Button variant="neon" size="lg">
            Start Your Success Story
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;