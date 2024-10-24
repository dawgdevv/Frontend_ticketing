import React from 'react';
import { events } from '../constant/constant';

const Events = () => {


    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <div key={event.id} className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                        <p className="text-gray-600">Date: {event.date}</p>
                        <p className="text-gray-600">Location: {event.location}</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Book Tickets
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;