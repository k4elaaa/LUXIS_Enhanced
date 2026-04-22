import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "../components/Logo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ClientSignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"contact" | "otp" | "pin" | "success">("contact");
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Lightning background animation
  const backgroundStyle = {
    backgroundImage: `
      radial-gradient(circle at 20% 50%, rgba(252, 179, 22, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(252, 179, 22, 0.05) 0%, transparent 50%),
      linear-gradient(135deg, #191919 0%, #1e1e1e 100%)
    `,
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate input
    if (!contact.trim()) {
      setError(`Please enter a valid ${contactMethod}`);
      setLoading(false);
      return;
    }

    if (contactMethod === "email" && !contact.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (contactMethod === "phone" && contact.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    // Simulate API call to send OTP
    try {
      setTimeout(() => {
        setStep("otp");
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate OTP
    if (otp.length !== 6 || isNaN(Number(otp))) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    // Simulate API call to verify OTP
    try {
      setTimeout(() => {
        setStep("pin");
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmitPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate PINs
    if (pin.length !== 4 || isNaN(Number(pin))) {
      setError("PIN must be exactly 4 digits");
      setLoading(false);
      return;
    }

    if (pin !== confirmPin) {
      setError("PINs do not match");
      setLoading(false);
      return;
    }

    // Store new account in existingClients
    try {
      const existingAccounts = JSON.parse(localStorage.getItem("existingClients") || "[]");
      const newAccount = {
        email: contact.toLowerCase(),
        pin: pin,
        createdAt: new Date().toISOString(),
        bookingCount: 0,
        totalSpent: "₱0"
      };
      
      // Check if account already exists
      if (existingAccounts.some((acc: any) => acc.email === newAccount.email)) {
        setError("This email/phone is already registered");
        setLoading(false);
        return;
      }

      existingAccounts.push(newAccount);
      localStorage.setItem("existingClients", JSON.stringify(existingAccounts));
      
      // Set current user as the new account
      localStorage.setItem("userAccount", JSON.stringify({
        email: contact.toLowerCase(),
        type: "new_client",
        bookingCount: 0,
        totalSpent: "₱0"
      }));

      setTimeout(() => {
        setStep("success");
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to create account. Please try again.");
      setLoading(false);
    }
  };

  const handleContinue = () => {
    // Store client info and redirect to booking details
    localStorage.setItem("clientSignupContact", contact);
    navigate("/booking-details");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#191919] relative" style={backgroundStyle}>
      <Link to="/" className="absolute top-6 left-6 z-20 text-[#fcb316] hover:underline" style={{ fontFamily: "var(--font-subheading)" }}>
        ← Back to Home
      </Link>

      {/* Lightning effect elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#fcb316] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#fcb316] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="border rounded-lg p-8 shadow-2xl bg-[#222222] border-[#2a2a2a]">
          {/* Header */}
          <div className="flex justify-center mb-8">
            <Logo variant="light" showIcon size="lg" />
          </div>

          <h2
            className="text-3xl text-center mb-2 text-[#fffefe]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Welcome to NEAT
          </h2>
          <p className="text-center mb-8 text-[#fffefe]/60" style={{ fontFamily: "var(--font-body)" }}>
            {step === "contact" && "Sign up for your account"}
            {step === "otp" && "Enter the verification code"}
            {step === "success" && "Account created successfully!"}
          </p>

          {/* Step 1: Contact Info */}
          {step === "contact" && (
            <form onSubmit={handleSubmitContact} className="space-y-6">
              {/* Contact Method Selector */}
              <div>
                <Label className="text-[#fffefe] mb-3 block">Choose contact method</Label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setContactMethod("email");
                      setError("");
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      contactMethod === "email"
                        ? "bg-[#fcb316] border-[#fcb316] text-[#191919]"
                        : "bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] hover:border-[#fcb316]"
                    }`}
                    style={{ fontFamily: "var(--font-subheading)" }}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setContactMethod("phone");
                      setError("");
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      contactMethod === "phone"
                        ? "bg-[#fcb316] border-[#fcb316] text-[#191919]"
                        : "bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] hover:border-[#fcb316]"
                    }`}
                    style={{ fontFamily: "var(--font-subheading)" }}
                  >
                    Phone
                  </button>
                </div>
              </div>

              {/* Contact Input */}
              <div>
                <Label htmlFor="contact" className="text-[#fffefe]">
                  {contactMethod === "email" ? "Email Address" : "Phone Number"}
                </Label>
                <Input
                  id="contact"
                  type={contactMethod === "email" ? "email" : "tel"}
                  placeholder={contactMethod === "email" ? "you@example.com" : "+63 9XX XXX XXXX"}
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    setError("");
                  }}
                  className="mt-2 bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316]"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919] py-6"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                {loading ? "Sending OTP..." : "Send Verification Code"}
              </Button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === "otp" && (
            <form onSubmit={handleSubmitOtp} className="space-y-6">
              <p className="text-center text-[#fffefe]/70 text-sm">
                We've sent a 6-digit code to your {contactMethod}
              </p>

              <div>
                <Label htmlFor="otp" className="text-[#fffefe]">
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setOtp(value);
                    setError("");
                  }}
                  className="mt-2 bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316] text-center text-2xl tracking-widest font-mono"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919] py-6"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>

              <button
                type="button"
                onClick={() => setStep("contact")}
                className="w-full text-[#fcb316] hover:underline"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                Back to contact info
              </button>
            </form>
          )}

          {/* Step 3: Create PIN */}
          {step === "pin" && (
            <form onSubmit={handleSubmitPin} className="space-y-6">
              <p className="text-center text-[#fffefe]/70 text-sm">
                Create a 4-digit PIN for your account security
              </p>

              <div>
                <Label htmlFor="pin" className="text-[#fffefe]">
                  Create PIN
                </Label>
                <Input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  placeholder="••••"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPin(value);
                    setError("");
                  }}
                  className="mt-2 bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316] text-center text-2xl tracking-widest font-mono"
                />
              </div>

              <div>
                <Label htmlFor="confirmPin" className="text-[#fffefe]">
                  Confirm PIN
                </Label>
                <Input
                  id="confirmPin"
                  type="password"
                  inputMode="numeric"
                  placeholder="••••"
                  maxLength={4}
                  value={confirmPin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setConfirmPin(value);
                    setError("");
                  }}
                  className="mt-2 bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316] text-center text-2xl tracking-widest font-mono"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919] py-6"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <button
                type="button"
                onClick={() => setStep("otp")}
                className="w-full text-[#fcb316] hover:underline"
                style={{ fontFamily: "var(--font-subheading)" }}
              >
                Back
              </button>
            </form>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="p-4 bg-[#fcb316]/20 rounded-full">
                  <CheckCircle2 className="text-[#fcb316]" size={48} />
                </div>
              </div>

              <div>
                <h3 className="text-xl text-[#fffefe] mb-2" style={{ fontFamily: "var(--font-subheading)" }}>
                  Account Created!
                </h3>
                <p className="text-[#fffefe]/70">
                  Your account is ready. Let's set up your first cleaning service booking!
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleContinue}
                  className="w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919] py-6"
                  style={{ fontFamily: "var(--font-subheading)" }}
                >
                  Proceed to Booking
                </Button>
              </div>
            </div>
          )}

        </div>

          <div className={`mt-6 text-center text-sm ${step === "success" ? "hidden" : ""}`}>
            <p className="text-[#fffefe]/60">
              Already have an account?{" "}
              <Link to="/login" className="text-[#fcb316] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
}
