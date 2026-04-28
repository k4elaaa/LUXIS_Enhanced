import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { CheckCircle, X, ArrowLeft } from "lucide-react";
import ClientSidebar from "../../components/ClientSidebar";
import { Textarea } from "../../components/ui/textarea";

const services = [
  { id: "luxe1", name: "Luxe Package 1 – 2 hours", description: "2 hours cleaning with 2 cleaners", price: "₱2,600", transport: "₱600 transportation fee" },
  { id: "luxe2", name: "Luxe Package 2 – 3 hours", description: "3 hours cleaning with 2 cleaners + Free 1 Hour", price: "₱3,900", transport: "₱600 transportation fee" },
  { id: "condo", name: "Condominiums and Houses", description: "Residential cleaning services", transport: "" },
  { id: "office", name: "Offices", description: "Commercial office cleaning", transport: "" },
  { id: "postconstruction", name: "Post-Construction", description: "Post-construction cleanup", transport: "" },
  { id: "moveinout", name: "Move-in / Move-out Cleaning", description: "Move-in or move-out services", transport: "" },
  { id: "other", name: "Other Establishments", description: "Restaurants and other businesses", transport: "" },
  { id: "car", name: "Car Interior Detailing", description: "Car interior cleaning", transport: "" },
];

const landAreaOptions = [
  "Below 30 sqm",
  "30–50 sqm",
  "51–80 sqm",
  "81–120 sqm",
  "121–200 sqm",
  "201–400 sqm",
  "Above 400 sqm",
];

