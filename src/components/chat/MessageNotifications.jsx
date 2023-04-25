// // MessageNotifications.js
// import React, { useState, useEffect } from 'react';
// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import { db } from '../../config/firebase';
// import { useAuth } from '../../context/AuthContext';
// import { IoIosNotifications } from 'react-icons/io';
//
// const MessageNotifications = () => {
//     const [unreadCount, setUnreadCount] = useState(0);
//     const { currentUser } = useAuth();
//
//     useEffect(() => {
//         const messagesRef = collection(db, 'messages');
//         const unreadMessagesQuery = query(
//             messagesRef,
//             where('read', '==', false),
//             where('receiverId', '==', currentUser.uid)
//         );
//
//         const unsubscribe = onSnapshot(unreadMessagesQuery, (snapshot) => {
//             setUnreadCount(snapshot.docs.length);
//             console.log('Number of unread messages:', snapshot.docs.length);
//         });
//
//         return () => unsubscribe();
//     }, [currentUser]);
//
//     return (
//         <div className="relative">
//             <IoIosNotifications />
//             {unreadCount > 0 && (
//                 <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
//           {unreadCount}
//         </span>
//             )}
//         </div>
//     );
// };
//
// export default MessageNotifications;
