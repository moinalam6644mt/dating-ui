import React, { useState, useEffect } from "react";
import ChatPopup from "./ChatPopup";
import AuthUser from "../../Authentication/AuthUser/AuthUser";

const MessageModal = ({ setShow }) => {
  const [showChat, setShowChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { CallApi } = AuthUser();
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    ChatData();
  }, []);

  const ChatData = async () => {
    try {
      const response = await CallApi({
        api: `/chat_list`,
        method: "GET",
        data: {
          chat_token: "chat_token",
        },
      });
      if (response && response.status === 1) {
        setChatData(response.chat_list);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  return (
    <React.Fragment>
      <div className="messenger" style={{ display: "block" }}>
        <div className="_header">
          <h5>Online Members</h5>
          <button
            id="btn-close-list"
            className="btn btn-close"
            onClick={() => setShow(false)}
          ></button>
        </div>
        <div data-simplebar="init" className="_body">
          <div className="simplebar-scroll-content">
            <div
              className="simplebar-content"
              style={{ paddingBottom: "17px", marginRight: "-17px", cursor: "pointer" }}
            >
              <ul>
                {chatData.map((user) => (
                  <li key={user.name} onClick={() => handleUserClick(user)}>
                    <a >
                      <span className="avatar">
                        <img src={user.logo} alt={user.alt} height="28" width="28" />
                        <i className="status-icon status-offline"></i>
                      </span>
                      <h6>{user.name}</h6>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showChat === true && selectedUser && (
        <ChatPopup 
          setShowChat={setShowChat}
          user={selectedUser} 
        />
      )}
    </React.Fragment>
  );
};

export default MessageModal;
