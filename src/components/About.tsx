import { useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/card";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // AOS animation will be initialized in the main component
  }, []);

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized performance with modern tech stack and best practices"
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description: "Stunning UI/UX that captivates users and drives engagement"
    },
    {
      icon: "📱",
      title: "Responsive",
      description: "Perfect experience across all devices and screen sizes"
    },
    {
      icon: "🚀",
      title: "Scalable",
      description: "Built to grow with your business and handle increasing demands"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
            About FusionDevWorks
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are a team of passionate developers and designers who specialize in creating 
            modern, scalable web applications and mobile solutions that drive business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="fusion-card hover-scale text-center p-6"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gradient-teal">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h3 className="text-3xl font-bold mb-6 text-gradient-primary">
              Our Mission
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              To empower businesses with cutting-edge technology solutions that not only meet 
              today's requirements but anticipate tomorrow's challenges. We believe in the 
              fusion of creativity and technology to deliver exceptional digital experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From startups to enterprise clients, we've helped transform ideas into 
              successful digital products that users love and businesses rely on.
            </p>
          </div>
          
          <div className="relative" data-aos="fade-left">
            <div className="fusion-card p-8 text-center">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">98%</div>
                  <div className="text-muted-foreground">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">5+</div>
                  <div className="text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;