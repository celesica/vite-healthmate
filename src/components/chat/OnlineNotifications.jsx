// // OnlineNotifications.jsx
// import React, { useState, useEffect } from 'react';
// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import { db } from '../../config/firebase';
//
// const OnlineNotifications = () => {
//     const [membersData, setMembersData] = useState([]);
//     const [displayAlert, setDisplayAlert] = useState(null);
//
//     useEffect(() => {
//         const membersRef = collection(db, 'users');
//         const allMembersQuery = query(membersRef);
//
//         const unsubscribe = onSnapshot(allMembersQuery, (snapshot) => {
//             const newMembersData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//
//             newMembersData.forEach((newMember) => {
//                 const oldMember = membersData.find((m) => m.id === newMember.id);
//
//                 if (oldMember && oldMember.isOnline !== newMember.isOnline) {
//                     setDisplayAlert({
//                         message: `${newMember.displayName} is now ${
//                             newMember.isOnline ? 'online' : 'offline'
//                         }!`,
//                     });
//
//                     setTimeout(() => {
//                         setDisplayAlert(null);
//                     }, 5000); // Alert will disappear after 5 seconds
//                 }
//             });
//
//             setMembersData(newMembersData);
//         });
//
//         return () => unsubscribe();
//     }, [membersData]);
//
//     return (
//         <>
//             {displayAlert && (
//                 <div className="bg-green-500 text-white p-2 rounded-md mb-4">
//                     {displayAlert.message}
//                 </div>
//             )}
//         </>
//     );
// };
//
// export default OnlineNotifications;
