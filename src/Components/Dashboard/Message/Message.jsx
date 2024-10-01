import React, { useState, useEffect,useContext } from "react";
import "./message.css";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import { Link, useParams } from "react-router-dom";
import UserChatSection from "./UserChatSection";
import Pusher from "pusher-js";
import AuthContext from "../../ContextApi/AuthProvider";

const Message = () => {
  const { CallApi, GetMemberId } = AuthUser();
  const { chat_token } = useParams();

  const member_id = GetMemberId();
  const [chatData, setChatData] = useState([]);
  const {allLanguageKey} =useContext(AuthContext)
  const [filteredChatData, setFilteredChatData] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    ChatData();
  }, []);

  useEffect(() => {
    const filteredData = chatData.filter((user) =>
      (user?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChatData(filteredData);
  }, [searchQuery, chatData]);

  useEffect(() => {
    const pusher = new Pusher("9e32cfc94ea7cf5f0454", {
      cluster: "ap2",
      encrypted: true,
    });

    const channel = pusher.subscribe(`counter`);

    const messageHandler = (data) => {
      console.log(data)
      if (data.receiver_id === member_id) {
        setChatData((prevChat) =>
          prevChat.map((chat) =>
            chat.chat_token === data.chat_token
              ? { ...chat, new_msg: data.new_msg }
              : chat
          )
        );
      }
    };

    // For testing with a mock data object
    // const val = {
    //   chat_token: "f6001608326d847b7df322b284e85ba4",
    //   new_msg:97,
    //   receiverId: 39,
    // };
    //messageHandler(val);

    // Uncomment for production use:
    channel.bind("message_counter", messageHandler);

    return () => {
      channel.unbind("message_counter", messageHandler);
      pusher.unsubscribe(`counter`);
    };
  }, [chat_token, chatData, member_id]);

  const ChatData = async () => {
    try {
      const response = await CallApi({
        api: `/chat_list`,
        method: "GET",
        data: {
          chat_token: chat_token,
        },
      });
      if (response && response.status === 1) {
        setChatData(response.chat_list);
        setFilteredChatData(response.chat_list);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  const handleClick = (chatToken, userId) => {
    setActiveChat({ chatToken, userId });
    setChatData((prevChatData) =>
      prevChatData.map((chat) =>
        chat.chat_token === chatToken ? { ...chat, new_msg: 0 } : chat
      )
    );

    setIsClicked(!isClicked);
    //removeCounter(chatToken);
  };

  const removeCounter = async (chatToken) => {
    try {
      const response = await CallApi({
        api: `/remove_counter`,
        method: "UPLOAD",
        data: { chat_token: chatToken },
      });

      if (response.status === 1) {
        console.log("Counter removed successfully");
      } else {
        console.error("Failed to remove counter");
      }
    } catch (error) {
      console.error("Error removing counter:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="dashboard-content-inner">
      <div id="chat-app" className="card mb-0">
        <div className="messages-container">
          <div className="messages-container-inner">
            <div className="messages-inbox">
              <div className="messages-headline border-bottom-0">
                <div className="input-with-icon">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <i className="icon-feather-search"></i>
                </div>
              </div>
              {filteredChatData.length > 0 ? (
                <ul>
                  {filteredChatData.map((user, index) => (
                    <li key={index}>
                      <Link
                        to={`/message/chat/${user?.chat_token}/${user?.user_id}`}
                        className={
                          activeChat?.chatToken === user?.chat_token &&
                          activeChat?.userId === user?.user_id
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          handleClick(user?.chat_token, user?.user_id)
                        }
                      >
                        <div className="message-avatar">
                          {user?.online ? (
                            <i className="status-icon status-online"></i>
                          ) : (
                            <i className="status-icon status-offline"></i>
                          )}
                          <i className="status-icon status-offline"></i>
                          <img src={user?.logo} alt={user?.name} />
                        </div>
                        <div className="message-by">
                          <div className="message-by-headline">
                            <h5 onClick={handleClick}>
                              {user?.name}
                              {user?.new_msg === 0 ? (
                                ""
                              ) : (
                                <span className="float-end badge bg-danger">
                                  {user?.new_msg}
                                </span>
                              )}
                              {isClicked && (
                                <span className="icon float-end"></span>
                              )}
                            </h5>
                            <p>
                              <i className="bi bi-reply"></i> {user?.message}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div class="message-content" style={{ minHeight: "530px" }}>
                  <h3 class="m-auto">No User found</h3>
                </div>
              )}
            </div>
            <UserChatSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
