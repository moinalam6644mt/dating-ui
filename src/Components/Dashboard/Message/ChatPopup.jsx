import React, { useEffect, useState, useRef } from 'react';
import Pusher from "pusher-js";
import './modal.css';
import AuthUser from '../../Authentication/AuthUser/AuthUser';

const ChatPopup = ({ setShowChat, user }) => {
  const { CallApi } = AuthUser();
  const [userChatData, setUserChatData] = useState([]);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [chatToken, setChatToken] = useState(null);

  useEffect(() => {
    FetchChatDetails();
  }, [user.user_id]);

  useEffect(() => {
    if (!chatToken) return;

    const pusher = new Pusher("9e32cfc94ea7cf5f0454", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe(`chat_${chatToken}`);
    const messageHandler = (data) => {
      if (data.chat_token === chatToken) {
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
          'user_id': user.user_id,
        },
      });
      if (response) {
        setUserChatData(response.list);
        setChatToken(response.chat_token);
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
          receiver_id: user.user_id,
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
    <div className="chat-box" style={{ display: 'block' }}>
      <div className="_header">
        <div className="_user">
          <span className="avatar">
            <img
              alt="User"
              height="36"
              width="36"
              src={user?.logo || "https://truetiesdating.com/assets/uploads/cropped_b6275b8cd5e8072c22d57a9623a0d516.png"}
            />
            <i className="status-icon"></i>
          </span>
          <div>
            <h5 className="text-capitalize">{user?.name}</h5>
            <p>
              <small>{user?.age || 'N/A'}, {user?.location || "N/A"}</small>
            </p>
          </div>
        </div>
        <button id="btn-close-box" className="btn-close" onClick={() => setShowChat(false)}></button>
      </div>
      
      {/* Make sure to set the height and overflow styles for scrolling */}
      <div className="message-content-inner p-3" style={{ height: '300px', overflowY: 'auto' }}>
        <div className="direct-chat-messages">
          {userChatData?.map((message, index) => (
            <div key={index}>
              {message?.sender_id === "38" ? (
                <div className="message-bubble me">
                  <div className="message-bubble-inner">
                    <div className="direct-chat-infos clearfix text-end small mb-1">
                      <span className="direct-chat-name">Cristian</span>
                      <span className="direct-chat-timestamp message-time-sign">
                        <span>{message?.display_time}</span>
                      </span>
                    </div>
                    <div className="message-avatar" style={{top: '24px'}}>
                      <img
                        src={message?.logo}
                        alt={message?.name}
                        className="direct-chat-img"
                        width={200}
                      />
                    </div>
                    <div className="message-text">
                      {message?.message}{" "}
                      <i className="bi bi-check-all text-primary"></i>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>
              ) : (
                <div className="message-bubble">
                  <div className="message-bubble-inner">
                    <div className="direct-chat-infos clearfix small mb-1">
                      <span className="direct-chat-name">{message?.name}</span>
                      <span className="direct-chat-timestamp message-time-sign">
                        <span>{message?.display_time}</span>
                      </span>
                    </div>
                    <div className="message-avatar" style={{top: '24px'}}>
                      <img
                        src={message?.logo}
                        alt={message?.name}
                        className="direct-chat-img"
                      />
                    </div>
                    <div className="message-text">
                      {message?.message}{" "}
                      <i className="bi bi-check-all text-primary"></i>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>
              )}
            </div>
          ))}
          {/* Scroll to the end of the chat */}
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
          />
          <button
            type="button"
            onClick={SendMessage}
            className="btn btn-primary"
          >
            <span>
              <i className="icon-feather-send"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
