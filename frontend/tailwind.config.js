/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],  // यह लाइन सभी React फाइलों में Tailwind को एक्टिवेट करती है
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",  // हरे रंग का शेड
        secondary: "#333333",  // गहरे ग्रे रंग का शेड
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],  // कस्टम फॉन्ट
      },
      spacing: {
        128: "32rem",  // अतिरिक्त स्पेसिंग
        144: "36rem",
      },
      // 🎯 Animation और Keyframes के लिए अपडेट
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
