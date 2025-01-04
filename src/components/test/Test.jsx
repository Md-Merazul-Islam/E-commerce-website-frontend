// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import "./Test.css";

// // const Test = ({ currentUserId = 34, receiverId = 9 }) => {
// //   const [messages, setMessages] = useState([]);
// //   const [newMessage, setNewMessage] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   // const receiverId =9, setReceiverId =34;
// //   // Fetch messages from the API
// //   const fetchMessages = async () => {
// //     try {
// //       const response = await axios.get(
// //         `http://127.0.0.1:8000/chat/messages/${currentUserId}/${receiverId}/`
// //         // `http://127.0.0.1:8000/chat/messages/9/34/`
// //       );
// //       setMessages(response.data);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Error fetching messages:", error);
// //       setLoading(false);
// //     }
// //   };

// //   // Send a new message
// //   const sendMessage = async () => {
// //     if (!newMessage.trim()) return;

// //     try {
// //       const response = await axios.post(
// //         `http://127.0.0.1:8000/chat/messages/`,
// //         {
// //           sender: currentUserId,
// //           receiver: receiverId,
// //           message: newMessage,
// //         }
// //       );
// //       setMessages((prev) => [...prev, response.data]);
// //       setNewMessage("");
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMessages();
// //   }, [receiverId]);

// //   if (loading) return <div>Loading...</div>;

// //   return (
// //     <div className="messenger">
// //       <div
// //         className="messages p-3"
// //         style={{ height: "70vh", overflowY: "auto" }}
// //       >
// //         {messages.map((msg) => (
// //           <div
// //             key={msg.id}
// //             className={`d-flex mb-3 wwwww ${
// //               msg.sender === currentUserId
// //                 ? "justify-content-end"
// //                 : "justify-content-start"
// //             }`}
// //           >
// //             {/* Message Bubble */}
// //             <div
// //               className={`message-content p-3 rounded ${
// //                 msg.sender === currentUserId
// //                   ? "bg-success text-white"
// //                   : "bg-light text-dark"
// //               }`}
// //               style={{ maxWidth: "70%", wordBreak: "break-word" }}
// //             >
// //               <p className="mb-1">{msg.message}</p>
// //               <span
// //                 className="small text-muted"
// //                 style={{ display: "block", textAlign: "right" }}
// //               >
// //                 {new Date(msg.date).toLocaleTimeString()}
// //               </span>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="input-container">
// //         <input
// //           type="text"
// //           placeholder="Type a message..."
// //           value={newMessage}
// //           onChange={(e) => setNewMessage(e.target.value)}
// //         />
// //         <button onClick={sendMessage}>Send</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Test;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Test.css";

// const Test = ({ currentUserId = 34 }) => {
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const receiverId = localStorage.getItem("user_id");
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Fetch all users from the API
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/user/all-users/");
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // Fetch messages between current user and selected receiver
//   const fetchMessages = async () => {
//     if (!receiverId) return;

//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/chat/messages/${currentUserId}/${receiverId}/`
//       );
//       setMessages(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       setLoading(false);
//     }
//   };

//   // Send a new message
//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8000/chat/messages/`,
//         {
//           sender: currentUserId,
//           receiver: receiverId,
//           message: newMessage,
//         }
//       );
//       setMessages((prev) => [...prev, response.data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     fetchMessages();
//   }, [receiverId]);

//   if (loading && receiverId) return <div>Loading...</div>;

//   return (
//     <div className="chat-app">
//       <div className="user-list">
//         <h4>Users</h4>
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className={`user-item ${user.id === receiverId ? "active" : ""}`}
//             onClick={() => setReceiverId(user.id)}
//           >
//             <img
//               src={
//                 user.image ||
//                 "https://bootdey.com/img/Content/avatar/avatar3.png"
//               }
//               alt={user.first_name}
//               className="user-icon"
//             />
//             <span>{`${user.first_name} ${user.last_name}`}</span>
//           </div>
//         ))}
//       </div>

//       <div className="messenger">
//         <div
//           className="messages p-3"
//           style={{ height: "70vh", overflowY: "auto" }}
//         >
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`d-flex mb-3 ${
//                 msg.sender === currentUserId
//                   ? "justify-content-end"
//                   : "justify-content-start"
//               }`}
//             >
//               {/* Message Bubble */}
//               <div
//                 className={`message-content p-3 rounded ${
//                   msg.sender === currentUserId
//                     ? "bg-success text-white"
//                     : "bg-light text-dark"
//                 }`}
//                 style={{ maxWidth: "70%", wordBreak: "break-word" }}
//               >
//                 <p className="mb-1">{msg.message}</p>
//                 <span
//                   className="small text-muted"
//                   style={{ display: "block", textAlign: "right" }}
//                 >
//                   {new Date(msg.date).toLocaleTimeString()}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {receiverId && (
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={sendMessage}>Send</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Test;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Test.css";

