import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Test.css"

const Test = ({ currentUserId=34, receiverId=9}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  // const receiverId =9, setReceiverId =34;
  // Fetch messages from the API
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        
        `http://127.0.0.1:8000/chat/messages/${currentUserId}/${receiverId}/`
        // `http://127.0.0.1:8000/chat/messages/9/34/`
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
      const response = await axios.post(`http://127.0.0.1:8000/chat/messages/`, {
        sender: currentUserId,
        receiver: receiverId,
        message: newMessage,
      });
      setMessages((prev) => [...prev, response.data]); 
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [receiverId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="messenger">

      {/* <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender === currentUserId ? "sent" : "received"
            }`}
          >
            <div className="message-content">
              <p>{msg.message}</p>
              <span>{new Date(msg.date).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div> */}



<div className="messages p-3" style={{ height: "70vh", overflowY: "auto" }}>
  {messages.map((msg) => (
    <div
      key={msg.id}
      className={`d-flex mb-3 wwwww ${
        msg.sender === currentUserId ? "justify-content-end" : "justify-content-start"
      }`}
    >
      {/* Message Bubble */}
      <div
        className={`message-content p-3 rounded ${
          msg.sender === currentUserId ? "bg-success text-white" : "bg-light text-dark"
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







      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Test;
