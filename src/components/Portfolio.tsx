import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/enhanced-button";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "web",
      description: "Modern e-commerce solution with real-time inventory and payment processing",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      link: "#"
    },
    {
      title: "Fitness Mobile App",
      category: "mobile",
      description: "Cross-platform fitness tracking app with social features",
      tech: ["React Native", "Firebase", "Redux", "Maps API"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
      link: "#"
    },
    {
      title: "Analytics Dashboard",
      category: "web",
      description: "Real-time data visualization dashboard for business intelligence",
      tech: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      link: "#"
    },
    {
      title: "Food Delivery App",
      category: "mobile",
      description: "On-demand food delivery platform with live tracking",
      tech: ["Flutter", "Dart", "Google Maps", "Firebase"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop",
      link: "#"
    },
    {
      title: "SaaS Management Tool",
      category: "web",
      description: "Enterprise project management platform with team collaboration",
      tech: ["React", "TypeScript", "GraphQL", "AWS"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      link: "#"
    },
    {
      title: "AR Shopping App",
      category: "mobile",
      description: "Augmented reality shopping experience for home decoration",
      tech: ["React Native", "ARCore", "ARKit", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
      link: "#"
    }
  ];

  const categories = [
    { key: "all", label: "All Projects" },
    { key: "web", label: "Web Apps" },
    { key: "mobile", label: "Mobile Apps" }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
            Our Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore our latest projects and see how we've helped businesses transform their digital presence
          </p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={filter === category.key ? "minimal" : "minimal-outline"}
                onClick={() => setFilter(category.key)}
                data-aos="fade-up"
                data-aos-delay={100}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={`${project.title}-${filter}`}
              className="fusion-card hover-scale group overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="minimal-outline">
                    View Project
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gradient-teal">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-muted text-sm rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16" data-aos="fade-up">
          <Button variant="minimal" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;