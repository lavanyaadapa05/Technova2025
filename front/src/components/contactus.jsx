import React from "react";
import { StarsBackground } from "./ui/stars-background";
import { ShootingStars } from "./ui/shooting-stars";
import Navbar from './navbar';
const PersonCard = ({ name, role, phone, email, image }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={`relative w-64 ${isHovered ? "h-48" : "h-36"}  rounded-lg shadow-lg  transition-all duration-300 
      border-2 border-white bg-gray-800`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      
      <div className="w-full h-full bg-gray-700 bg-opacity-50 rounded-lg">
        <div
          className={`absolute w-20 h-20 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-200 
          ${isHovered ? "top-[-2rem] left-1/2 transform -translate-x-1/2" : "top-1/2 right-[-2rem] transform -translate-y-1/2"} 
          transition-all duration-300`}
        >
          <img src={image} alt="Profile" className="w-full h-full " />
        </div>
        <div className={`absolute inset-0 flex flex-col justify-center items-start text-white p-4 rounded-lg transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm font-light">{role}</p>
        </div>
        <div className={`absolute inset-0 flex flex-col justify-center items-start text-white p-4 rounded-lg transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm font-light">{role}</p>
          <p className="text-sm mt-2">{phone}</p>
          <p className="text-sm text-blue-400">{email}</p>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const people = [
    { name: "Bhavya Cheruku", role: "Web Dev", phone: "+91 12345 67896", email: "bhavyacheruku123@gmail.com", image: "/bhavya_profile.jpg" },
    { name: "Person 1", role: "Role 1", phone: "+91 12345 67890", email: "person1@example.com", image: "/path/to/image1.jpg" },
    { name: "Person 2", role: "Role 2", phone: "+91 12345 67891", email: "person2@example.com", image: "/path/to/image2.jpg" },
    { name: "Person 2", role: "Role 2", phone: "+91 12345 67891", email: "person2@example.com", image: "/path/to/image2.jpg" },
    { name: "Person 2", role: "Role 2", phone: "+91 12345 67891", email: "person2@example.com", image: "/path/to/image2.jpg" },
    { name: "Person 2", role: "Role 2", phone: "+91 12345 67891", email: "person2@example.com", image: "/path/to/image2.jpg" },
    { name: "Person 2", role: "Role 2", phone: "+91 12345 67891", email: "person2@example.com", image: "/path/to/image2.jpg" }
];

  return (
    
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <StarsBackground />
      <ShootingStars /> 
      <Navbar/>
      <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-lg flex justify-center">
        <h1 className="text-2xl font-bold"></h1>
      </nav>
      <div className="flex justify-center items-center py-16">
        <h1 className="text-5xl text-white">Contact Us</h1>
      </div>
      <div className="flex justify-center items-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {people.map((person, index) => (
            <PersonCard key={index} {...person} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
