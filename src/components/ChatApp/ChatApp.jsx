import React, { useEffect, useState } from "react";
import "./ChatApp.css";

const ChatApp = () => {
  const [contacts, setContacts] = useState([]);
  const [messages] = useState([
    {
      id: 1,
      sender: "You",
      time: "2:33 am",
      text: "Hello! How are you?",
      senderAvatar: "https://bootdey.com/img/Content/avatar/avatar1.png",
      isSender: true,
    },
    {
      id: 2,
      sender: "Sharon Lessman",
      time: "2:34 am",
      text: "I'm good, thank you! How about you?",
      senderAvatar: "https://bootdey.com/img/Content/avatar/avatar3.png",
      isSender: false,
    },
  ]);

  useEffect(() => {
    // Fetch contacts from the API
    fetch("http://127.0.0.1:8000/user/all-users/")
      .then((response) => response.json())
      .then((data) => {
        // Transform the API data into the required format
        const transformedContacts = data.map((user) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`.trim() || "Anonymous",
          status: "Online", // Default status
          avatar:
            user.image || "https://bootdey.com/img/Content/avatar/avatar3.png", // Default avatar
          unreadMessages: Math.floor(Math.random() * 10), // Random unread messages
        }));
        setContacts(transformedContacts);
      })
      .catch((error) => console.error("Error fetching contacts:", error));
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
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="rounded-circle mr-1"
                        alt="Sharon Lessman"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong>Sharon Lessman</strong>
                      <div className="text-muted small">
                        <em>Online</em>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="position-relative">
                  <div className="chat-messages p-4">
                    {messages.map((message) => {
                      const messageBg = message.isSender
                        ? "bg-primary text-white"
                        : "bg-secondary text-white";

                      return (
                        <div
                          key={message.id}
                          className={`chat-message-${
                            message.isSender ? "right" : "left"
                          } pb-4`}
                        >
                          <div>
                            <img
                              src={message.senderAvatar}
                              className="rounded-circle mr-1"
                              alt={message.sender}
                              width={40}
                              height={40}
                            />
                            <div className="text-muted small text-nowrap mt-2">
                              {message.time}
                            </div>
                          </div>
                          <div
                            className={`flex-shrink-1 rounded py-2 px-3 ml-3 mr-3 ${messageBg}`}
                          >
                            <div className="font-weight-bold mb-1">
                              {message.sender}
                            </div>
                            {message.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message"
                    />
                    <button className="btn btn-primary">Send</button>
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
