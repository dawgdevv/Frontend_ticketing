import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUser({
          name: parsedUserData.username,
          email: parsedUserData.email,
        });
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("user"); // Clear invalid data
    }
  }, []);

  useEffect(() => {
    // Fetch user tickets from the backend
    const fetchUserTickets = async () => {
      try {
        const response = await axios.get("http://localhost:8000/tickets/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserTickets(response.data);
      } catch (error) {
        console.error("Error fetching user tickets:", error);
      }
    };

    fetchUserTickets();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-4 flex space-x-4">
        <button
          className={`px-2 py-1 ${
            activeTab === "profile" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`px-2 py-1 ${
            activeTab === "tickets" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setActiveTab("tickets")}
        >
          Tickets
        </button>
      </div>
      {activeTab === "profile" && (
        <div>
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={user.name}
              readOnly
              className="w-full p-1 bg-gray-100 border rounded"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={user.email}
              readOnly
              className="w-full p-1 bg-gray-100 border rounded"
            />
          </div>
        </div>
      )}
      {activeTab === "tickets" && (
        <div>
          {userTickets.length > 0 ? (
            <ul>
              {userTickets.map((ticket) => (
                <li key={ticket.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{ticket.eventName}</p>
                      <p className="text-sm text-gray-600">
                        Date: {ticket.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        Venue: {ticket.venue}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="bg-black text-white px-2 py-1 rounded text-sm hover:bg-gray-800"
                    >
                      Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tickets available.</p>
          )}
        </div>
      )}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded p-4 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2">
              {selectedTicket.eventName} Details
            </h2>
            <p>Date: {selectedTicket.date}</p>
            <p>Venue: {selectedTicket.venue}</p>
            <p>Seats: {selectedTicket.seats.join(", ")}</p>
            <button
              onClick={() => setSelectedTicket(null)}
              className="mt-4 bg-gray-200 text-black px-2 py-1 rounded text-sm hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
