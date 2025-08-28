import { motion } from "framer-motion";
import { Button } from "./ui/enhanced-button";
import Scene3D from "./Scene3D";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* 3D Earth Animation */}
      <div className="absolute right-0 top-0 w-full h-full opacity-20">
        <Scene3D />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl  md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            <span className="text-foreground">Transforming Ideas</span>
            <br />
            <span className="text-foreground">into </span>
            <span className="text-primary">Digital Excellence</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We craft stunning websites and applications that captivate and convert.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button 
              variant="hero"
              onClick={() => scrollToSection("portfolio")}
              className="hover-lift"
            >
              View Our Work
            </Button>
                      <Button
      variant="minimal-outline"
      size="lg"
      className=""
      data-cal-namespace=""
      data-cal-link="yogesh832"
      data-cal-config='{"layout":"month_view"}'
    >
      Book a Call 
    </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        {/* <motion.div   
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
            />
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Hero;