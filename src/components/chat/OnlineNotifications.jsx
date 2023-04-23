import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';

const OnlineNotifications = () => {
    const [onlineMembers, setOnlineMembers] = useState([]);

    useEffect(() => {
        const membersRef = collection(db, 'users');
        const onlineMembersQuery = query(membersRef, where('isOnline', '==', true));

        const unsubscribe = onSnapshot(onlineMembersQuery, (snapshot) => {
            const membersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOnlineMembers(membersData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="fixed bottom-0 left-0 mb-4 mr-4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl mb-2">Online Members</h2>
            <ul>
                {onlineMembers.map((member) => (
                    <li key={member.id} className="mb-2">
                        {member.displayName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OnlineNotifications;