export default function ClientBooking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    contactNumber: "",
    date: "",
    time: "",
    address: "",
    landArea: "",
    paymentMode: "",
    notes: "",
  });

  useEffect(() => {
    const userAccount = localStorage.getItem("userAccount");
    if (userAccount) {
      const account = JSON.parse(userAccount);
      setBookingDetails(prev => ({
        ...prev,
        name: account.name || "",
        contactNumber: account.phone || "",
      }));
    }
  }, []);

  const handleNext = () => { if (step < 3) setStep(step + 1); };
  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const handleConfirmBooking = () => {
    setShowConfirmModal(false);
    setBookingSubmitted(true);
  };

  const selectedServiceObj = services.find(s => s.id === selectedService);

  if (bookingSubmitted) {
    return (
      <div className="flex min-h-screen bg-[#191919]">
        <ClientSidebar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-[#fcb316]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-[#fcb316]" size={40} />
            </div>
            <h2 className="text-3xl text-[#fffefe] mb-3 font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
              Booking Submitted!
            </h2>
            <p className="text-[#fffefe]/60 mb-8" style={{ fontFamily: 'var(--font-body)' }}>
              Your booking has been received. We'll confirm your appointment shortly.
            </p>
            <Button
              onClick={() => navigate("/client")}
              className="bg-gradient-to-r from-[#fcb316] to-[#de950c] hover:from-[#de950c] hover:to-[#b87507] text-[#191919] font-bold px-8 py-3 w-full"
              style={{ fontFamily: 'var(--font-subheading)' }}
            >
              <ArrowLeft size={18} className="mr-2" /> Go Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ClientSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 pt-16 md:pt-8">
          <div className="mb-8">
            <h1 className="text-4xl text-[#fffefe] mb-2 font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
              Book Your Service
            </h1>
            <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
              Schedule your luxury cleaning service in 3 easy steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all font-bold ${
                    step >= num ? "bg-[#fcb316] text-[#191919]" : "bg-[#2a2a2a] text-[#fffefe]/40"
                  }`} style={{ fontFamily: 'var(--font-subheading)' }}>
                    {step > num ? <CheckCircle size={20} /> : num}
                  </div>
                  {num < 3 && (
                    <div className={`flex-1 h-1 mx-2 transition-all ${
                      step > num ? "bg-[#fcb316]" : "bg-[#2a2a2a]"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>Select Service</span>
              <span className="text-sm text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>Details</span>
              <span className="text-sm text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>Confirm</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 md:p-8 shadow-xl">

              {/* Step 1: Select Service */}
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl text-[#fffefe] mb-2 font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
                      Choose Your Service
                    </h2>
                    <p className="text-[#fffefe]/60 text-sm">Select the cleaning service you need</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
                          selectedService === service.id
                            ? "border-[#fcb316] bg-gradient-to-br from-[#fcb316]/15 to-[#fcb316]/5 shadow-lg shadow-[#fcb316]/20"
                            : "border-[#2a2a2a] bg-[#191919] hover:border-[#fcb316]/50"
                        }`}
                      >
                        <h3 className="text-lg font-bold text-[#fffefe] leading-tight mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>
                          {service.name}
                        </h3>
                        <p className="text-[#fffefe]/60 text-sm mb-3 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                          {service.description}
                        </p>
                        {service.transport ? (
                          <>
                            {"price" in service && (
                              <p className="text-[#fcb316] font-bold text-lg" style={{ fontFamily: 'var(--font-headline)' }}>
                                {service.price}
                              </p>
                            )}
                            <p className="text-[#fffefe]/50 text-xs mt-2">+ {service.transport}</p>
                          </>
                        ) : (
                          <div className="h-6" />
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!selectedService}
                    className="w-full bg-gradient-to-r from-[#fcb316] to-[#de950c] hover:from-[#de950c] hover:to-[#b87507] text-[#191919] py-6 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'var(--font-subheading)' }}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2: Enter Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl text-[#fffefe] mb-2 font-bold" style={{ fontFamily: 'var(--font-subheading)' }}>
                      Service Details
                    </h2>
                    <p className="text-[#fffefe]/60 text-sm">Fill in your information to complete the booking</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-[#fffefe] font-semibold block mb-2">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={bookingDetails.name}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                        className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 focus:border-[#fcb316] focus:ring-1 focus:ring-[#fcb316]/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactNumber" className="text-[#fffefe] font-semibold block mb-2">Contact Number</Label>
                      <Input
                        id="contactNumber"
                        type="tel"
                        placeholder="e.g. 09171234567"
                        value={bookingDetails.contactNumber}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, contactNumber: e.target.value })}
                        className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 focus:border-[#fcb316] focus:ring-1 focus:ring-[#fcb316]/50"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="date" className="text-[#fffefe] font-semibold block mb-2">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingDetails.date}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                        className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] focus:border-[#fcb316] focus:ring-1 focus:ring-[#fcb316]/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-[#fffefe] font-semibold block mb-2">Preferred Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={bookingDetails.time}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                        className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] focus:border-[#fcb316] focus:ring-1 focus:ring-[#fcb316]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-[#fffefe] font-semibold block mb-2">Service Address</Label>
                    <Input
                      id="address"
                      placeholder="Full address"
                      value={bookingDetails.address}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, address: e.target.value })}
                      className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 focus:border-[#fcb316] focus:ring-1 focus:ring-[#fcb316]/50"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="landArea" className="text-[#fffefe] font-semibold block mb-2">Land Area</Label>
                      <select
                        id="landArea"
                        value={bookingDetails.landArea}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, landArea: e.target.value })}
                        className="w-full px-4 py-3 border border-[#2a2a2a] rounded-lg bg-[#191919] text-[#fffefe] focus:outline-none focus:border-[#fcb316] focus:ring-1 focus:ring-[#fcb316]/50 transition-all"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        <option value="" className="bg-[#191919]">-- Select area size --</option>
                        {landAreaOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#191919]">{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="paymentMode" className="text-[#fffefe] font-semibold block mb-2">Payment Mode</Label>
                      <select
                        id="paymentMode"
                        value={bookingDetails.paymentMode}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, paymentMode: e.target.value })}
                        className="w-full px-4 py-3 border border-[#2a2a2a] rounded-lg bg-[#191919] text-[#fffefe] focus:outline-none focus:border-[#fcb316] focus:ring-1 focus:ring-[#fcb316]/50 transition-all"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        <option value="" className="bg-[#191919]">-- Select payment method --</option>
                        <option value="credit_card" className="bg-[#191919]">Credit Card</option>
                        <option value="debit_card" className="bg-[#191919]">Debit Card</option>
                        <option value="gcash" className="bg-[#191919]">GCash</option>
                        <option value="bank_transfer" className="bg-[#191919]">Bank Transfer</option>
                        <option value="cash_on_site" className="bg-[#191919]">Cash on Site</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-[#fffefe] font-semibold block mb-2">Special Instructions</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requirements..."
                      value={bookingDetails.notes}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, notes: e.target.value })}
                      className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 focus:border-[#fcb316] focus:ring-1 focus:ring-[#fcb316]/50 min-h-[120px]"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleBack} className="flex-1 border border-[#2a2a2a] bg-transparent text-[#fffefe] hover:bg-[#2a2a2a] py-6 font-semibold" style={{ fontFamily: 'var(--font-subheading)' }}>
                      Back
                    </Button>
                    <Button onClick={handleNext} className="flex-1 bg-gradient-to-r from-[#fcb316] to-[#de950c] hover:from-[#de950c] hover:to-[#b87507] text-[#191919] py-6 font-bold" style={{ fontFamily: 'var(--font-subheading)' }}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl text-[#fffefe] mb-2 font-bold" style={{ fontFamily: 'var(--font-subheading)' }}>
                      Confirm Booking
                    </h2>
                    <p className="text-[#fffefe]/60 text-sm">Review your booking details before submitting</p>
                  </div>
                  
                  <div className="bg-[#191919] border border-[#2a2a2a] p-6 rounded-xl space-y-5">
                    <div className="border-b border-[#2a2a2a] pb-5">
                      <p className="text-[#fffefe]/60 text-sm font-semibold mb-1">SERVICE</p>
                      <p className="text-[#fffefe] text-lg font-semibold">{selectedServiceObj?.name}</p>
                      <p className="text-[#fcb316] text-xl font-bold mt-2">{selectedServiceObj?.price}</p>
                      {selectedServiceObj?.transport && (
                        <p className="text-[#fffefe]/60 text-sm mt-1">+ {selectedServiceObj.transport}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-[#fffefe]/60 text-xs font-semibold mb-2 uppercase">Full Name</p>
                        <p className="text-[#fffefe] font-medium">{bookingDetails.name || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-[#fffefe]/60 text-xs font-semibold mb-2 uppercase">Contact Number</p>
                        <p className="text-[#fffefe] font-medium">{bookingDetails.contactNumber || "Not provided"}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-[#fffefe]/60 text-xs font-semibold mb-2 uppercase">Date</p>
                        <p className="text-[#fffefe] font-medium">{bookingDetails.date || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-[#fffefe]/60 text-xs font-semibold mb-2 uppercase">Time</p>
                        <p className="text-[#fffefe] font-medium">{bookingDetails.time || "Not provided"}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[#fffefe]/60 text-xs font-semibold mb-2 uppercase">Address</p>
                      <p className="text-[#fffefe] font-medium">{bookingDetails.address || "Not provided"}</p>
                    </div>

                    {bookingDetails.landArea && (
                      <div>
                        <p className="text-[#fffefe]/60 text-xs font-semibold mb-2 uppercase">Land Area</p>
                        <p className="text-[#fffefe] font-medium">{bookingDetails.landArea}</p>
                      </div>
                    )}

                    {bookingDetails.paymentMode && (
                      <div>
                        <p className="text-[#fffefe]/60 text-xs font-semibold mb-2 uppercase">Payment Mode</p>
                        <p className="text-[#fffefe] font-medium capitalize">{bookingDetails.paymentMode.replace(/_/g, ' ')}</p>
                      </div>
                    )}

                    {bookingDetails.notes && (
                      <div>
                        <p className="text-[#fffefe]/60 text-xs font-semibold mb-2 uppercase">Special Instructions</p>
                        <p className="text-[#fffefe] font-medium">{bookingDetails.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleBack} className="flex-1 border border-[#2a2a2a] bg-transparent text-[#fffefe] hover:bg-[#2a2a2a] py-6 font-semibold" style={{ fontFamily: 'var(--font-subheading)' }}>
                      Back
                    </Button>
                    <Button
                      onClick={() => setShowConfirmModal(true)}
                      className="flex-1 bg-gradient-to-r from-[#fcb316] to-[#de950c] hover:from-[#de950c] hover:to-[#b87507] text-[#191919] py-6 font-bold"
                      style={{ fontFamily: 'var(--font-subheading)' }}
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#191919] border border-[#2a2a2a] rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-[#fffefe] font-bold" style={{ fontFamily: 'var(--font-subheading)' }}>Confirm Booking</h3>
              <button onClick={() => setShowConfirmModal(false)} className="text-[#fffefe]/40 hover:text-[#fffefe] transition-colors">
                <X size={24} />
              </button>
            </div>
            <p className="text-[#fffefe]/70 mb-6 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              Are you sure you want to confirm this booking for <strong className="text-[#fcb316]">{selectedServiceObj?.name}</strong>?
            </p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setShowConfirmModal(false)} className="flex-1 border-[#2a2a2a] text-[#fffefe] bg-[#222] hover:bg-[#333] font-semibold" style={{ fontFamily: 'var(--font-subheading)' }}>
                Cancel
              </Button>
              <Button onClick={handleConfirmBooking} className="flex-1 bg-gradient-to-r from-[#fcb316] to-[#de950c] hover:from-[#de950c] hover:to-[#b87507] text-[#191919] font-bold" style={{ fontFamily: 'var(--font-subheading)' }}>
                Yes, Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
