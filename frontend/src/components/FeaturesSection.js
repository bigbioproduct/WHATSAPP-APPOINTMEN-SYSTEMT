import React from 'react';

const features = [
  {
    title: "Easy Appointment Booking",
    description: "Patients can easily schedule appointments with doctors in just a few clicks.",
    icon: "📅"
  },
  {
    title: "Verified Doctors",
    description: "All doctors on our platform are verified with proper credentials.",
    icon: "✅"
  },
  {
    title: "WhatsApp Reminders",
    description: "Receive reminders and confirmations directly on WhatsApp.",
    icon: "📲"
  },
  {
    title: "Secure & Private",
    description: "All your health data is secure and not shared with third parties.",
    icon: "🔒"
  }
];

function FeaturesSection() {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md transition hover:shadow-xl"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
