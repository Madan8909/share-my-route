import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Camera, Car, Shield, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

const steps = ["Personal Info", "Vehicle", "Verification"];

const Register = () => {
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-lg mx-auto px-6 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                i <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className="text-xs text-muted-foreground hidden sm:block">{s}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-accent" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-bold text-foreground">Personal Information</h2>
              <p className="text-muted-foreground text-sm mb-6">Tell us about yourself</p>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Upload className="w-4 h-4 text-accent-foreground" />
                  </button>
                </div>
              </div>

              <input placeholder="Full Name" className="input-field" />
              <input placeholder="Email address" type="email" className="input-field" />
              <input placeholder="Phone number" type="tel" className="input-field" />
              <input placeholder="Password" type="password" className="input-field" />

              <button onClick={() => setStep(1)} className="btn-accent w-full mt-4">
                Continue
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-bold text-foreground">Vehicle Information</h2>
              <p className="text-muted-foreground text-sm mb-6">Add your vehicle details (optional for passengers)</p>

              <div className="card-ride flex items-center gap-4 mb-4">
                <Car className="w-8 h-8 text-accent" />
                <p className="text-sm text-muted-foreground">Skip this step if you're only looking for rides as a passenger.</p>
              </div>

              <input placeholder="Vehicle Make (e.g., Hyundai)" className="input-field" />
              <input placeholder="Vehicle Model (e.g., Creta)" className="input-field" />
              <input placeholder="Vehicle Color" className="input-field" />
              <input placeholder="License Plate (e.g., TN 09 AB 1234)" className="input-field" />

              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(0)} className="flex-1 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-all">
                  Back
                </button>
                <button onClick={() => setStep(2)} className="flex-1 btn-accent">
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-bold text-foreground">Verification</h2>
              <p className="text-muted-foreground text-sm mb-6">Verify your identity for a trusted community</p>

              <div className="card-ride space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground">Government ID</p>
                    <p className="text-xs text-muted-foreground">Upload Aadhaar or PAN card</p>
                  </div>
                  <button className="ml-auto text-sm btn-accent py-2 px-4">Upload</button>
                </div>
              </div>

              <div className="card-ride space-y-4">
                <p className="font-semibold text-foreground">Phone Verification</p>
                <p className="text-sm text-muted-foreground">We'll send an OTP to your registered phone number</p>
                {!showOtp ? (
                  <button onClick={() => setShowOtp(true)} className="btn-accent w-full py-2">
                    Send OTP
                  </button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-success">OTP sent! Use <strong>123456</strong> for demo.</p>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="input-field text-center tracking-widest text-lg"
                      maxLength={6}
                    />
                    <button onClick={handleVerifyOtp} className="btn-accent w-full py-2">
                      Verify & Complete
                    </button>
                  </div>
                )}
              </div>

              <button onClick={() => setStep(1)} className="w-full px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-all">
                Back
              </button>
            </div>
          )}
        </motion.div>
      </div>
      <Navbar />
    </div>
  );
};

export default Register;
