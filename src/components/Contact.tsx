import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/enhanced-button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      details: "hello@fusiondevworks.com",
      link: "mailto:hello@fusiondevworks.com"
    },
    {
      icon: "📱",
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: "🌍",
      title: "Location",
      details: "San Francisco, CA",
      link: "#"
    },
    {
      icon: "💬",
      title: "Response Time",
      details: "Within 24 hours",
      link: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your ideas into reality? Get in touch and let's discuss your project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="fusion-card" data-aos="fade-right">
            <CardHeader>
              <CardTitle className="text-2xl text-gradient-teal text-center">
                Start Your Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-muted border-border focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-muted border-border focus:border-primary"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-muted border-border focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Details *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-muted border-border focus:border-primary resize-none"
                    placeholder="Tell us about your project, timeline, and requirements..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  variant="neon"
                  size="lg"
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8" data-aos="fade-left">
            <div className="fusion-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-gradient-teal">
                Get In Touch
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We're here to help bring your vision to life. Whether you need a new website, 
                mobile app, or custom software solution, our team is ready to deliver 
                exceptional results.
              </p>
              
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="text-2xl">{info.icon}</div>
                    <div>
                      <h4 className="font-semibold text-foreground">{info.title}</h4>
                      <a 
                        href={info.link}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.details}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fusion-card p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-gradient-primary">
                Ready to Start?
              </h3>
              <p className="text-muted-foreground mb-6">
                Book a free consultation call to discuss your project
              </p>
              <Button variant="neon-outline" size="lg" className="w-full">
                Schedule Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;