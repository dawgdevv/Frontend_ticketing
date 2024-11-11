'use client'

import { useState } from 'react'

const tickets = [
    { id: 1, eventName: 'Concert A', date: '2024-05-15', quantity: 2, seats: ['A1', 'A2'], venue: 'Stadium X' },
    { id: 2, eventName: 'Festival B', date: '2024-06-20', quantity: 1, seats: ['B5'], venue: 'Park Y' },
]

export default function Component() {
    const [user] = useState({
        name: 'Nishant Raj',
        email: 'nishantrajcs26@gmail.com',
        joinDate: '19/11/2024',
    })
    const [activeTab, setActiveTab] = useState('profile')
    const [selectedTicket, setSelectedTicket] = useState(null)

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <div className="mb-4 flex space-x-4">
                <button
                    className={`px-2 py-1 ${activeTab === 'profile' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                </button>
                <button
                    className={`px-2 py-1 ${activeTab === 'tickets' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => setActiveTab('tickets')}
                >
                    Tickets
                </button>
            </div>
            {activeTab === 'profile' && (
                <div>
                    <div className="mb-2">
                        <label htmlFor="name" className="block text-sm">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={user.name}
                            readOnly
                            className="w-full p-1 bg-gray-100 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-sm">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full p-1 bg-gray-100 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="joinDate" className="block text-sm">Join Date</label>
                        <input
                            id="joinDate"
                            type="text"
                            value={user.joinDate}
                            readOnly
                            className="w-full p-1 bg-gray-100 border rounded"
                        />
                    </div>
                    <button className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">
                        Edit Profile
                    </button>
                </div>
            )}
            {activeTab === 'tickets' && (
                <div>
                    {tickets.length > 0 ? (
                        <ul>
                            {tickets.map((ticket) => (
                                <li key={ticket.id} className="mb-4 p-2 border rounded">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold">{ticket.eventName}</h3>
                                            <p className="text-sm text-gray-600">Date: {ticket.date}</p>
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
                        <h2 className="text-lg font-semibold mb-2">{selectedTicket.eventName} Details</h2>
                        <p>Date: {selectedTicket.date}</p>
                        <p>Venue: {selectedTicket.venue}</p>
                        <p>Seats: {selectedTicket.seats.join(', ')}</p>
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
    )
}