// import React, { useState, useEffect } from 'react';
// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import { db } from '../../config/firebase';
// import PrivateChat from './PrivateChat';
//
// const MembersOnline = () => {
//     const [members, setMembers] = useState([]);
//     const [selectedMember, setSelectedMember] = useState(null);
//
//     useEffect(() => {
//         const membersRef = collection(db, 'users');
//         const onlineMembersQuery = query(membersRef, where('isOnline', '==', true));
//
//         const unsubscribe = onSnapshot(onlineMembersQuery, (snapshot) => {
//             const membersData = snapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setMembers(membersData);
//         });
//
//         return () => unsubscribe();
//     }, []);
//
//     const handleMemberClick = (member) => {
//         setSelectedMember(member);
//     };
//
//     return (
//         <div className="flex">
//             <div className="w-1/3 border-r border-gray-300 p-4">
//                 <h2 className="mb-4 text-xl">Members Online</h2>
//                 <ul>
//                     {members.map((member) => (
//                         <li
//                             key={member.id}
//                             className="mb-2 cursor-pointer"
//                             onClick={() => handleMemberClick(member)}
//                         >
//                             <img className="inline-block w-8 h-8 rounded-full mr-2" src={member.photoURL} alt={member.displayName} />
//                             <span className="inline-block">{member.displayName}</span>
//                             {member.isOnline && (
//                                 <span className="inline-block ml-2">
//                                     <span className="bg-green-500 w-3 h-3 rounded-full inline-block"></span>
//                                 </span>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="w-2/3 p-4">
//                 {selectedMember ? (
//                     <PrivateChat chatPartnerId={selectedMember.id} />
//                 ) : (
//                     <div></div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default MembersOnline;
