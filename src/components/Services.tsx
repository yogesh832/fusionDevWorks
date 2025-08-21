import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/enhanced-button";
import serviceWebImg from "@/assets/service-web.jpg";
import serviceMobileImg from "@/assets/service-mobile.jpg";
import serviceDesignImg from "@/assets/service-design.jpg";
import serviceSoftwareImg from "@/assets/service-software.jpg";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern frameworks like React, Next.js, and Node.js. From simple websites to complex web platforms.",
      features: ["React & Next.js", "Full-Stack Development", "API Integration", "Performance Optimization"],
      image: serviceWebImg,
    },
    {
      title: "Mobile App Development", 
      description: "Native and cross-platform mobile applications for iOS and Android. Built with React Native and Flutter for maximum reach.",
      features: ["React Native", "Flutter", "iOS & Android", "App Store Deployment"],
      image: serviceMobileImg,
    },
    {
      title: "UI/UX Design",
      description: "User-centered design that creates intuitive and engaging experiences. From wireframes to high-fidelity prototypes.", 
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      image: serviceDesignImg,
    },
    {
      title: "Custom Software",
      description: "Tailored software solutions for unique business needs. Enterprise applications, automation tools, and specialized platforms.",
      features: ["Enterprise Solutions", "Process Automation", "System Integration", "Cloud Deployment"],
      image: serviceSoftwareImg,
    }
  ];

  return (
    <section id="services" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="fusion-card hover-scale group h-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-full h-32 mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-xl mb-3 text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="minimal-outline" 
                  size="sm" 
                  className="w-full mt-6"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16" data-aos="fade-up">
          <Button variant="minimal" size="lg">
            Get Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;