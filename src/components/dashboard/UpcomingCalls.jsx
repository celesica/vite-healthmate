import React, { useState, useEffect } from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { formatDistanceToNow } from 'date-fns';
import { Dialog } from '@headlessui/react';
import { Line } from 'react-chartjs-2';

import 'tailwindcss/tailwind.css';
import { db } from '../../config/firebase'; // Import the Firestore instance from your firebase.js

const UpcomingCalls = () => {
    const [calls, setCalls] = useState([]);
    const [selectedCall, setSelectedCall] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchCalls = async () => {
            const fiveDaysFromNow = new Date();
            fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

            const querySnapshot = await db
                .collection('calls')
                .where('date', '<=', fiveDaysFromNow)
                .orderBy('date', 'asc')
                .get();

            const fetchedCalls = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setCalls(fetchedCalls);
        };

        fetchCalls();
    }, []);

    const handleCallClick = (call) => {
        setSelectedCall(call);
        setIsOpen(true);
    };

    const closeModal = () => {
        setSelectedCall(null);
        setIsOpen(false);
    };

    return (
        <div className="bg-white p-4 rounded-lg w-80 max-w-full">
            <h2 className="text-xl font-semibold mb-3">Upcoming Calls</h2>
            <ul>
                {calls.map((call) => (
                    <li
                        key={call.id}
                        className="flex items-center justify-between py-2 border-b border-gray-200 cursor-pointer"
                        onClick={() => handleCallClick(call)}
                    >
                        <div className="flex items-center space-x-2">
                            <BsFillTelephoneFill className="text-blue-500" />
                            <span>{call.title}</span>
                        </div>
                        <span className="text-gray-500">
              {formatDistanceToNow(new Date(call.date.toDate()))}
            </span>
                    </li>
                ))}
            </ul>

            <Dialog open={isOpen} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">
                {selectedCall && (
                    <div className="flex items-center justify-center min-h-screen">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                        <div className="bg-white p-6 rounded-lg w-80 max-w-full">
                            <div className="flex justify-between items-center">
                                <Dialog.Title className="text-xl font-semibold">{selectedCall.title}</Dialog.Title>
                                <AiFillCloseCircle className="text-red-500 cursor-pointer" onClick={closeModal} />
                            </div>
                            <p className="text-gray-600 mt-3">Date: {selectedCall.date.toDate().toLocaleString()}</p>
                            <p className="text-gray-600 mt-3">Description: {selectedCall.description}</p>
                            {selectedCall.link && (
                                <a
                                    href={selectedCall.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 mt-3 inline-block"
                                >
                                    Join Call
                                </a>
                            )}
                            {selectedCall.chartData && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Call Metrics</h3>
                                    <Line
                                        data={selectedCall.chartData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
};
export default UpcomingCalls;
