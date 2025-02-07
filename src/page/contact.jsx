import { FaPhoneAlt, FaEnvelope, FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Have questions or need assistance? Reach out to us!
        </p>
        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 border rounded-xl shadow-sm bg-gray-50">
            <FaPhoneAlt className="text-gray-900 text-xl" />
            <span className="text-gray-800 font-medium">+91 7451811626</span>
          </div>
          <div className="flex items-center space-x-4 p-4 border rounded-xl shadow-sm bg-gray-50">
            <FaEnvelope className="textray-text-gray-900 text-xl" />
            <span className="text-gray-800 font-medium">ttushar476@gmail.com</span>
          </div>
          <div className="flex items-center space-x-4 p-4 border rounded-xl shadow-sm bg-gray-50">
            <FaInstagram className="text-ray-text-gray-900 text-xl" />
            <a
              href="https://www.instagram.com/rajvyanjan_spoon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 font-medium hover:underline"
            >
              @rajvyanjan_spoon
            </a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">We'd love to hear from you!</p>
        </div>
      </div>
    </div>
  );
}