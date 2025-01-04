import React, { useEffect, useState } from "react";
import "./ChatApp.css";

const ChatApp = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loggedInUserId] = useState(localStorage.getItem("user_id")); // Assume logged-in user's ID is stored in local storage
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch contacts from the API
    fetch("http://127.0.0.1:8000/user/all-users/")
      .then((response) => response.json())
      .then((data) => {
        // Transform the API data into the required format
        const transformedContacts = data.map((user) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`.trim() || "Admin",
          status: "Online", // Default status
          avatar:
            user.image || "https://bootdey.com/img/Content/avatar/avatar3.png", // Default avatar
          unreadMessages: Math.floor(Math.random() * 10), // Random unread messages
        }));
        setContacts(transformedContacts);
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);

    // Fetch messages between the logged-in user and the selected contact
    // fetch(`http://127.0.0.1:8000/chat/messages/${loggedInUserId}/${contact.id}/`)
    fetch(`http://127.0.0.1:8000/chat/messages/9/34/`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  };

  const handleSendMessage = () => {
    // Post a new message to the API
    const messageData = {
      sender: loggedInUserId,
      receiver: selectedContact.id,
      text: newMessage,
    };

    fetch("http://127.0.0.1:8000/messages/send/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage("");
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  return (
    <div className="h-min-screen pb-100">
      <main className="content" style={{ marginTop: "150px" }}>
        <div className="container p-0">
          <h1 className="h3 mb-3">Messages</h1>
          <div className="card">
            <div className="row g-0">
              {/* Contact List */}
              <div className="col-12 col-lg-5 col-xl-3 border-right">
                <div className="px-4 d-none d-md-block">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                </div>
                {contacts.map((contact) => (
                  <a
                    href="#"
                    key={contact.id}
                    className="list-group-item list-group-item-action border-0"
                    onClick={() => handleContactClick(contact)}
                  >
                    <div className="badge bg-success float-right">
                      {contact.unreadMessages}
                    </div>
                    <div className="d-flex align-items-start">
                      <img
                        src={contact.avatar}
                        className="rounded-circle mr-1"
                        alt={contact.name}
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        {contact.name}
                        <div className="small">
                          <span className="fas fa-circle chat-online" />{" "}
                          {contact.status}
                        </div>
                      </div>
                    </div>
                    <hr />
                  </a>
                ))}
                <hr className="d-block d-lg-none mt-1 mb-0" />
              </div>

              {/* Chat Section */}
              <div className="col-12 col-lg-7 col-xl-9">
                {selectedContact && (
                  <div className="py-2 px-4 border-bottom d-none d-lg-block">
                    <div className="d-flex align-items-center py-1">
                      <div className="position-relative">
                        <img
                          src={selectedContact.avatar}
                          className="rounded-circle mr-1"
                          alt={selectedContact.name}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex-grow-1 pl-3">
                        <strong>{selectedContact.name}</strong>
                        <div className="text-muted small">
                          <em>Online</em>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages Display */}
                <div
                  className="border rounded p-3"
                  style={{
                    height: "400px",
                    overflowY: "scroll",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`d-flex mb-3 ${
                        message.sender === localStorage.getItem("user_id")
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      {
                        <div className="position-relative">
                          <img
                            src={selectedContact.receiver_profile.avatar}
                            className="rounded-circle mr-1"
                            alt={selectedContact.name}
                            width={40}
                            height={40}
                          />
                        </div>
                      }
                      <div
                        className={`p-3 rounded ${
                          message.sender === localStorage.getItem("user_id")
                            ? "bg-primary text-white"
                            : "bg-light text-dark"
                        }`}
                        style={{ maxWidth: "70%" }}
                      >
                        {message.message}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newMessage.trim()) {
                          handleSendMessage();
                        }
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatApp;
