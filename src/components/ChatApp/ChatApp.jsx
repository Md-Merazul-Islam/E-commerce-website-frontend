import React, { useEffect, useState } from "react";
import "./ChatApp.css";

const ChatApp = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loggedInUserId] = useState(Number(localStorage.getItem("user_id")));
  const [newMessage, setNewMessage] = useState("");

  // Fetch Contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/user/all-users/");
        const data = await response.json();
        const transformedContacts = data.map((user) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`.trim() || "Admin",
          status: "Online",
          avatar:
            user.image || "https://bootdey.com/img/Content/avatar/avatar3.png",
        }));
        setContacts(transformedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  // Fetch Messages for Selected Contact
  const handleContactClick = async (contact) => {
    setSelectedContact(contact);
    const receiverId = Number(contact.id) + 2;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/chat/messages/${loggedInUserId}/${receiverId}/`
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send Message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      sender: loggedInUserId,
      receiver: selectedContact.id,
      text: newMessage,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/messages/send/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-app h-min-screen pb-100">
      <main className="content mt-5 h-min-screen">
        <div className="container p-0">
          <h1 className="h3 mb-3">Messages</h1>
          <div className="card ">
            <div className="row g-0">
              {/* Contacts List */}
              <div className="col-12 col-lg-5 col-xl-3 border-right">
                <div className="px-4">
                  <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Search..."
                  />
                </div>
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="list-group-item list-group-item-action border-0 contact-item bg-light"
                    onClick={() => handleContactClick(contact)}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <div className="flex-grow-1">
                        <strong>{contact.name}</strong>
                        <div className="text-muted small">{contact.status}</div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>

              {/* Chat Section */}
              <div className="col-12 col-lg-7 col-xl-9">
                {selectedContact && (
                  <>
                    {/* Header */}
                    <div className="py-2 px-4 border-bottom">
                      <div className="d-flex align-items-center">
                        <img
                          src={selectedContact.avatar}
                          alt={selectedContact.name}
                          className="rounded-circle me-2"
                          width="40"
                          height="40"
                        />
                        <div>
                          <strong>{selectedContact.name}</strong>
                          <div className="text-muted small">Online</div>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}

                    <div
                      className="messages p-3"
                      style={{ height: "70vh", overflowY: "auto" }}
                    >
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`d-flex  ${
                            msg.sender === loggedInUserId
                              ? "justify-content-end"
                              : "justify-content-start"
                          }`}
                        >
                          <div
                            className={`message-content  ${
                              msg.sender === loggedInUserId
                                ? "bg-primary text-white"
                                : "bg-success text-white"
                            }`}
                            style={{ maxWidth: "70%", wordBreak: "break-word" }}
                          >
                            <p className="mb-1 ">{msg.message}</p>
                            <span
                              className="small text-muted"
                              style={{
                                display: "block",
                                textAlign: "right",
                              }}
                            >
                              {/* {new Date(msg.date).toLocaleTimeString()} */}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="border-top py-3 px-4">
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
                          className="btn btn-success"
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </>
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
