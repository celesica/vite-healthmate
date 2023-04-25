// // import React, { useState, useEffect, useRef } from 'react';
// // import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc } from 'firebase/firestore';
// // import { db } from '../../config/firebase.js';
// // import { useAuth } from '../../context/AuthContext.jsx';
// //
// // const PrivateChat = ({ chatPartnerId }) => {
// //     const { currentUser } = useAuth();
// //     const [messages, setMessages] = useState([]);
// //     const [messageInput, setMessageInput] = useState('');
// //     const [isOnline, setIsOnline] = useState(false);
// //     const messagesEndRef = useRef(null);
// //
// //     useEffect(() => {
// //         const messagesRef = collection(db, `users/${currentUser.uid}/chats/${chatPartnerId}/messages`);
// //         const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
// //
// //         const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
// //             const messagesData = snapshot.docs.map(doc => ({
// //                 id: doc.id,
// //                 ...doc.data()
// //             }));
// //             setMessages(messagesData);
// //             console.log('Successfully connected to the chat with', chatPartnerId); // Add this line
// //         });
// //
// //         return () => unsubscribe();
// //     }, [currentUser.uid, chatPartnerId]);
// //
// //     useEffect(() => {
// //         if (chatPartnerId) {
// //             const chatPartnerRef = doc(db, 'users', chatPartnerId);
// //             const unsubscribe = onSnapshot(chatPartnerRef, (docSnapshot) => {
// //                 if (docSnapshot.exists()) {
// //                     const chatPartnerData = docSnapshot.data();
// //                     setIsOnline(chatPartnerData.isOnline);
// //                 }
// //             });
// //
// //             return () => unsubscribe();
// //         }
// //     }, [chatPartnerId]);
// //
// //     const scrollToBottom = () => {
// //         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //     };
// //
// //     useEffect(scrollToBottom, [messages]);
// //
// //     const handleMessageInputChange = (event) => {
// //         setMessageInput(event.target.value);
// //     };
// //
// //     const sendMessage = async (event) => {
// //         event.preventDefault();
// //
// //         if (messageInput.trim() === '') return;
// //
// //         const messagesRef = collection(db, `users/${currentUser.uid}/chats/${chatPartnerId}/messages`);
// //         const recipientMessagesRef = collection(db, `users/${chatPartnerId}/chats/${currentUser.uid}/messages`);
// //
// //         await addDoc(messagesRef, {
// //             content: messageInput,
// //             senderId: currentUser.uid,
// //             timestamp: serverTimestamp()
// //         });
// //
// //         await addDoc(recipientMessagesRef, {
// //             content: messageInput,
// //             senderId: currentUser.uid,
// //             timestamp: serverTimestamp()
// //         });
// //
// //         setMessageInput('');
// //     };
// //
// //     if (!chatPartnerId) {
// //         return <div>Please select a member to chat with.</div>;
// //     }
// //
// //
// //     return (
// //         <div className="flex flex-col h-full">
// //             <div className="flex-grow overflow-y-auto p-4">
// //                 {messages.map((message) => (
// //                     <div
// //                         key={message.id}
// //                         className={`flex items-end mb-2 ${message.senderId === currentUser.uid ? 'justify-end' : 'justify-start'}`}
// //                     >
// //                         <img
// //                             className="w-8 h-8 rounded-full mr-2"
// //                             src={message.senderId === currentUser.uid ? currentUser.photoURL : chatPartnerId.photoURL}
// //                             alt={message.senderId === currentUser.uid ? currentUser.displayName : chatPartnerId.displayName}
// //                         />
// //                         <div className={`rounded-lg p-2 ${message.senderId === currentUser.uid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
// //                             {message.content}
// //                         </div>
// //                     </div>
// //                 ))}
// //                 <div ref={messagesEndRef} />
// //             </div>
// //             <form className="flex items-center p-4" onSubmit={sendMessage}>
// //                 <input
// //                     className="flex-grow px-4 py-2 rounded-lg border-2 border-gray-300 mr-4"
// //                     type="text"
// //                     value={messageInput}
// //                     onChange={handleMessageInputChange}
// //                     placeholder="Type your message here..."
// //                 />
// //                 <button className="px-4 py-2 rounded-lg bg-blue-500 text-white" type="submit">Send</button>
// //             </form>
// //             <div className={`p-4 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
// //                 {isOnline ? 'Online' : 'Offline'}
// //             </div>
// //         </div>
// //     );
// // };
// //
// // export default PrivateChat;
//
// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { collection, query, orderBy, onSnapshot, writeBatch, serverTimestamp, doc } from 'firebase/firestore';
// import { db } from '../../config/firebase.js';
// import { useAuth } from '../../context/AuthContext.jsx';
//
// const PrivateChat = ({ chatPartnerId }) => {
//     const { currentUser } = useAuth();
//     const [messages, setMessages] = useState([]);
//     const [messageInput, setMessageInput] = useState('');
//     const [isOnline, setIsOnline] = useState(false);
//     const messagesEndRef = useRef(null);
//
//     const memoizedMessages = useMemo(() => messages, [messages]);
//
//     useEffect(() => {
//         const messagesRef = collection(db, `users/${currentUser.uid}/chats/${chatPartnerId}/messages`);
//         const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
//
//         const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
//             const messagesData = snapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setMessages(messagesData);
//             console.log('Successfully connected to the chat with', chatPartnerId); // Add this line
//         });
//
//         return () => unsubscribe();
//     }, [currentUser.uid, chatPartnerId]);
//
//     useEffect(() => {
//         if (chatPartnerId) {
//             const chatPartnerRef = doc(db, 'users', chatPartnerId);
//             const unsubscribe = onSnapshot(chatPartnerRef, (docSnapshot) => {
//                 if (docSnapshot.exists()) {
//                     const chatPartnerData = docSnapshot.data();
//                     setIsOnline(chatPartnerData.isOnline);
//                 }
//             });
//
//             return () => unsubscribe();
//         }
//     }, [chatPartnerId]);
//
//     const batch = writeBatch(db);
//
//     const sendMessage = async (event) => {
//         event.preventDefault();
//
//         if (messageInput.trim() === '') return;
//
//         const messagesRef = collection(db, `users/${currentUser.uid}/chats/${chatPartnerId}/messages`);
//         const recipientMessagesRef = collection(db, `users/${chatPartnerId}/chats/${currentUser.uid}/messages`);
//
//         batch.set(messagesRef.doc(), {
//             content: messageInput,
//             senderId: currentUser.uid,
//             timestamp: serverTimestamp()
//         });
//
//         batch.set(recipientMessagesRef.doc(), {
//             content: messageInput,
//             senderId: currentUser.uid,
//             timestamp: serverTimestamp()
//         });
//
//         await batch.commit();
//
//         setMessageInput('');
//     };
//
//     const debounce = (func, delay) => {
//         let timerId;
//         return (...args) => {
//             if (timerId) {
//                 clearTimeout(timerId);
//             }
//             timerId = setTimeout(() => {
//                 func(...args);
//             }, delay);
//         };
//     };
//
//     const debouncedScrollToBottom = useRef(
//         debounce(() => {
//             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//         }, 100)
//     ).current;
//
//     useEffect(() => {
//         debouncedScrollToBottom();
//     }, [memoizedMessages]);
//
//     const handleMessageInputChange = (event) => {
//         setMessageInput(event.target.value);
//     };
//
//     if (!chatPartnerId) {
//         return <div>Please select a member to chat with.</div>;
//     }
//
//     return (
//         <div className="flex flex-col h-full">
//             <div className="flex-grow overflow-y-auto p-4">
//                 {messages.map((message) => (
//                     <div
//                         key={message.id}
//                         className={`flex items-end mb-2 ${message.senderId === currentUser.uid ? 'justify-end' : 'justify-start'}`}
//                     >
//                         <img
//                             className="w-8 h-8 rounded-full mr-2"
//                             src={
//                                 message.senderId === currentUser.uid
//                                     ? currentUser.photoURL
//                                     : chatPartnerId.photoURL
//                             }
//                             alt={
//                                 message.senderId === currentUser.uid
//                                     ? currentUser.displayName
//                                     : chatPartnerId.displayName
//                             }
//                         />
//                         <div
//                             className={`rounded-lg p-2 ${message.senderId === currentUser.uid=== currentUser.uid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
//                         >
//                             {message.content}
//                         </div>
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>
//             <form className="flex items-center p-4" onSubmit={sendMessage}>
//                 <input
//                     className="flex-grow px-4 py-2 rounded-lg border-2 border-gray-300 mr-4"
//                     type="text"
//                     value={messageInput}
//                     onChange={handleMessageInputChange}
//                     placeholder="Type your message here..."
//                 />
//                 <button className="px-4 py-2 rounded-lg bg-blue-500 text-white" type="submit">
//                     Send
//                 </button>
//             </form>
//             <div className={`p-4 ${isOnline ? 'text-green-600' : 'text-red-600'}`}> {isOnline ? 'Online' : 'Offline'}</div>
//         </div>
//     );
// };
//
// export default React.memo(PrivateChat);