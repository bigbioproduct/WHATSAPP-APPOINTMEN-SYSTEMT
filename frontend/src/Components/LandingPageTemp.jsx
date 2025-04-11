import React from 'react';

const features = [
  {
    title: "Easy Appointment Booking",
    description: "Schedule appointments with doctors in just a few taps.",
    icon: "📅",
  },
  {
    title: "Verified Doctors",
    description: "Consult only certified and trusted professionals.",
    icon: "✅",
  },
  {
    title: "WhatsApp Reminders",
    description: "Get automatic reminders on WhatsApp before your appointment.",
    icon: "📲",
  },
  {
    title: "Secure Platform",
    description: "All your data is safe and encrypted with us.",
    icon: "🔒",
  },
];

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-900 scroll-smooth">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <h2 className="text-5xl font-bold mb-4 animate-fade-up">Book Your Doctor Instantly</h2>
        <p className="text-xl mb-6 animate-fade-up delay-100">No wait. No hassle. Just click and consult.</p>
        <a
          href="/patient-register"
          className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition animate-fade-up delay-200"
        >
          Get Started
        </a>
      </section>

      {/* Animated WhatsApp Banner */}
      <section className="bg-green-100 overflow-hidden py-3">
        <div className="animate-marquee whitespace-nowrap text-lg font-medium text-green-800 flex items-center space-x-4">
          <span className="ml-4">📲 WhatsApp Us: 9671292977</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-10">Why Choose Us?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md transition hover:shadow-lg"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-white text-center">
        <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
        <p className="mb-4 text-gray-700">Contact us directly on WhatsApp:</p>
        <a
          href="https://wa.me/919617292977"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition"
        >
          Chat on WhatsApp
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Jhatpat Doctor. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
