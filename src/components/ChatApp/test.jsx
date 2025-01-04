// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function ChatApp() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const userId = localStorage.getItem("user_id"); // Get user_id from localStorage

//   // Fetch all users
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/user/all-users/")
//       .then((response) => setUsers(response.data))
//       .catch((error) => console.log(error));
//   }, []);

//   // Fetch messages for selected user
//   const fetchMessages = (receiverId) => {
//     axios
//       .get(`http://127.0.0.1:8000/chat/messages/${userId}/${receiverId}/`) // Use userId here for sender
//       .then((response) => setMessages(response.data))
//       .catch((error) => console.log(error));
//   };

//   // Send a new message
//   const sendMessage = () => {
//     const data = {
//       sender: userId, // Use userId here for sender
//       receiver: selectedUser.id,
//       message: message,
//       is_read: false,
//     };

//     axios
//       .post("http://127.0.0.1:8000/chat/send/", data)
//       .then((response) => {
//         setMessages([...messages, response.data]);
//         setMessage("");
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar - List of users */}
//       <div className="w-1/3 p-4 border-r">
//         <h2 className="font-bold text-lg">Users</h2>
//         <ul className="m-2">
//           {users
//             .filter((user) => user.id !== parseInt(userId)) // Filter out the logged-in user
//             .map((user) => (
//               <li
//                 key={user.id}
//                 className="cursor-pointer py-2 bg-primary m-2"
//                 onClick={() => {
//                   setSelectedUser(user);
//                   fetchMessages(user.id);
//                 }}
//               >
//                 {user.first_name} {user.last_name}
//               </li>
//             ))}
//         </ul>
//       </div>

//       {/* Chat Section */}
//       {selectedUser && (
//         <div className="w-2/3 p-4">
//           <h2 className="font-bold text-lg">
//             Chat with {selectedUser.first_name}
//           </h2>
//           <div className="h-96 overflow-auto border p-4">
//             {messages.map((msg, index) => (
//               <div key={index} className="my-2">
//                 <p>
//                   <strong>{msg.sender_profile.first_name}:</strong>{" "}
//                   {msg.message}
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4">
//             <textarea
//               className="w-full p-2 border"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type a message..."
//             />
//             <button
//               className="mt-2 bg-blue-500 text-white p-2 w-full"
//               onClick={sendMessage}
//             >
//               Send Message
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatApp;
