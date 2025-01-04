import React, { useEffect, useState, useCallback } from "react";
import "./ChatApp.css";

const ChatApp = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loggedInUserId = localStorage.getItem("user_id"); // Assume logged-in user's ID is stored in local storage

  // Fetch contacts on component mount
  useEffect(() => {
    setIsLoading(true);
    fetch("http://127.0.0.1:8000/user/all-users/")
      .then((response) => response.json())
      .then((data) => {
        const transformedContacts = data.map((user) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`.trim() || "Admin",
          status: "Online",
          avatar:
            user.image || "https://bootdey.com/img/Content/avatar/avatar3.png",
          unreadMessages: Math.floor(Math.random() * 10), // Simulate unread messages
        }));
        setContacts(transformedContacts);
      })
      .catch((err) => setError("Failed to fetch contacts"))
      .finally(() => setIsLoading(false));
  }, []);

  // Fetch messages for a selected contact
  const fetchMessages = useCallback(
    (contactId) => {
      setIsLoading(true);
      fetch(`http://127.0.0.1:8000/messages/${loggedInUserId +2 }/${contactId+2}/`)
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((err) => setError("Failed to fetch messages"))
        .finally(() => setIsLoading(false));
    },
    [loggedInUserId]
  );

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    fetchMessages(contact.id);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return; // Avoid sending empty messages

    const messageData = {
      sender: loggedInUserId,
      receiver: selectedContact.id,
      text: newMessage.trim(),
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
        setMessages((prev) => [...prev, data]);
        setNewMessage("");
      })
      .catch((err) => setError("Failed to send message"));
  };

  return (
    <div className="chat-app h-min-screen pb-100">
      <main className="content" style={{ marginTop: "150px" }}>
        <div className="container p-0">
          <h1 className="h3 mb-3">Messages</h1>

          <div className="card">
            <div className="row g-0">
              {/* Contact List */}
              <div className="col-12 col-lg-5 col-xl-3 border-right">
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}

                <div className="px-4 d-none d-md-block">
                  <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Search..."
                  />
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
                        <div className="small text-muted">{contact.status}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Chat Section */}
              <div className="col-12 col-lg-7 col-xl-9">
                {selectedContact ? (
                  <>
                    {/* Chat Header */}
                    <div className="py-2 px-4 border-bottom">
                      <div className="d-flex align-items-center py-1">
                        <img
                          src={selectedContact.avatar}
                          className="rounded-circle mr-1"
                          alt={selectedContact.name}
                          width={40}
                          height={40}
                        />
                        <div className="flex-grow-1 pl-3">
                          <strong>{selectedContact.name}</strong>
                          <div className="text-muted small">Online</div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="chat-messages p-4">
                      {messages.map((message) => {
                        const isSentByLoggedInUser =
                          message.sender === loggedInUserId;
                        const messageBg = isSentByLoggedInUser
                          ? "bg-primary text-white"
                          : "bg-secondary text-white";

                        return (
                          <div
                            key={message.id}
                            className={`chat-message-${
                              isSentByLoggedInUser ? "right" : "left"
                            } pb-4`}
                          >
                            <div>
                              <img
                                src={message.sender_avatar}
                                className="rounded-circle mr-1"
                                alt={message.sender_name}
                                width={40}
                                height={40}
                              />
                              <div className="text-muted small text-nowrap mt-2">
                                {new Date(message.time).toLocaleTimeString()}
                              </div>
                            </div>
                            <div
                              className={`flex-shrink-1 rounded py-2 px-3 ml-3 mr-3 ${messageBg}`}
                            >
                              <div className="font-weight-bold mb-1">
                                {message.sender_name}
                              </div>
                              {message.text}
                            </div>
                          </div>
                        );
                      })}
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
                        />
                        <button
                          className="btn btn-primary"
                          onClick={handleSendMessage}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>Select a contact to start a chat</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatApp;
