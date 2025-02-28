import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [chatSessions, setChatSessions] = useState([]);
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [hoveredChat, setHoveredChat] = useState(null);

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chatSessions")) || [
      [],
    ];
    const storedActiveChatIndex =
      JSON.parse(localStorage.getItem("activeChatIndex")) || 0;

    setChatSessions(storedChats);
    setActiveChatIndex(storedActiveChatIndex);
  }, []);

  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem("chatSessions", JSON.stringify(chatSessions));
      localStorage.setItem("activeChatIndex", JSON.stringify(activeChatIndex));
    }
  }, [chatSessions, activeChatIndex]);

  const messages = chatSessions[activeChatIndex] || [];

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { text: input, user: true };

    const updatedChats = [...chatSessions];
    updatedChats[activeChatIndex] = [...messages, userMessage];
    setChatSessions(updatedChats);

    try {
      const response = await axios.post(
        process.env.REACT_APP_CHATBOT_API,
        {
          question: input,
        }
      );
      console.log("Chatbot Response:", response.data);

      const botMessage = { text: response.data.answer, user: false };
      updatedChats[activeChatIndex] = [
        ...updatedChats[activeChatIndex],
        botMessage,
      ];
      setChatSessions(updatedChats);
      localStorage.setItem("chatSessions", JSON.stringify(updatedChats));
    } catch (error) {
      const errorMessage = { text: "❌ Error fetching response.", user: false };
      updatedChats[activeChatIndex] = [
        ...updatedChats[activeChatIndex],
        errorMessage,
      ];
      setChatSessions(updatedChats);
      localStorage.setItem("chatSessions", JSON.stringify(updatedChats));
    }

    setIsLoading(false);
    setInput("");
  };

  const startNewChat = () => {
    const newChatSessions = [...chatSessions, []];
    setChatSessions(newChatSessions);
    setActiveChatIndex(newChatSessions.length - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showHistory &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".toggle-history")
      ) {
        setShowHistory(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showHistory]);

  return (
    <div className={`chat-container ${darkMode ? "dark-mode" : ""}`}>
      <div className={`sidebar ${showHistory ? "show" : ""}`}>
        <div className="sidebar-header">
          <button onClick={startNewChat} className="new-chat-btn">
            ➕ New Chat
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="toggle-theme"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
        <h2>Chat History</h2>
        <ul>
          {chatSessions.map((chat, index) => (
            <li
              key={index}
              className={`chat-item ${
                index === activeChatIndex ? "active-chat" : ""
              }`}
              onMouseEnter={() => setHoveredChat(index)}
              onMouseLeave={() => setHoveredChat(null)}
              onClick={() => setActiveChatIndex(index)}
            >
              <span>Chat {index + 1}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-box">
        <button
          className="clear-chat-btn"
          onClick={() => {
            const updatedChats = [...chatSessions];
            updatedChats[activeChatIndex] = [];
            setChatSessions(updatedChats);
            localStorage.setItem("chatSessions", JSON.stringify(updatedChats));
          }}
        >
          Clear Chat
        </button>

        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user ? "user" : "bot"}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <p className="loading">🤖 Fetching Your Data Please Wait!...</p>
        )}
      </div>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? "⏳ Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;