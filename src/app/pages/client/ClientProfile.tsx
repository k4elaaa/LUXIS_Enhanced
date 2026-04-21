import { useState } from 'react';
import { User, Lock, Mail, Phone, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import ClientSidebar from '../../components/ClientSidebar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

interface UserData {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
}

interface Message {
  type: 'success' | 'error';
  text: string;
}

export default function ClientProfile() {
  const [userData, setUserData] = useState<UserData>({
    name: 'Mikaela Villegas',
    email: 'mikaela.villegas@luxisclean.com',
    phone: '+63 917 234 5678',
    memberSince: '2024-01-15'
  });

  const [message, setMessage] = useState<Message | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Email Management
  const [emailSection, setEmailSection] = useState({
    isEditing: false,
    newEmail: '',
    showOTP: false,
    otp: '',
    otpSent: false
  });

  // Phone Management
  const [phoneSection, setPhoneSection] = useState({
    isEditing: false,
    newPhone: '',
    showOTP: false,
    otp: '',
    otpSent: false
  });

  // PIN Management
  const [pinSection, setPinSection] = useState({
    isChanging: false,
    currentPin: '',
    newPin: '',
    confirmPin: '',
    showOTP: false,
    otp: '',
    otpSent: false
  });

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  // Email Handlers
  const handleEmailEdit = () => {
    setEmailSection({ ...emailSection, isEditing: true });
  };

  const handleEmailCancel = () => {
    setEmailSection({
      isEditing: false,
      newEmail: '',
      showOTP: false,
      otp: '',
      otpSent: false
    });
  };

  const handleEmailSendOTP = () => {
    if (!emailSection.newEmail) {
      showMessage('error', 'Please enter a new email address');
      return;
    }
    if (!emailSection.newEmail.includes('@')) {
      showMessage('error', 'Please enter a valid email address');
      return;
    }
    setEmailSection({ ...emailSection, showOTP: true, otpSent: true });
    showMessage('success', 'OTP sent to your new email address');
  };

  const handleEmailVerifyOTP = () => {
    if (emailSection.otp.length !== 6) {
      showMessage('error', 'Please enter a valid 6-digit OTP');
      return;
    }
    setUserData({ ...userData, email: emailSection.newEmail });
    setEmailSection({
      isEditing: false,
      newEmail: '',
      showOTP: false,
      otp: '',
      otpSent: false
    });
    showMessage('success', 'Email updated successfully!');
  };

  // Phone Handlers
  const handlePhoneEdit = () => {
    setPhoneSection({ ...phoneSection, isEditing: true });
  };

  const handlePhoneCancel = () => {
    setPhoneSection({
      isEditing: false,
      newPhone: '',
      showOTP: false,
      otp: '',
      otpSent: false
    });
  };

  const handlePhoneSendOTP = () => {
    if (!phoneSection.newPhone) {
      showMessage('error', 'Please enter a new phone number');
      return;
    }
    if (phoneSection.newPhone.replace(/\D/g, '').length < 10) {
      showMessage('error', 'Please enter a valid phone number');
      return;
    }
    setPhoneSection({ ...phoneSection, showOTP: true, otpSent: true });
    showMessage('success', 'OTP sent to your new phone number');
  };

  const handlePhoneVerifyOTP = () => {
    if (phoneSection.otp.length !== 6) {
      showMessage('error', 'Please enter a valid 6-digit OTP');
      return;
    }
    setUserData({ ...userData, phone: phoneSection.newPhone });
    setPhoneSection({
      isEditing: false,
      newPhone: '',
      showOTP: false,
      otp: '',
      otpSent: false
    });
    showMessage('success', 'Phone number updated successfully!');
  };

  // PIN Handlers
  const handlePinChange = () => {
    if (!pinSection.currentPin) {
      showMessage('error', 'Please enter your current PIN');
      return;
    }
    if (pinSection.currentPin.length !== 4) {
      showMessage('error', 'PIN must be 4 digits');
      return;
    }
    if (!pinSection.newPin || !pinSection.confirmPin) {
      showMessage('error', 'Please enter a new PIN');
      return;
    }
    if (pinSection.newPin.length !== 4 || pinSection.confirmPin.length !== 4) {
      showMessage('error', 'PIN must be 4 digits');
      return;
    }
    if (pinSection.newPin !== pinSection.confirmPin) {
      showMessage('error', 'New PINs do not match');
      return;
    }
    if (pinSection.currentPin === pinSection.newPin) {
      showMessage('error', 'New PIN must be different from current PIN');
      return;
    }
    setPinSection({ ...pinSection, showOTP: true, otpSent: true });
    showMessage('success', 'OTP sent to confirm PIN change');
  };

  const handlePinVerifyOTP = () => {
    if (pinSection.otp.length !== 6) {
      showMessage('error', 'Please enter a valid 6-digit OTP');
      return;
    }
    setPinSection({
      isChanging: false,
      currentPin: '',
      newPin: '',
      confirmPin: '',
      showOTP: false,
      otp: '',
      otpSent: false
    });
    showMessage('success', 'PIN changed successfully!');
  };

  const handlePinCancel = () => {
    setPinSection({
      isChanging: false,
      currentPin: '',
      newPin: '',
      confirmPin: '',
      showOTP: false,
      otp: '',
      otpSent: false
    });
  };

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <ClientSidebar />
      <div className="w-full md:ml-64 flex-1 overflow-auto">
        <div className="p-4 md:p-8 pt-16 md:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#fffefe] mb-2">Account Profile</h1>
            <p className="text-[#fffefe]/60">Manage your personal information and security settings</p>
          </div>

          {/* Message Alert */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border backdrop-blur-sm ${
              message.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle size={20} className="flex-shrink-0" />
              ) : (
                <AlertCircle size={20} className="flex-shrink-0" />
              )}
              <span className="text-sm md:text-base">{message.text}</span>
            </div>
          )}

          {/* Profile Header Card */}
          <div className="mb-8 bg-gradient-to-r from-[#fcb316]/15 to-[#fcb316]/5 border border-[#fcb316]/30 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#fcb316] to-[#de950c] flex items-center justify-center flex-shrink-0">
                <User size={40} className="text-[#191919]" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold text-[#fffefe] truncate">{userData.name}</h2>
                <p className="text-[#fffefe]/60 text-sm md:text-base mt-1">Member since {new Date(userData.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {/* Settings Cards Grid */}
          <div className="space-y-6">
            {/* Email Section */}
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#fcb316]/30 transition-colors">
              <div className="p-6 border-b border-[#2a2a2a] bg-gradient-to-r from-[#fcb316]/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#fcb316]/10 rounded-lg">
                    <Mail size={20} className="text-[#fcb316]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#fffefe]">Email Address</h3>
                </div>
              </div>
              <div className="p-6">
                {!emailSection.isEditing ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-[#fffefe]/60 text-sm mb-1">Current Email</p>
                      <p className="text-[#fffefe] font-medium break-all">{userData.email}</p>
                    </div>
                    <Button
                      onClick={handleEmailEdit}
                      className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold w-full sm:w-auto"
                    >
                      Change Email
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="newEmail" className="text-[#fffefe] block mb-2 font-medium">
                        New Email Address
                      </Label>
                      <Input
                        id="newEmail"
                        type="email"
                        value={emailSection.newEmail}
                        onChange={(e) => setEmailSection({ ...emailSection, newEmail: e.target.value })}
                        placeholder="your.new.email@example.com"
                        className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 w-full"
                      />
                    </div>
                    {emailSection.showOTP && (
                      <div>
                        <Label htmlFor="emailOtp" className="text-[#fffefe] block mb-2 font-medium">
                          Verification Code (6 digits)
                        </Label>
                        <Input
                          id="emailOtp"
                          type="text"
                          value={emailSection.otp}
                          onChange={(e) => setEmailSection({ ...emailSection, otp: e.target.value.slice(0, 6) })}
                          placeholder="000000"
                          maxLength={6}
                          className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 w-full text-center text-2xl tracking-[.5em] font-semibold"
                        />
                        <p className="text-[#fffefe]/50 text-xs mt-2">Check your email for the verification code</p>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {emailSection.showOTP ? (
                        <>
                          <Button
                            onClick={handleEmailVerifyOTP}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
                          >
                            Verify & Confirm
                          </Button>
                          <Button
                            onClick={handleEmailCancel}
                            className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#fffefe] font-semibold"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={handleEmailSendOTP}
                            className="flex-1 bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold"
                          >
                            Send Verification Code
                          </Button>
                          <Button
                            onClick={handleEmailCancel}
                            className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#fffefe] font-semibold"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Phone Section */}
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#fcb316]/30 transition-colors">
              <div className="p-6 border-b border-[#2a2a2a] bg-gradient-to-r from-[#fcb316]/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#fcb316]/10 rounded-lg">
                    <Phone size={20} className="text-[#fcb316]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#fffefe]">Phone Number</h3>
                </div>
              </div>
              <div className="p-6">
                {!phoneSection.isEditing ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-[#fffefe]/60 text-sm mb-1">Current Phone</p>
                      <p className="text-[#fffefe] font-medium">{userData.phone}</p>
                    </div>
                    <Button
                      onClick={handlePhoneEdit}
                      className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold w-full sm:w-auto"
                    >
                      Change Phone
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="newPhone" className="text-[#fffefe] block mb-2 font-medium">
                        New Phone Number
                      </Label>
                      <Input
                        id="newPhone"
                        type="tel"
                        value={phoneSection.newPhone}
                        onChange={(e) => setPhoneSection({ ...phoneSection, newPhone: e.target.value })}
                        placeholder="+63 9XX XXX XXXX"
                        className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 w-full"
                      />
                    </div>
                    {phoneSection.showOTP && (
                      <div>
                        <Label htmlFor="phoneOtp" className="text-[#fffefe] block mb-2 font-medium">
                          Verification Code (6 digits)
                        </Label>
                        <Input
                          id="phoneOtp"
                          type="text"
                          value={phoneSection.otp}
                          onChange={(e) => setPhoneSection({ ...phoneSection, otp: e.target.value.slice(0, 6) })}
                          placeholder="000000"
                          maxLength={6}
                          className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 w-full text-center text-2xl tracking-[.5em] font-semibold"
                        />
                        <p className="text-[#fffefe]/50 text-xs mt-2">Check your SMS for the verification code</p>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {phoneSection.showOTP ? (
                        <>
                          <Button
                            onClick={handlePhoneVerifyOTP}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
                          >
                            Verify & Confirm
                          </Button>
                          <Button
                            onClick={handlePhoneCancel}
                            className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#fffefe] font-semibold"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={handlePhoneSendOTP}
                            className="flex-1 bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold"
                          >
                            Send Verification Code
                          </Button>
                          <Button
                            onClick={handlePhoneCancel}
                            className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#fffefe] font-semibold"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security PIN Section */}
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#fcb316]/30 transition-colors">
              <div className="p-6 border-b border-[#2a2a2a] bg-gradient-to-r from-[#fcb316]/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#fcb316]/10 rounded-lg">
                    <Lock size={20} className="text-[#fcb316]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#fffefe]">Security PIN</h3>
                </div>
              </div>
              <div className="p-6">
                {!pinSection.isChanging ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-[#fffefe]/60 text-sm mb-1">4-Digit Security PIN</p>
                      <p className="text-[#fffefe] font-medium">••••</p>
                      <p className="text-[#fffefe]/50 text-xs mt-2">Protects sensitive account operations</p>
                    </div>
                    <Button
                      onClick={() => setPinSection({ ...pinSection, isChanging: true })}
                      className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold w-full sm:w-auto"
                    >
                      Change PIN
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPin" className="text-[#fffefe] block mb-2 font-medium">
                        Current PIN (4 digits)
                      </Label>
                      <div className="relative">
                        <Input
                          id="currentPin"
                          type={showPassword ? 'text' : 'password'}
                          value={pinSection.currentPin}
                          onChange={(e) => setPinSection({ ...pinSection, currentPin: e.target.value.slice(0, 4).replace(/\D/g, '') })}
                          placeholder="••••"
                          maxLength={4}
                          className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 w-full text-center text-2xl tracking-[.5em] font-semibold pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fffefe]/60 hover:text-[#fffefe]"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="newPin" className="text-[#fffefe] block mb-2 font-medium">
                        New PIN (4 digits)
                      </Label>
                      <Input
                        id="newPin"
                        type={showPassword ? 'text' : 'password'}
                        value={pinSection.newPin}
                        onChange={(e) => setPinSection({ ...pinSection, newPin: e.target.value.slice(0, 4).replace(/\D/g, '') })}
                        placeholder="••••"
                        maxLength={4}
                        className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 w-full text-center text-2xl tracking-[.5em] font-semibold"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPin" className="text-[#fffefe] block mb-2 font-medium">
                        Confirm PIN (4 digits)
                      </Label>
                      <Input
                        id="confirmPin"
                        type={showPassword ? 'text' : 'password'}
                        value={pinSection.confirmPin}
                        onChange={(e) => setPinSection({ ...pinSection, confirmPin: e.target.value.slice(0, 4).replace(/\D/g, '') })}
                        placeholder="••••"
                        maxLength={4}
                        className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 w-full text-center text-2xl tracking-[.5em] font-semibold"
                      />
                    </div>
                    {pinSection.showOTP && (
                      <div>
                        <Label htmlFor="pinOtp" className="text-[#fffefe] block mb-2 font-medium">
                          Verification Code (6 digits)
                        </Label>
                        <Input
                          id="pinOtp"
                          type="text"
                          value={pinSection.otp}
                          onChange={(e) => setPinSection({ ...pinSection, otp: e.target.value.slice(0, 6) })}
                          placeholder="000000"
                          maxLength={6}
                          className="bg-[#191919] border-[#2a2a2a] text-[#fffefe] placeholder-[#fffefe]/30 w-full text-center text-2xl tracking-[.5em] font-semibold"
                        />
                        <p className="text-[#fffefe]/50 text-xs mt-2">Check your email for the verification code</p>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {pinSection.showOTP ? (
                        <>
                          <Button
                            onClick={handlePinVerifyOTP}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
                          >
                            Verify & Confirm
                          </Button>
                          <Button
                            onClick={handlePinCancel}
                            className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#fffefe] font-semibold"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={handlePinChange}
                            className="flex-1 bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold"
                          >
                            Send Verification Code
                          </Button>
                          <Button
                            onClick={handlePinCancel}
                            className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#fffefe] font-semibold"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
