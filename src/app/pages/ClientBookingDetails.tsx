import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { MapPin, Calendar, Clock, ArrowRight, CheckCircle2, Home } from "lucide-react";

export default function ClientBookingDetails() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [bookingDetails, setBookingDetails] = useState({
    address: "",
    landArea: "",
    date: "",
    time: "",
    notes: ""
  });

  const landAreaOptions = [
    "Below 30 sqm",
    "30–50 sqm",
    "51–80 sqm",
    "81–120 sqm",
    "121–200 sqm",
    "201–400 sqm",
    "Above 400 sqm",
  ];
  const [step, setStep] = useState<"service" | "package" | "details" | "confirmation">("service");

  const services = [
    { id: "residential", name: "Condominiums and Houses", description: "Residential cleaning services" },
    { id: "office", name: "Offices", description: "Commercial office cleaning" },
    { id: "construction", name: "Post-Construction", description: "Post-construction cleanup" },
    { id: "moveout", name: "Move-in / Move-out Cleaning", description: "Move-in or move-out services" },
    { id: "establishments", name: "Other Establishments", description: "Restaurants and other businesses" },
    { id: "car", name: "Car Interior Detailing", description: "Car interior cleaning" }
  ];

  const packages = [
    {
      id: "package1",
      name: "Luxe Package 1",
      duration: "2 hours cleaning",
      team: "2 cleaners",
      price: "₱2,600",
      transport: "+ ₱600 Transport Fee"
    },
    {
      id: "package2",
      name: "Luxe Package 2",
      duration: "3 hours cleaning",
      team: "2 cleaners + Free 1 Hour",
      price: "₱3,900",
      transport: "+ ₱600 Transport Fee"
    }
  ];

  const backgroundStyle = {
    backgroundImage: `
      radial-gradient(circle at 20% 50%, rgba(252, 179, 22, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(252, 179, 22, 0.03) 0%, transparent 50%),
      linear-gradient(135deg, #191919 0%, #1e1e1e 100%)
    `,
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep("package");
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setStep("details");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDetails.address || !bookingDetails.landArea || !bookingDetails.date || !bookingDetails.time) {
      alert("Please fill in all required fields including property/land area size");
      return;
    }
    
    // Store booking details
    const bookingData = {
      id: "BK" + Date.now(),
      service: selectedService,
      serviceLabel: services.find(s => s.id === selectedService)?.name,
      package: selectedPackage,
      packageLabel: packages.find(p => p.id === selectedPackage)?.name,
      packagePrice: packages.find(p => p.id === selectedPackage)?.price,
      address: bookingDetails.address,
      landArea: bookingDetails.landArea,
      date: bookingDetails.date,
      time: bookingDetails.time,
      notes: bookingDetails.notes,
      status: "pending",
      bookedAt: new Date().toISOString()
    };
    
    localStorage.setItem("currentBooking", JSON.stringify(bookingData));
    setStep("confirmation");
    
    // Redirect to client dashboard after 2 seconds
    setTimeout(() => {
      navigate("/client", { state: { bookingConfirmed: true } });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#191919]" style={backgroundStyle}>
      {/* Subtle background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-40 w-72 h-72 bg-[#fcb316] rounded-full mix-blend-screen filter blur-3xl opacity-5" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#fcb316] rounded-full mix-blend-screen filter blur-3xl opacity-5" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Confirmation Screen */}
        {step === "confirmation" && (
          <div className="text-center">
            <div className="mb-6 animate-pulse">
              <CheckCircle2 className="text-[#fcb316] mx-auto" size={64} />
            </div>
            <h2 className="text-4xl text-[#fffefe] mb-3" style={{ fontFamily: "var(--font-headline)" }}>
              Booking Confirmed
            </h2>
            <p className="text-[#fffefe]/70 text-lg mb-8" style={{ fontFamily: "var(--font-body)" }}>
              Your luxury cleaning service has been successfully booked. Redirecting to your account...
            </p>
          </div>
        )}

        {step !== "confirmation" && (
          <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
              <Logo variant="light" showIcon size="md" />
              {step !== "service" && (
                <button
                  onClick={() => step === "package" ? setStep("service") : setSelectedService("") || setStep("service")}
                  className="text-[#fcb316] hover:text-[#de950c] transition-colors"
                  style={{ fontFamily: "var(--font-subheading)" }}
                >
                  ← Back
                </button>
              )}
            </div>

            {/* Step 1: Service Selection */}
            {step === "service" && (
              <div>
                <h2 className="text-4xl text-[#fffefe] mb-3" style={{ fontFamily: "var(--font-headline)" }}>
                  Select Your Service
                </h2>
                <p className="text-[#fffefe]/60 mb-8" style={{ fontFamily: "var(--font-body)" }}>
                  Choose the cleaning service you need
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      className="group relative overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#1e1e1e]/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-[#fcb316] hover:bg-[#1e1e1e]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#fcb316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10 text-left">
                        <h3 className="text-[#fffefe] font-semibold text-lg mb-2 group-hover:text-[#fcb316] transition-colors">{service.name}</h3>
                        <p className="text-[#fffefe]/60 text-sm mb-4">{service.description}</p>
                        <div className="flex items-center gap-2 text-[#fcb316] opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm font-medium">Select</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Package Selection */}
            {step === "package" && (
              <div>
                <h2 className="text-4xl text-[#fffefe] mb-3" style={{ fontFamily: "var(--font-headline)" }}>
                  Choose Your Package
                </h2>
                <p className="text-[#fffefe]/60 mb-4" style={{ fontFamily: "var(--font-body)" }}>
                  Service: <span className="text-[#fcb316]">{services.find(s => s.id === selectedService)?.name}</span>
                </p>

                <div className="space-y-4 mb-8">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => handlePackageSelect(pkg.id)}
                      className="group w-full rounded-xl border border-[#2a2a2a] bg-[#1e1e1e]/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-[#fcb316] hover:bg-[#1e1e1e] text-left"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#fcb316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" style={{ position: 'absolute' }} />
                      <div className="relative z-10 flex justify-between items-start">
                        <div>
                          <h3 className="text-[#fffefe] font-semibold text-lg mb-2 group-hover:text-[#fcb316] transition-colors">{pkg.name}</h3>
                          <p className="text-[#fffefe]/60 text-sm mb-3">{pkg.duration} • {pkg.team}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#fcb316] text-lg font-bold">{pkg.price}</p>
                          <p className="text-[#fffefe]/50 text-xs">{pkg.transport}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Booking Details */}
            {step === "details" && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-4xl text-[#fffefe] mb-3" style={{ fontFamily: "var(--font-headline)" }}>
                  Complete Your Booking
                </h2>
                <p className="text-[#fffefe]/60 mb-8" style={{ fontFamily: "var(--font-body)" }}>
                  {packages.find(p => p.id === selectedPackage)?.name} • {packages.find(p => p.id === selectedPackage)?.price}
                </p>

                <div className="space-y-6">
                  <div className="rounded-xl border border-[#2a2a2a] bg-[#1e1e1e]/50 backdrop-blur-sm p-6">
                    <Label htmlFor="address" className="text-[#fffefe] flex items-center gap-2 mb-3">
                      <MapPin size={18} className="text-[#fcb316]" />
                      Service Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="Enter your complete address"
                      value={bookingDetails.address}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, address: e.target.value })}
                      className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316]"
                      required
                    />
                  </div>

                  <div className="rounded-xl border border-[#2a2a2a] bg-[#1e1e1e]/50 backdrop-blur-sm p-6">
                    <Label htmlFor="landArea" className="text-[#fffefe] flex items-center gap-2 mb-3">
                      <Home size={18} className="text-[#fcb316]" />
                      Property/Land Area Size
                    </Label>
                    <select
                      id="landArea"
                      value={bookingDetails.landArea}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, landArea: e.target.value })}
                      className="w-full bg-[#191919] border border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316] p-4 rounded-lg focus:outline-none transition-colors cursor-pointer"
                      required
                    >
                      <option value="">-- Select area size --</option>
                      {landAreaOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <p className="text-[#fffefe]/50 text-xs mt-2">This helps us allocate the right team size for your property</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-[#2a2a2a] bg-[#1e1e1e]/50 backdrop-blur-sm p-6">
                      <Label htmlFor="date" className="text-[#fffefe] flex items-center gap-2 mb-3">
                        <Calendar size={18} className="text-[#fcb316]" />
                        Preferred Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingDetails.date}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                        className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] focus:border-[#fcb316]"
                        required
                      />
                    </div>

                    <div className="rounded-xl border border-[#2a2a2a] bg-[#1e1e1e]/50 backdrop-blur-sm p-6">
                      <Label htmlFor="time" className="text-[#fffefe] flex items-center gap-2 mb-3">
                        <Clock size={18} className="text-[#fcb316]" />
                        Preferred Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={bookingDetails.time}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                        className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] focus:border-[#fcb316]"
                        required
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#2a2a2a] bg-[#1e1e1e]/50 backdrop-blur-sm p-6">
                    <Label htmlFor="notes" className="text-[#fffefe] mb-3 block">Additional Notes (Optional)</Label>
                    <textarea
                      id="notes"
                      placeholder="Any special requests or requirements..."
                      value={bookingDetails.notes}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, notes: e.target.value })}
                      className="w-full bg-[#191919] border border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316] p-4 rounded-lg min-h-[100px] focus:outline-none transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919] py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                    style={{ fontFamily: "var(--font-subheading)" }}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
