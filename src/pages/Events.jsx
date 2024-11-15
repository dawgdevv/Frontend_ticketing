import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../pages/checkoutform.jsx";
import Modal from "../pages/modal.jsx";

const stripePromise = loadStripe(
  "pk_test_51QLIkbRwlFB03Gh52W76kjQaqVtMXt1tlXl61HihY6CcPcRfaRff6rDXKbBWcAnATNifWIP9TsV5Fu9w4UL8Wnmz00keNN6jlM"
);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/events");
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  const bookTicket = async (eventId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/tickets/book",
        {
          eventId,
          quantity: 1,
          seats: ["A1"],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        alert("Ticket booked successfully!");
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert(error.response?.data?.message || "Failed to book ticket.");
    }
  };

  const handlePaymentSuccess = () => {
    if (selectedEvent) {
      bookTicket(selectedEvent._id);
      setIsModalOpen(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">
        Upcoming Events
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-3 text-black">
              {event.name}
            </h2>
            <p className="text-gray-600 mb-2">
              <span className="font-medium text-gray-800">Date:</span>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium text-gray-800">Location:</span>{" "}
              {event.location}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium text-gray-800">Price:</span>{" "}
              {formatPrice(event.price)}
            </p>
            <button
              className="w-full bg-black text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
              onClick={() => {
                setSelectedEvent(event);
                setIsModalOpen(true);
              }}
            >
              Book Tickets
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={selectedEvent?.price * 100}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      </Modal>
    </div>
  );
};

export default Events;
