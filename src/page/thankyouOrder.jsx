import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { GiKnifeFork, GiCookingPot, GiKitchenScale } from "react-icons/gi";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const {slug} = useParams(); // Get order ID from URL
  const [countdown, setCountdown] = useState(5); // Countdown starts from 5 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate(`/userpro/${slug}`); // Redirect to order details page
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, slug]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      {/* Success Icon */}
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />

      {/* Thank You Message */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Thank You for Your Order!</h1>
      <p className="text-lg md:text-xl text-gray-600 mt-2">Your kitchen essentials are on their way!</p>

      {/* Kitchen Icons */}
      <div className="flex space-x-4 mt-6 text-gray-700 text-4xl">
        <GiKnifeFork />
        <GiCookingPot />
        <GiKitchenScale />
      </div>

      {/* Kitchen Image */}
      <img
        src="https://img.freepik.com/free-vector/kitchen-tools-background-cooking-utensils_1017-38442.jpg"
        alt="Kitchen Items"
        className="mt-6 w-60 md:w-80 lg:w-96 rounded-lg shadow-lg"
      />

      {/* View Order Button */}
      <Link
        to={`/userpro/${slug}`}
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        View Order
      </Link>

      {/* Dynamic Countdown Message */}
      <p className="text-sm text-gray-500 mt-4">
        Redirecting to your order page in <span className="font-bold">{countdown}</span> seconds...
      </p>
    </div>
  );
};

export default ThankYouPage;