// const Test = () => {
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [receiverId, setReceiverId] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const currentUserId = localStorage.getItem("user_id");

//   // Fetch all users from the API
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/user/all-users/");
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // Fetch messages between current user and selected receiver
//   const fetchMessages = async () => {
//     if (!receiverId) return;
//     const rev_id = receiverId + 2;
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/chat/messages/${currentUserId}/${rev_id}/`
//       );
//       setMessages(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       setLoading(false);
//     }
//   };

//   // Send a new message
//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8000/chat/messages/`,
//         {
//           sender: currentUserId,
//           receiver: receiverId,
//           message: newMessage,
//         }
//       );
//       setMessages((prev) => [...prev, response.data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (receiverId) {
//       fetchMessages();
//     }
//   }, [receiverId]);

//   if (loading && receiverId) return <div>Loading...</div>;

//   return (
//     <div className="chat-app">
//       <div className="user-list">
//         <h4>Users</h4>
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className={`user-item ${user.id === receiverId ? "active" : ""}`}
//             onClick={() => setReceiverId(user.id)}
//           >
//             <img
//               src={
//                 user.image ||
//                 "https://bootdey.com/img/Content/avatar/avatar3.png"
//               }
//               alt={user.first_name}
//               className="user-icon"
//             />
//             <span>{`${user.first_name} ${user.last_name}`}</span>
//           </div>
//         ))}
//       </div>

//       <div className="messenger">
//         {receiverId ? (
//           <>
//             <div
//               className="messages p-3"
//               style={{ height: "70vh", overflowY: "auto" }}
//             >
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`d-flex mb-3 ${
//                     msg.sender === currentUserId
//                       ? "justify-content-end"
//                       : "justify-content-start"
//                   }`}
//                 >
//                   {/* Message Bubble */}
//                   <div
//                     className={`message-content p-3 rounded ${
//                       msg.sender === currentUserId
//                         ? "bg-success text-white"
//                         : "bg-light text-dark"
//                     }`}
//                     style={{ maxWidth: "70%", wordBreak: "break-word" }}
//                   >
//                     <p className="mb-1">{msg.message}</p>
//                     <span
//                       className="small text-muted"
//                       style={{ display: "block", textAlign: "right" }}
//                     >
//                       {new Date(msg.date).toLocaleTimeString()}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="input-container">
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button onClick={sendMessage}>Send</button>
//             </div>
//           </>
//         ) : (
//           <div>Select a user to start chatting</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Test;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Test.css";

const Test = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const currentUserId = Number( localStorage.getItem("user_id"));

  // Fetch all users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/user/all-users/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch messages between current user and selected receiver
  const fetchMessages = async () => {
    if (!receiverId) return;
    const rev_id = Number(receiverId) + 2;
    alert(rev_id);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/chat/messages/${currentUserId}/${rev_id}/`
      );
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoading(false);
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat/messages/",
        {
          sender: currentUserId,
          receiver: receiverId,
          message: newMessage,
        }
      );
      setMessages((prev) => [...prev, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch messages whenever the receiver changes
  useEffect(() => {
    fetchMessages();
  }, [receiverId]);

  if (loading && receiverId) return <div>Loading...</div>;

  return (
    <div className="chat-app">
      {/* User List */}
      <div className="user-list">
        <h4>Users</h4>
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-item ${user.id === receiverId ? "active" : ""}`}
            onClick={() => setReceiverId(user.id)}
          >
            <img
              src={
                user.image ||
                "https://bootdey.com/img/Content/avatar/avatar3.png"
              }
              alt={user.first_name}
              className="user-icon"
            />
            <span>{`${user.first_name} ${user.last_name}`}</span>
          </div>
        ))}
      </div>

      {/* Messages Section */}
      <div className="messenger">
        <div
          className="messages p-3"
          style={{ height: "70vh", overflowY: "auto" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`d-flex mb-3 ${
                msg.sender === currentUserId
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`message-content p-3 rounded ${
                  msg.sender === currentUserId
                    ? "bg-success text-white"
                    : "bg-light text-dark"
                }`}
                style={{ maxWidth: "70%", wordBreak: "break-word" }}
              >
                <p className="mb-1">{msg.message}</p>
                <span
                  className="small text-muted"
                  style={{ display: "block", textAlign: "right" }}
                >
                  {new Date(msg.date).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input for New Message */}
        {receiverId && (
          <div className="input-container">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
