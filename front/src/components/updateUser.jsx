import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import Navbar from "./navbar";

const UpdateUser = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    showToast("Sending OTP...", "success");

    try {
      const response = await fetch("http://localhost:5000/api/users/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("OTP sent to your email!", "success");
        setOtpSent(true); // ✅ Moved inside the success condition
      } else {
        showToast(data.message || "Email not registered. Please enter a valid email.", "error");
      }
    } catch (error) {
      showToast("Error sending OTP. Please try again.", error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (response.ok && data.user) {
        showToast("OTP verified successfully!", "success");
        setFormData(data.user);
        setOtpSent(false);
      } else {
        showToast(data.message || "OTP verification failed.", "error");
      }
    } catch (error) {
      showToast("OTP verification failed. Please try again.", "error");
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/update-user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("User details updated successfully!", "success");
        setTimeout(() => {
          navigate("/register"); // Redirect to dashboard or homepage
        }, 1500);
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast("Update failed. Please try again.", "error");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center px-6">
        <ShootingStars />
        <StarsBackground />

        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            } transition-opacity duration-300 shadow-lg`}
            style={{ top: "4.5rem", zIndex: 50 }}
          >
            {toast.message}
          </div>
        )}

        {/* OTP Verification */}
        {!formData ? (
          <div className="relative z-10 mt-6 p-6 bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-4 text-white">{otpSent ? "Enter OTP" : "Verify Email"}</h2>

            {!otpSent ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button type="submit" className="w-full px-6 py-3 rounded-lg border border-white text-white bg-transparent hover:bg-gray-700">
                  Verify Email
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button type="submit" className="w-full px-6 py-3 rounded-lg border border-white text-white bg-transparent hover:bg-gray-700">
                  Verify OTP
                </button>
              </form>
            )}
          </div>
        ) : (
          // Update User Form
          <div className="relative z-10 mt-6 p-6 bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-white">Update Your Details</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleUpdateChange} required className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:ring-2 focus:ring-pink-500" />
              <input type="email" name="email" value={formData.email} disabled className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-400 border border-gray-600" />
              <input type="text" name="college" placeholder="College Name" value={formData.college} onChange={handleUpdateChange} required className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:ring-2 focus:ring-pink-500" />
              <input type="text" name="regdNo" placeholder="Registration Number" value={formData.regdNo} onChange={handleUpdateChange} required className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:ring-2 focus:ring-pink-500" />
              <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleUpdateChange} required className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:ring-2 focus:ring-pink-500" />
              <label className="flex items-center space-x-2 text-white">
                <input type="checkbox" name="accommodation" checked={formData.accommodation} onChange={handleUpdateChange} className="w-4 h-4 text-pink-500 bg-gray-800 border-white focus:ring-pink-500" />
                <span>Need Accommodation?</span>
              </label>
              <button type="submit" className="w-full px-6 py-3 rounded-lg border border-white text-white bg-transparent hover:bg-gray-700">
                Update Details
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateUser;