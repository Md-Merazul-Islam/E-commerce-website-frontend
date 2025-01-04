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
    fetch(`http://127.0.0.1:8000/messages/${loggedInUserId}/${contact.id}/`)
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

  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/chat/messages/9/34/")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

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
                <div className="position-relative">
                  <div className="chat-messages p-4">
                    {messages.length > 0 ? (
                      [...messages]
                        .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort messages by time
                        .map((message, index, arr) => {
                          const sender_id = message.sender;
                          const sender_chk = localStorage.getItem("user_id");
                          const isSentByLoggedInUser = sender_id == sender_chk;
                          const messageBg = isSentByLoggedInUser
                            ? "bg-primary text-white"
                            : "bg-secondary text-white";

                          // Determine profile image to display
                          const profileImage =
                            message.receiver_profile?.image ||
                            message.sender_profile?.image ||
                            "https://bootdey.com/img/Content/avatar/avatar3.png";

                          // Check if the previous message was from a different sender
                          const showProfileImage =
                            index === 0 ||
                            arr[index - 1].sender !== message.sender;

                          return (
                            <div
                              key={message.id}
                              className={`chat-message-${
                                isSentByLoggedInUser ? "right" : "left"
                              } pb-4`}
                            >
                              <div className="d-flex align-items-start">
                                {/* Profile Image */}
                                {showProfileImage && !isSentByLoggedInUser && (
                                  <img
                                    src={profileImage}
                                    className="rounded-circle mr-1"
                                    alt={message.sender_name || "Profile"}
                                    width={40}
                                    height={40}
                                  />
                                )}
                                <div className="text-muted small text-nowrap mt-2">
                                  {/* {new Date(message.date).toLocaleString()}{" "} */}
                                </div>
                              </div>
                              <div
                                className={`flex-shrink-1 rounded py-2 px-3 ml-3 mr-3 ${messageBg}`}
                              >
                                <div className="font-weight-bold mb-1">
                                  {message.sender_name}
                                </div>
                                <div>{message.message}</div>{" "}
                              </div>
                              {/* Profile Image for Sent Messages */}
                              {showProfileImage && isSentByLoggedInUser && (
                                <img
                                  src={profileImage}
                                  className="rounded-circle ml-1"
                                  alt={message.sender_name || "Profile"}
                                  width={40}
                                  height={40}
                                />
                              )}
                            </div>
                          );
                        })
                    ) : (
                      <div className="text-center text-muted">
                        No messages yet.
                      </div>
                    )}
                  </div>
                </div>
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
                      disabled={!newMessage.trim()} // Disable if the input is empty
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
