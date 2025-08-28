import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/enhanced-button";
import Jitendra from "../../public/lovable-uploads/jitendra.png"
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Jitendra Pratap Singh",
      role: "Founder",
      company: "EagleMedia360",
      content: "FusionDevWorks transformed our vision into a stunning web application. Their attention to detail and technical expertise exceeded our expectations.",
      rating: 5,
      avatar: "https://image2url.com/images/1756375786443-3f294715-a018-4916-a59b-d930a78ef168.png"
    },
    {
      name: "Narendra ",
      role: "Director ",
      company: "Salkatech",
      content: "The mobile app they developed for us has been a game-changer. User engagement increased by 200% within the first month of launch.",
      rating: 5,
      avatar: "https://tse1.mm.bing.net/th/id/OIP.tVnKK14bkmPn92WGmgUxQQAAAA?pid=Api&rs=1&c=1&qlt=95&w=82&h=123"
    },
    {
      name: "Rajnesh Thakur",
      role: "Founder ",
      company: "Elexico Digital",
      content: "Professional, responsive, and incredibly talented. They delivered our project on time and within budget. Highly recommended!",
      rating: 5,
      avatar: "https://tse1.mm.bing.net/th/id/OIP.7b7FFC2ANLuE-PH0Ged66wHaE8?pid=Api&rs=1&c=1&qlt=95&w=185&h=123"
    },
    {
      name: "Kailash Shahi",
      role: "CTO",
      company: " Endiexpert",
      content: "Their expertise in modern web technologies is impressive. The dashboard they built for us handles millions of data points seamlessly.",
      rating: 5,
      avatar: "https://tse1.mm.bing.net/th/id/OIP.YIre5HGHiqBa7DCmrF4KwwHaJQ?pid=Api&P=0&h=180"
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
              variant="minimal-outline" 
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
                      ? 'bg-primary' 
                      : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            
            <Button 
              variant="minimal-outline" 
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              →
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;