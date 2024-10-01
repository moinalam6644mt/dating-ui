import React, { useEffect, useState, useRef } from 'react';
import AuthUser from '../../Authentication/AuthUser/AuthUser';
import './modal.css';
import Pusher from "pusher-js";

const UserDirectChat = ({ userId ,loginUser ,setProfileData }) => {
  const { CallApi } = AuthUser();
  const [userChatData, setUserChatData] = useState([]);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState();
  const [chatToken, setChatToken] = useState(null);
 

  console.log(loginUser)

  useEffect(() => {
    FetchChatDetails();
  }, [userId]);

  useEffect(() => {
    if (!chatToken) return;

    const pusher = new Pusher("9e32cfc94ea7cf5f0454", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe(`chat_${chatToken}`);
    const messageHandler = (data) => {
      if (data?.sender_id !== loginUser) {
        setUserChatData((prevChat) => [...prevChat, data]);
      }
    };

    channel.bind("post_message", messageHandler);
    return () => {
      channel.unbind("post_message", messageHandler);
      pusher.unsubscribe(`chat_${chatToken}`);
    };
  }, [chatToken]);

  const FetchChatDetails = async () => {
    try {
      const response = await CallApi({
        api: `/quickChat`,
        method: 'GET',
        data: {
          'per_page': 1,
          'user_id': userId,
        },
      });
      if (response) {
        setUserChatData(response.list);
        setChatToken(response.chat_token);
        setProfileData(response.pro_details)
      }
    } catch (error) {
      console.error("Error fetching chat details:", error);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userChatData]);

  const SendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await CallApi({
        api: `/send_message`,
        method: "UPLOAD",
        data: {
          chat_token: chatToken,
          message: message,
          receiver_id: userId,
        },
      });

      if (response && response.status === 1) {
        const newMessages = Array.isArray(response.last_message)
          ? response.last_message
          : [response.last_message];
        setUserChatData((prevChat) => [...prevChat, ...newMessages]);
        setMessage("");
      } else {
        console.error("Failed to send message", response);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div id="chat-app">
      <div className="message-content">
        <div className="message-content-inner">
          <div className="direct-chat-messages">
            {userChatData.map((user, index) => (
              <div key={index}>
                <div className={`message-bubble ${user.sender_id === loginUser ? 'me' : ''}`}>
                  <div className="message-bubble-inner">
                    <div className="direct-chat-infos clearfix">
                      <span className="direct-chat-name">{user.sender_id === "38" ? "Cristian" : user.name}</span>
                      <span className="direct-chat-timestamp message-time-sign">
                        <span>{user.display_time}</span>
                      </span>
                    </div>
                    <div className="message-avatar">
                      <img
                        src={user.logo}
                        alt={user.name}
                        className="direct-chat-img"
                      />
                    </div>
                    <div className="message-text">
                      {user.message} <i className="bi bi-check-all text-primary"></i>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="message-reply input-wrapper">
          <div className="input-group">
            <input
              type="text"
              placeholder="Type Message ..."
              className="form-control pr-5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Type your message"
            />
            <button
              type="button"
              onClick={SendMessage}
              className="btn btn-primary"
            >
              <i className="icon-feather-send"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDirectChat;
