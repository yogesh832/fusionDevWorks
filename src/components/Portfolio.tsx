import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/enhanced-button";

// ✅ Import all your screenshots from local folder
import Rocksbox from "../../public/lovable-uploads/rocksbox.png";
// import GoldDesign from "../../public/lovable-uploads/gold.png";
import Lohamandi from "../../public/lovable-uploads/lohamandi.png";
import DumpsXpert from "../../public/lovable-uploads/dumpsxpert.png";
import CarRental from "../../public/lovable-uploads/car-rental.png";
import BuildYourBuzz from "../../public/lovable-uploads/build-your-buzz.png";
import Cloths4U from "../../public/lovable-uploads/cloths4u.png";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      title: "Rocksbox",
      category: "web",
      description: "A jewelry subscription website design inspired by Rocksbox.",
      tech: ["Next.js", "Tailwind", "Vercel"],
      image: Rocksbox,
      live: "https://www.rocksbox.com/",
      github: "https://github.com/yogesh832"
    },
    {
      title: "Lohamandi",
      category: "web",
      description: "A steel trading platform with product catalog & order features.",
      tech: ["Next.js", "Tailwind", "MongoDB"],
      image: Lohamandi,
      live: "https://lohamandi.com/",
      github: "https://github.com/yogesh832/lohamandi"
    },
    {
      title: "DumpsXpert",
      category: "web",
      description: "Exam dumps and preparation material marketplace.",
      tech: ["Next.js", "Express", "MongoDB"],
      image: DumpsXpert,
      live: "https://dumpsxpert-next.vercel.app/",
      github: "https://github.com/yogesh832/DumpsExpert-Next"
    },
    {
      title: "Car Rental Website",
      category: "web",
      description: "Car rental booking platform with responsive UI.",
      tech: ["React", "Tailwind", "Vercel"],
      image: CarRental,
      live: "https://car-rental-website-beige-five.vercel.app/",
      github: "https://github.com/yogesh832/car-rental-website"
    },
    {
      title: "Build Your Buzz",
      category: "web",
      description: "Digital marketing landing page for brand growth.",
      tech: ["Next.js", "Tailwind", "Vercel"],
      image: BuildYourBuzz,
      live: "https://build-your-buzz.vercel.app/",
      github: "https://github.com/Virenishere/build-your-buzz"
    },
    {
      title: "Cloths4U",
      category: "web",
      description: "An online clothing store built with React and hosted on Netlify.",
      tech: ["React", "Tailwind", "Netlify"],
      image: Cloths4U,
      live: "https://cloths4u.netlify.app/",
      github: "https://cloths4u.netlify.app/"
    }
  ];

  const categories = [
    { key: "all", label: "All Projects" },
    { key: "web", label: "Web Apps" },
    { key: "mobile", label: "Mobile Apps" }
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
            Our Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore our latest projects and see how we've helped businesses
            transform their digital presence
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
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-4 items-center justify-center">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <Button variant="minimal-outline">Live</Button>
                    </a>
                  )}
                  {/* {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Button variant="minimal-outline">Code</Button>
                    </a> */}
                  {/* )} */}
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

        {/* <div className="text-center mt-16" data-aos="fade-up">
          <Button variant="minimal" size="lg">
            View All Projects
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default Portfolio;
