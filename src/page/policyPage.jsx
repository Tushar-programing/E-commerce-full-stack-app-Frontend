import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "Do you ship internationally?",
    answer: "We only ship within India. We deliver to every state in the country.",
  },
  {
    question: "When will my order be shipped?",
    answer: "Orders are typically shipped within 2-3 business days. For updates, contact us at +91 7451811626.",
  },
  {
    question: "What is your refund policy?",
    answer: "If your product is defective or damaged, it is returnable. Please contact us at +91 7451811626 for assistance.",
  },
  {
    question: "I entered the wrong address, or I want to cancel my order. What should I do?",
    answer: "If you made a mistake in the address or need to cancel your order, please contact us immediately at +91 7451811626 before the order is shipped.",
  },
  {
    question: "Can I return the product?",
    answer: "Returns are only accepted if the product is defective or damaged upon arrival. Contact us for further assistance.",
  },
  {
    question: "My item was damaged upon arrival, what should I do?",
    answer: "If your item arrives damaged, please contact us immediately with photos of the damage at +91 7451811626.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major payment methods including UPI, credit/debit cards, and cash on delivery (COD).",
  },
  {
    question: "How can I request a return?",
    answer: "To request a return, please contact our support team at +91 7451811626 or email us at ttushar476@gmail.com with your order details and reason for return.",
  },
  {
    question: "Can I buy products in bulk?",
    answer: "Yes, we offer bulk purchasing options. For wholesale inquiries, please contact us at +91 7451811626 or email us at ttushar476@gmail.com.",
  }
];

export default function PolicyPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Shipping & Return Policies</h1>
      <p className="text-gray-600 text-center mt-4">All common questions regarding shipping, return, and guarantees are answered by our expert delivery department.</p>
      <div className="w-full max-w-3xl mt-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 py-5">
            <button
              className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-gray-800 font-medium">{faq.question}</span>
              {openIndex === index ? <FaMinus className="text-gray-500" /> : <FaPlus className="text-gray-500" />}
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-700 bg-gray-50">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
