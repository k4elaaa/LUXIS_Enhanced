import { Link, useNavigate } from "react-router";
import { Sparkles, Calendar, Users, TrendingUp, CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import Logo from "../components/Logo";
import { Button } from "../components/ui/button";
import { useState } from "react";
import aboutImg from "../components/assets/images/about-img.jpg";
import howBookImage from "../components/assets/images/LivingRoom1.png";
import howServiceImage from "../components/assets/images/HotelAfter.png";
import howFeedbackImage from "../components/assets/images/Bathroom.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  const packages = [
    {
      name: "Package 1",
      duration: "2 hours cleaning",
      team: "2 cleaners",
      price: "₱2,600 + ₱600 Transport Fee",
      rate: "Regular Rate"
    },
    {
      name: "Package 2",
      duration: "3 hours cleaning",
      team: "2 cleaners + Free 1 Hour",
      price: "₱3,900 + ₱600 Transport Fee",
      rate: "Regular Rate"
    }
  ];

  const services = [
    {
      name: "Condominiums and Houses",
      image: "url('https://images.pexels.com/photos/4239032/pexels-photo-4239032.jpeg?auto=compress&cs=tinysrgb&w=1200')"
    },
    {
      name: "Offices",
      image: "url('https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1200')"
    },
    {
      name: "Post-Construction",
      image: "url('https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1200')"
    },
    {
      name: "Move-in / Move-out Cleaning",
      image: "url('https://images.pexels.com/photos/6195288/pexels-photo-6195288.jpeg?auto=compress&cs=tinysrgb&w=1200')"
    },
    {
      name: "Other Establishments",
      image: "url('https://images.pexels.com/photos/7511693/pexels-photo-7511693.jpeg?auto=compress&cs=tinysrgb&w=1200')"
    },
    {
      name: "Car Interior Detailing",
      image: "url('https://images.pexels.com/photos/6873089/pexels-photo-6873089.jpeg?auto=compress&cs=tinysrgb&w=1200')"
    }
  ];

  const deepCleaningInclusions = [
    { group: "Main Services", items: ["Deep dry vacuum of all areas", "Dry Steaming of curtains & windows", "Shampooing, Deep dry vacuum and Steaming of mattresses and sofas", "Air Purification and air aromatizing"] },
    { group: "Specialized Services", items: ["Floor Steaming (kill dust mites)", "Kitchen deep cleaning", "CR deep cleaning (tile grouting)"] }
  ];

  const howItWorksSteps = [
    {
      title: "1. Book",
      description: "Schedule your premium cleaning service with our seamless booking system",
      image: howBookImage,
      icon: Calendar,
    },
    {
      title: "2. Services",
      description: "Choose the services you need and confirm the details",
      image: howServiceImage,
      icon: Users,
    },
    {
      title: "3. Feedback",
      description: "Share a quick rating after the service is done",
      image: howFeedbackImage,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-[#191919]">
      {/* Navigation */}
      <nav className="border-b border-[#222222] bg-[#191919]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo variant="light" showIcon size="md" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-[#fffefe] hover:text-[#fcb316] transition-colors" style={{ fontFamily: 'var(--font-subheading)' }}>Home</a>
            <a href="#services" className="text-[#fffefe] hover:text-[#fcb316] transition-colors" style={{ fontFamily: 'var(--font-subheading)' }}>Services</a>
            <a href="#packages" className="text-[#fffefe] hover:text-[#fcb316] transition-colors" style={{ fontFamily: 'var(--font-subheading)' }}>Packages</a>
            <a href="#about" className="text-[#fffefe] hover:text-[#fcb316] transition-colors" style={{ fontFamily: 'var(--font-subheading)' }}>About</a>
            <Link to="/login" className="text-[#fffefe] hover:text-[#fcb316] transition-colors" style={{ fontFamily: 'var(--font-subheading)' }}>Login</Link>
            <button onClick={() => navigate("/client-signup")} className="px-6 py-2 bg-[#fcb316] hover:bg-[#de950c] text-[#191919] rounded-md transition-all duration-200" style={{ fontFamily: 'var(--font-subheading)' }}>Book Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(25, 25, 25, 0.85), rgba(25, 25, 25, 0.85)), url('https://images.unsplash.com/photo-1765970101531-8d116223af49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9mZXNzaW9uYWwlMjBjbGVhbmVyJTIwbW9kZXJuJTIwdmFjdXVtfGVufDF8fHx8MTc3NjMxODgwNHww&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl mb-6 text-[#fffefe]" style={{ fontFamily: 'var(--font-headline)' }}>
              Luxury Service,<br />
              <span className="text-[#fcb316]">Seamlessly Managed</span>
            </h1>
            <p className="text-xl text-[#fffefe]/80 mb-4" style={{ fontFamily: 'var(--font-subheading)' }}>
              <span className="text-[#fcb316]">NEAT</span> — Network for Easy and Accessible Transactions
            </p>
            <p className="text-lg text-[#fffefe]/70 mb-8" style={{ fontFamily: 'var(--font-body)' }}>
              Premium FSM platform with built-in CRM for high-end cleaning businesses
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate("/client-signup")} className="px-8 py-4 bg-[#fcb316] hover:bg-[#de950c] text-[#191919] rounded-md transition-all duration-200 inline-flex items-center gap-2" style={{ fontFamily: 'var(--font-subheading)' }}>
                <Sparkles size={20} />
                Book Now
              </button>
              <Link to="/login" className="px-8 py-4 border-2 border-[#fcb316] text-[#fcb316] hover:bg-[#fcb316] hover:text-[#191919] rounded-md transition-all duration-200" style={{ fontFamily: 'var(--font-subheading)' }}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl text-center mb-16 text-[#fffefe]" style={{ fontFamily: 'var(--font-headline)' }}>
            How It <span className="text-[#fcb316]">Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step) => (
              <div key={step.title} className="relative min-h-[360px] overflow-hidden rounded-2xl border border-[#2a2a2a] group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${step.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#191919]/60 via-[#191919]/80 to-[#191919]/95" />
                <div className="relative z-10 h-full flex flex-col justify-end text-center p-8">
                  <div className="w-20 h-20 bg-[#fcb316] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(252,179,22,0.25)]">
                    <step.icon className="text-[#191919]" size={36} />
                  </div>
                  <h3 className="text-2xl mb-4 text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>{step.title}</h3>
                  <p className="text-[#fffefe]/80" style={{ fontFamily: 'var(--font-body)' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section id="features" className="py-24 bg-[#191919]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl text-center mb-16 text-[#fffefe]" style={{ fontFamily: 'var(--font-headline)' }}>
            Why Choose <span className="text-[#fcb316]">NEAT</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Easy Booking", desc: "Intuitive scheduling and service selection", icon: Calendar },
              { title: "Real-Time Scheduling", desc: "Live updates and dynamic staff allocation", icon: TrendingUp },
              { title: "Staff Deployment", desc: "Intelligent team assignment and routing", icon: Users },
              { title: "Progress Tracking", desc: "Monitor service delivery from start to finish", icon: CheckCircle }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#222222] p-8 rounded-lg border border-[#2a2a2a] hover:border-[#fcb316] transition-all duration-300">
                <feature.icon className="text-[#fcb316] mb-4" size={32} strokeWidth={1.5} />
                <h3 className="text-xl mb-3 text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>{feature.title}</h3>
                <p className="text-[#fffefe]/70" style={{ fontFamily: 'var(--font-body)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 bg-[#191919]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl text-center mb-4 text-[#fffefe]" style={{ fontFamily: 'var(--font-headline)' }}>
            Our <span className="text-[#fcb316]">Packages</span>
          </h2>
          <p className="text-center text-[#fffefe]/60 mb-16 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            Choose the perfect cleaning package for your needs
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {packages.map((pkg, idx) => (
              <div key={idx} className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-8 hover:border-[#fcb316] transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>{pkg.name}</h3>
                  <span className="px-4 py-2 bg-[#fcb316] text-[#191919] rounded-full text-sm font-semibold">{pkg.rate}</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[#fffefe]/70 text-sm">Duration</p>
                    <p className="text-[#fffefe] text-lg">{pkg.duration}</p>
                  </div>
                  <div>
                    <p className="text-[#fffefe]/70 text-sm">Team Size</p>
                    <p className="text-[#fffefe] text-lg">{pkg.team}</p>
                  </div>
                  <div className="pt-4 border-t border-[#2a2a2a]">
                    <p className="text-[#fcb316] text-2xl font-bold">{pkg.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Deep Cleaning Inclusions */}
          <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-8">
            <h3 className="text-3xl text-[#fffefe] mb-8" style={{ fontFamily: 'var(--font-subheading)' }}>
              Deep Cleaning <span className="text-[#fcb316]">Inclusions</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              {deepCleaningInclusions.map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-[#fcb316] font-semibold mb-4">{section.group}</h4>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3 text-[#fffefe]/80">
                        <CheckCircle className="text-[#fcb316] flex-shrink-0 mt-1" size={20} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl text-center mb-4 text-[#fffefe]" style={{ fontFamily: 'var(--font-headline)' }}>
            Our <span className="text-[#fcb316]">Services</span>
          </h2>
          <p className="text-center text-[#fffefe]/60 mb-16 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            We provide cleaning services for:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-lg h-48 cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: service.image }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191919] via-[#191919]/50 to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-xl text-[#fffefe] font-semibold" style={{ fontFamily: 'var(--font-subheading)' }}>
                    {service.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#191919]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <img 
                  src={aboutImg}
                  alt="Luxurious Cleaning Co. Team"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
            <div>
              <h3 className="text-[#fcb316] font-semibold mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>
                About Luxurious Cleaning Co.
              </h3>
              <h2 className="text-4xl md:text-5xl text-[#fffefe] mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                Leading provider of Cleaning and Disinfecting Services in huge commercial markets!
              </h2>
              <p className="text-[#fffefe]/80 mb-6 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                Luxurious Cleaning Co. is a cleaning service company that gained trust and strong pool of clients for its hotel-like cleaning services. We offer a luxurious approach in deep cleaning your home or workplace to help maintain a healthy and clean premises.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <CheckCircle className="text-[#fcb316] mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-[#fffefe] font-semibold">Professional Team</p>
                    <p className="text-[#fffefe]/70">Experienced and trained cleaning professionals</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="text-[#fcb316] mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-[#fffefe] font-semibold">Trusted Quality</p>
                    <p className="text-[#fffefe]/70">Consistent high-quality cleaning services</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="text-[#fcb316] mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-[#fffefe] font-semibold">Multiple Services</p>
                    <p className="text-[#fffefe]/70">Serving residential, commercial, and special cases</p>
                  </div>
                </div>
              </div>
              <button onClick={() => navigate("/client-signup")} className="mt-8 px-8 py-3 bg-[#fcb316] hover:bg-[#de950c] text-[#191919] rounded-lg font-semibold transition-all" style={{ fontFamily: 'var(--font-subheading)' }}>
                Book a Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#191919] border-t border-[#222222] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo variant="light" showIcon size="md" />
              <p className="text-[#fffefe]/60 mt-4" style={{ fontFamily: 'var(--font-body)' }}>
                Premium luxury cleaning services
              </p>
            </div>
            <div>
              <h4 className="text-[#fffefe] mb-4" style={{ fontFamily: 'var(--font-subheading)' }}>Quick Links</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-[#fffefe]/60 hover:text-[#fcb316] transition-colors">Home</a>
                <a href="#services" className="block text-[#fffefe]/60 hover:text-[#fcb316] transition-colors">Services</a>
                <a href="#packages" className="block text-[#fffefe]/60 hover:text-[#fcb316] transition-colors">Packages</a>
                <a href="#about" className="block text-[#fffefe]/60 hover:text-[#fcb316] transition-colors">About</a>
              </div>
            </div>
            <div>
              <h4 className="text-[#fffefe] mb-4" style={{ fontFamily: 'var(--font-subheading)' }}>Location</h4>
              <div className="space-y-2 text-[#fffefe]/60 text-sm">
                <p>Suite 1004 Atlanta Center, Annapolis St., San Juan City, Metro Manila, Philippines</p>
              </div>
            </div>
            <div>
              <h4 className="text-[#fffefe] mb-4" style={{ fontFamily: 'var(--font-subheading)' }}>Contact</h4>
              <div className="space-y-2 text-[#fffefe]/60 text-sm">
                <p>luxuriouscleaning@gmail.com</p>
                <p>0919 002 4136</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#222222] pt-8 text-center text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
            © 2026 NEAT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
