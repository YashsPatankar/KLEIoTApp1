import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-white to-teal-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover how we help communities thrive with seamless apartment management.
          </p>
        </header>

        <section className="bg-white shadow-2xl rounded-lg p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-teal-500 mb-4">
              Who Are We?
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Apartment Management System, we provide cutting-edge tools to streamline apartment operations for residents and administrators alike. Our platform is designed to create a better living experience by making everyday tasks simple and efficient. Whether it's handling maintenance requests, communicating with tenants, or managing finances, we make sure everything runs smoothly.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-teal-500 mb-4">
              What Do We Offer?
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Comprehensive tools for tenant and flat owner management.</li>
              <li>Transparent financial tracking and reporting for better decision making.</li>
              <li>Seamless communication channels for apartment communities to interact.</li>
              <li>Customized solutions tailored to your unique needs and preferences.</li>
              <li>Automated maintenance request tracking and management.</li>
              <li>Advanced analytics to track apartment performance and improve operations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-teal-500 mt-8 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We are committed to building a platform that fosters harmony, transparency, and convenience for all apartment residents and administrators. Our mission is to enable smarter decisions and create a community-driven experience for everyone involved.
            </p>
          </div>
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 rounded-lg shadow-xl text-white">
            <h2 className="text-3xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-100 mb-6">
              Our system offers a range of features that ensure smooth communication, financial tracking, and maintenance management. Here's a quick overview of how it works:
            </p>
            <ol className="list-decimal list-inside space-y-2 mt-4">
              <li>Sign up for an account as a resident or administrator.</li>
              <li>Create your apartment unit or join an existing one.</li>
              <li>Manage tenant information, requests, and payments easily from your dashboard.</li>
              <li>Communicate with residents, schedule maintenance, and handle finances with ease.</li>
              <li>Access detailed reports and analytics to monitor apartment performance and occupancy rates.</li>
            </ol>
          </div>
        </section>

        <footer className="text-center py-6 mt-12 bg-teal-600 text-white rounded-lg shadow-md">
          <p className="text-lg">&copy; {new Date().getFullYear()} Apartment Management System</p>
        </footer>
      </div>
    </div>
  );
}

export default About;