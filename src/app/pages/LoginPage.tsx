import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("admin");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [clientPin, setClientPin] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For client login, check credentials
    if (isClient) {
      const email = credentials.email.toLowerCase();
      const pin = clientPin;
      
      // Validate email and pin are provided
      if (!email || !pin) {
        alert("Please enter both email and PIN");
        return;
      }
      
      // Check if this is an existing account (old client)
      const existingAccounts = JSON.parse(localStorage.getItem("existingClients") || "[]");
      const isExistingAccount = existingAccounts.some((acc: any) => 
        acc.email.toLowerCase() === email && acc.pin === pin
      );
      
      // Test account - old client
      if (email === "client1@gmail.com" && pin === "1234") {
        localStorage.setItem("userAccount", JSON.stringify({
          email: "client1@gmail.com",
          type: "old_client",
          bookingCount: 5,
          totalSpent: "₱12,500"
        }));
        navigate("/client");
        return;
      }
      
      // If account exists in system, it's an old client - go to dashboard
      if (isExistingAccount) {
        localStorage.setItem("userAccount", JSON.stringify({
          email: email,
          type: "old_client",
          bookingCount: 0,
          totalSpent: "₱0"
        }));
        navigate("/client");
        return;
      }
      
      // If account doesn't exist, show error
      alert("Account not found. Please sign up first.");
    } else {
      // For non-client roles, just navigate
      navigate(`/${activeRole}`);
    }
  };

  const isClient = activeRole === "client";

  // Lightning background effect
  const backgroundStyle = {
    backgroundImage: `
      radial-gradient(circle at 20% 50%, rgba(252, 179, 22, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(252, 179, 22, 0.05) 0%, transparent 50%),
      linear-gradient(135deg, #191919 0%, #1e1e1e 100%)
    `,
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#191919] relative" style={backgroundStyle}>
      {/* Lightning effect elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#fcb316] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#fcb316] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="border rounded-lg p-8 shadow-2xl bg-[#222222] border-[#2a2a2a]">
          <div className="text-center mb-8">
            <p className="text-4xl text-[#fcb316] tracking-[0.2em]" style={{ fontFamily: 'var(--font-headline)' }}>
              LUXIS
            </p>
          </div>

          <h2 className="text-3xl text-center mb-2 text-[#fffefe]" style={{ fontFamily: 'var(--font-headline)' }}>
            Welcome Back
          </h2>
          <p className="text-center mb-8 text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
            Sign in to your LUXIS account
          </p>

          <Tabs value={activeRole} onValueChange={setActiveRole} className="mb-6">
            <TabsList className="grid w-full grid-cols-4 bg-[#1e1e1e] border border-[#2a2a2a]">
              {["admin", "manager", "staff", "client"].map(role => (
                <TabsTrigger
                  key={role}
                  value={role}
                  className="data-[state=active]:bg-[#fcb316] data-[state=active]:text-[#191919] text-[#fffefe]/70 capitalize"
                  style={{ fontFamily: 'var(--font-subheading)' }}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-[#fffefe]">
                {isClient ? "Email or Phone" : "Email Address"}
              </Label>
              <Input
                id="email"
                type={isClient ? "text" : "email"}
                placeholder={isClient ? "you@example.com or +63 9XX XXX XXXX" : "you@example.com"}
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="mt-2 bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316]"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#fffefe]">
                {isClient ? "PIN" : "Password"}
              </Label>
              <Input
                id="password"
                type={isClient ? "password" : "password"}
                placeholder={isClient ? "••••" : "••••••••"}
                maxLength={isClient ? 4 : undefined}
                value={isClient ? clientPin : credentials.password}
                onChange={(e) => {
                  if (isClient) {
                    setClientPin(e.target.value.replace(/\D/g, ""));
                  } else {
                    setCredentials({ ...credentials, password: e.target.value });
                  }
                }}
                className="mt-2 bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316]"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-[#fffefe]/70">
                <input type="checkbox" className="accent-[#fcb316]" />
                <span className="text-sm">Remember me</span>
              </label>
              {!isClient && (
                <a href="#" className="text-sm text-[#fcb316] hover:underline">Forgot password?</a>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919] py-6"
              style={{ fontFamily: 'var(--font-subheading)' }}
            >
              Sign In as {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
            </Button>
          </form>

          {isClient && (
            <div className="mt-6 text-center text-sm border-t border-[#2a2a2a] pt-6">
              <p className="text-[#fffefe]/60 mb-3">Don't have an account?</p>
              <Link to="/client-signup" className="px-6 py-2 bg-[#fcb316]/20 text-[#fcb316] border border-[#fcb316] rounded-md hover:bg-[#fcb316]/30 transition-all inline-block" style={{ fontFamily: 'var(--font-subheading)' }}>
                Create Account with OTP
              </Link>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <Link to="/" className="text-[#fcb316] hover:underline">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
