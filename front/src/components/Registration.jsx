// import { useState } from "react";
// import { ShootingStars } from "./ui/shooting-stars";
// import { StarsBackground } from "./ui/stars-background";
// import Navbar from './navbar';

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     college: "",
//     regdNo: "",
//     phone: "",
//     accommodation: false,
//   });

//   const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/users/add-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setAlert({ show: true, message: "Registration Successful! Now you can register for events.", type: "success" });
//         setFormData({
//           name: "",
//           email: "",
//           college: "",
//           regdNo: "",
//           phone: "",
//           accommodation: false,
//         });
//       } else {
//         setAlert({ show: true, message: data.message, type: "error" });
//       }
//     } catch (error) {
//       console.error("Registration Failed:", error);
//       setAlert({ show: true, message: "Registration Failed. Please try again.", type: "error" });
//     }
//   };
  
//   return (
//     <div>
//     <Navbar />

    
      

//       <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center px-6">
//       <ShootingStars />
//       <StarsBackground />

//         {/* Important Notice */}
//         <div className="relative z-10 mt-6 bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-md border border-pink-500">
//           <p className="text-white text-sm text-center font-semibold">
//             ⚠️ <span className="text-pink-400">Important:</span> Register here before enrolling in any event.
//           </p>
//         </div>

//         {/* Registration Form */}
//         <div className="relative z-10 mt-6 p-6 bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-3xl font-bold text-center mb-6 text-white">Register</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
//             <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
//             <input type="text" name="college" placeholder="College Name" value={formData.college} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
//             <input type="text" name="regdNo" placeholder="Registration Number" value={formData.regdNo} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
//             <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
//             <label className="flex items-center space-x-2 text-white">
//               <input type="checkbox" name="accommodation" checked={formData.accommodation} onChange={handleChange} className="w-4 h-4 text-pink-500 bg-gray-800 border-white focus:ring-pink-500" />
//               <span>Need Accommodation?</span>
//             </label>
//             <button type="submit" className="w-full px-6 py-3 rounded-lg border border-white text-white transition duration-300 bg-transparent hover:bg-gray-700">
//               Submit
//             </button>
//           </form>
//         </div>

//         {/* Custom Alert Box */}
//         {alert.show && (
//           <div className={`fixed inset-0 flex items-center justify-center z-50`}>
//             <div className={`bg-gray-900 text-white p-6 rounded-lg shadow-lg border ${alert.type === "success" ? "border-green-500" : "border-red-500"} max-w-md w-full`}>
//               <p className="text-center">{alert.message}</p>
//               <button onClick={() => setAlert({ ...alert, show: false })} className="mt-4 w-full bg-gray-700 py-2 rounded-lg border border-white hover:bg-gray-600">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Registration;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import Navbar from "./navbar";

const Registration = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    regdNo: "",
    phone: "",
    accommodation: false,
  });

  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });
  const [phoneError, setPhoneError] = useState(""); // State for phone number error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Phone number validation: Allow only digits & ensure exactly 10 digits
    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) return;
      if (value.length === 10) {
        setPhoneError("");
      } else {
        setPhoneError("Phone number must be exactly 10 digits.");
      }
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ show: true, message: "Registration Successful! Now you can register for events.", type: "success" });
        setFormData({
          name: "",
          email: "",
          college: "",
          regdNo: "",
          phone: "",
          accommodation: false,
        });
      } else {
        setAlert({ show: true, message: data.message, type: "error" });
      }
    } catch (error) {
      console.error("Registration Failed:", error);
      setAlert({ show: true, message: "Registration Failed. Please try again.", type: "error" });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
    if (alert.type === "success") {
      navigate("/events"); // Redirect to events page on success
    }
  };

  return (
    <div>
      <Navbar />

      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center px-6">
        <ShootingStars />
        <StarsBackground />

        {/* Important Notice */}
        <div className="relative z-10 mt-6 bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-md border border-pink-500">
          <p className="text-white text-sm text-center font-semibold">
            ⚠️ <span className="text-pink-400">Important:</span> Register here before enrolling in any event.
          </p>
        </div>

        {/* Registration Form */}
        <div className="relative z-10 mt-6 p-6 bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              name="college"
              placeholder="College Name"
              value={formData.college}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              name="regdNo"
              placeholder="Registration Number"
              value={formData.regdNo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}

            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                name="accommodation"
                checked={formData.accommodation}
                onChange={handleChange}
                className="w-4 h-4 text-pink-500 bg-gray-800 border-white focus:ring-pink-500"
              />
              <span>Need Accommodation?</span>
            </label>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg border border-white text-white transition duration-300 bg-transparent hover:bg-gray-700"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Custom Alert Box */}
        {alert.show && (
          <div className={`fixed inset-0 flex items-center justify-center z-50`}>
            <div
              className={`bg-gray-900 text-white p-6 rounded-lg shadow-lg border ${
                alert.type === "success" ? "border-green-500" : "border-red-500"
              } max-w-md w-full`}
            >
              <p className="text-center">{alert.message}</p>
              <button
                onClick={handleCloseAlert}
                className="mt-4 w-full bg-gray-700 py-2 rounded-lg border border-white hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;

