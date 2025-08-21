import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/enhanced-button";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern frameworks like React, Next.js, and Node.js. From simple websites to complex web platforms.",
      features: ["React & Next.js", "Full-Stack Development", "API Integration", "Performance Optimization"],
      icon: "🌐",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android. Built with React Native and Flutter for maximum reach.",
      features: ["React Native", "Flutter", "iOS & Android", "App Store Deployment"],
      icon: "📱",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "UI/UX Design",
      description: "User-centered design that creates intuitive and engaging experiences. From wireframes to high-fidelity prototypes.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      icon: "🎨",
      gradient: "from-teal-500 to-blue-600"
    },
    {
      title: "Custom Software",
      description: "Tailored software solutions for unique business needs. Enterprise applications, automation tools, and specialized platforms.",
      features: ["Enterprise Solutions", "Process Automation", "System Integration", "Cloud Deployment"],
      icon: "⚙️",
      gradient: "from-green-500 to-teal-600"
    }
  ];

  return (
    <section id="services" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
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
                <div className="text-5xl mb-4 group-hover:animate-float">
                  {service.icon}
                </div>
                <CardTitle className="text-xl mb-3 text-gradient-teal">
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
                  variant="neon-outline" 
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
          <Button variant="neon" size="lg">
            Get Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;