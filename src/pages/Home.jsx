import React from 'react';
import { events } from '../constant/constant.js';
const Home = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Welcome to Event Ticket Booking</h1>
            <p className="mb-4">Find and book tickets for your favorite events!</p>
            <div className="bg-blue-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Featured Events</h2>
                <ul className="list-disc list-inside">
                    {events.map((event) => (
                        <li key={event.id} className="mb-2">
                            <p className=" text-ellipsis font-semibold">{event.name}</p>
                            <p>Date: {event.date}</p>
                            <p>Location: {event.location}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;