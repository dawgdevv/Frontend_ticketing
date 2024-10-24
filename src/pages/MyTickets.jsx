import React from 'react';
import { tickets } from '../constant/constant';

const MyTickets = () => {


    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">My Tickets</h1>
            {tickets.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {tickets.map((ticket) => (
                        <li key={ticket.id} className="py-4">
                            <div className="flex justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">{ticket.eventName}</h2>
                                    <p className="text-gray-600">Date: {ticket.date}</p>
                                    <p className="text-gray-600">Quantity: {ticket.quantity}</p>
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    View Details
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You don't have any tickets yet.</p>
            )}
        </div>
    );
};

export default MyTickets;