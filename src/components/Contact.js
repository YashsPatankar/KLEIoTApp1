import React, { useState } from "react";
import axios from "axios";
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/api/contact", formData);
      setStatus("Message sent successfully!");
    } catch (error) {
      setStatus("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-teal-600 mb-2">Contact Us</h1>
        <p className="text-gray-500 text-lg">We'd love to hear from you. Send us a message!</p>
      </div>

      {/* CEO Section */}
      <div className="max-w-4xl mx-auto mb-12 px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
            <div className="relative h-48 w-48 bg-gray-200 rounded-lg shadow-lg overflow-hidden">
  <img 
    src="/sfr.jpeg" 
    alt="nothing" 
    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-0 mt-4 w-32 h-32 object-cover rounded-full border-4 border-white"
  />
</div>

            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-teal-600 font-semibold">Leadership</div>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">Sunil F Rodd</h2>
              <p className="mt-1 text-gray-600 font-medium">CEO & Founder</p>
              
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Mail className="h-6 w-6 text-teal-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Email Us</h3>
            <p className="text-gray-600 mt-1">sfroddjforkts@gmail.com</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Phone className="h-6 w-6 text-teal-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Call Us</h3>
            <p className="text-gray-600 mt-1">+91 948 027 5919</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MapPin className="h-6 w-6 text-teal-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Visit Us</h3>
            <p className="text-gray-600 mt-1">CIN: U80902KA2022PTC164766</p>
          </div>
        </div>

        {/* Office Addresses */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Building2 className="h-6 w-6 text-teal-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Head Office</h3>
            <p className="text-gray-600 mt-1">
              jFork Technology Services<br />
              CTS 549, A1. Sonar galli,<br />
              M. Vadagaon, Belgaum - 590005<br />
              Karnataka
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Building2 className="h-6 w-6 text-teal-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Branch Office</h3>
            <p className="text-gray-600 mt-1">
              Flat No.103, Amar Elite Apartment<br />
              3rd Cross, Bhagyanagar<br />
              Belagavi - 590006
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-xl mx-auto bg-white p-8 shadow-xl rounded-xl border border-gray-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-36"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Status Message */}
        {status && (
          <p className="mt-4 text-center text-teal-600 font-semibold">{status}</p>
        )}
      </div>
    </div>
  );
}

export default Contact;