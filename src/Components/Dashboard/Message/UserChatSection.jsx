import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const UserChatSection = () => {
  const { CallApi,GetMemberId } = AuthUser();
  const [userChat, setUserChat] = useState([]);
  const [message, setMessage] = useState("");
  const { chat_token, userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const messagesEndRef = useRef(null);

  const member_id =GetMemberId();

  useEffect(() => {
    const fetchUserChatData = async () => {
      try {
        const response = await CallApi({
          api: `/chat_messages`,
          method: "GET",
          data: {
            chat_token: chat_token,
            profile_id: userId,
          },
        });
        if (response && response.status === 1) {
          setUserChat(response?.list || []);
          setUserProfile(response?.pro_details || {});
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchUserChatData();
  }, [chat_token, userId]);

  useEffect(() => {
    const pusher = new Pusher("9e32cfc94ea7cf5f0454", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe(`chat_${chat_token}`);
    const messageHandler = (data) => {
      if (data?.sender_id !== member_id) {
        setUserChat((prevChat) => [...prevChat, data]);
      }
    };
  
   channel.bind("post_message", messageHandler);
   
    return () => {
      channel.unbind("post_message", messageHandler);
      pusher.unsubscribe(`chat_${chat_token}`);
    };
  }, [chat_token ,userChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userChat]);

  const SendMessage = async () => {
    if (!message.trim()) return;
    try {
      const response = await CallApi({
        api: `/send_message`,
        method: "UPLOAD",
        data: {
          chat_token:chat_token,
          message: message,
          receiver_id: userId,
        },
      });

      if (response && response.status === 1) {
        const newMessages = Array.isArray(response.last_message)
          ? response.last_message
          : [response.last_message];
        setUserChat((prevChat) => [...prevChat, ...newMessages]);
        setMessage("");
      } else {
        toast.error(response.credit_over)
        console.error("Failed to send message", response);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      SendMessage();
    }
  };

  return (
    <React.Fragment>
      {userChat.length > 0 ? (
        <div className="message-content">
          <div className="flex-grow-1">
            <div className="messages-headline">
              <div className="message-card-header">
                <div className="user-details">
                  <div>
                    <a className="show_me d-md-none me-3" style={{ fontSize: "1.5rem" }}>
                      <i className="bi bi-arrow-left"></i>
                    </a>
                  </div>
                  <div className="user-avatar">
                    <img
                      src={
                        userProfile?.profile_pic ||
                        "https://truetiesdating.com/assets/uploads/default-user.png"
                      }
                      alt="User Avatar"
                      className="img-circle elevation-2"
                    />
                  </div>
                  <div className="user-name">
                    <b>{userProfile?.name || "N/A"}</b>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Content */}
            <div className="message-content-inner">
              <div className="direct-chat-messages">
                {userChat.map((user, index) => (
                  <div key={index}>
                    {user?.sender_id === member_id ? (
                      <div className="message-bubble me">
                        <div className="message-bubble-inner">
                          <div className="direct-chat-infos clearfix">
                            <span className="direct-chat-name">Cristian</span>
                            <span className="direct-chat-timestamp message-time-sign">
                              <span>{user?.display_time}</span>
                            </span>
                          </div>
                          <div className="message-avatar">
                            <img
                              src={user?.logo}
                              alt={user?.name}
                              className="direct-chat-img"
                              width={200}
                            />
                          </div>
                          <div className="message-text">
                            {user?.message}{" "}
                            <i className="bi bi-check-all text-primary"></i>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                    ) : (
                      <div className="message-bubble">
                        <div className="message-bubble-inner">
                          <div className="direct-chat-infos clearfix">
                            <span className="direct-chat-name">{user?.name}</span>
                            <span className="direct-chat-timestamp message-time-sign">
                              <span>{user?.display_time}</span>
                            </span>
                          </div>
                          <div className="message-avatar">
                            <img
                              src={user?.logo}
                              alt={user?.name}
                              className="direct-chat-img"
                            />
                          </div>
                          <div className="message-text">
                            {user?.message}{" "}
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

            {/* Message Reply Section */}
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
                  onKeyDown={(e) => handleKeyPress(e)}
                  className="btn btn-primary"
                >
                  <span>
                    <i className="icon-feather-send"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="card mb-0 s-user-profile d-none d-xl-flex">
            <div>
              <div className="card-image">
                <img
                  src={userProfile?.profile_pic || "N/A"}
                  alt="Profile"
                  className="card-img"
                />
              </div>
              <div className="card-body p-3">
                <div className="text-center intro">
                  <h4>
                    {userProfile?.name || "N/A"}, {userProfile?.age || "N/A"}
                  </h4>
                  <p>
                    <i className="bi bi-geo-alt"></i>{" "}
                    {userProfile?.location || "N/A"}
                  </p>
                  <ul className="action">
                    <li>
                      <a title="Send interest" className="">
                        <i className="bi bi-hand-thumbs-up"></i>
                      </a>
                    </li>
                    <li>
                      <a title="Add to favorite" className="">
                        <i className="bi bi-heart"></i>
                      </a>
                    </li>
                    <li>
                      <Link to={`/public-profile/${userProfile?.user_id}`}
                        target="_blank"
                        title="View profile"
                      >
                        <i className="bi bi-person"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="info">
                  <h5 className="text-muted">User Information</h5>
                  <ul className="list-info">
                    <li>
                      <b>Nationality:</b> {userProfile?.nationality || "N/A"}
                    </li>
                    <li>
                      <b>Religion:</b> {userProfile?.religion || "N/A"}
                    </li>
                    <li>
                      <b>Star sign:</b> {userProfile?.starsign || "N/A"}
                    </li>
                    <li>
                      <b>Education:</b> {userProfile?.education || "N/A"}
                    </li>
                    <li>
                      <b>Languages:</b> {userProfile?.language || "N/A"}
                    </li>
                  </ul>
                </div>
                <h5 className="text-muted">Media</h5>
                <div className="row gx-2 gallery">
                  {userProfile?.gallery_images?.length > 0 ? (
                    userProfile.gallery_images.map((image, index) => (
                      <div className="col-4" key={index}>
                        <img
                          src={image}
                          alt={`gallery-pic-${index}`}
                          className="img-fluid rounded-2"
                        />
                      </div>
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="message-content" style={{minHeight: '530px'}}><h3 class="m-auto">No Chat Selected</h3></div>
      )}
    </React.Fragment>
  );
};

export default UserChatSection;
