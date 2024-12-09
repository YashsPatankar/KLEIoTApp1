import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

function Chairman({ setLoginStatus }) {
  const noticeRef = useRef("");
  const messageRef = useRef("");
  const [notices, setNotices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  // Fetch notices and messages on component mount and at intervals
  useEffect(() => {
    fetchNotices();
    fetchMessages();
    const interval = setInterval(() => {
      fetchNotices();
      fetchMessages();
    }, 10000); // Fetch data every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    setLoginStatus(false)
  }

  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/getNotices");
      setNotices(response.data);
    } catch (err) {
      setError("Failed to fetch notices");
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/getMessages");
      setMessages(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const postNotice = async () => {
    const notice = noticeRef.current.value.trim();
    if (!notice) {
      alert("Please enter a notice!");
      return;
    }
    try {
      await axios.post("http://localhost:9000/api/postNotice", { notice });
      alert("Notice posted successfully!");
      noticeRef.current.value = "";
      fetchNotices();
    } catch (err) {
      alert("Failed to post notice");
      console.error(err);
    }
  };

  const postMessage = async () => {
    const message = messageRef.current.value.trim();
    if (!message) {
      alert("Please enter a message!");
      return;
    }
    try {
      await axios.post("http://localhost:9000/api/postMessage", { message });
      alert("Message posted successfully!");
      messageRef.current.value = "";
      fetchMessages();
    } catch (err) {
      alert("Failed to post message");
      console.error(err);
    }
  };

  const deleteNotice = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/deleteNotice/${id}`);
      alert("Notice deleted successfully!");
      fetchNotices();
    } catch (err) {
      alert("Failed to delete notice");
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/deleteMessage/${id}`);
      alert("Message deleted successfully!");
      fetchMessages();
    } catch (err) {
      alert("Failed to delete message");
      console.error(err);
    }
  };

  const filteredNotices = notices.filter((notice) =>
    (notice?.notice || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter((message) =>
    (message?.message || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
        Chairman Dashboard
      </h1>
      <button
        className="absolute top-6 right-6 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md"
        onClick={logout}
      >
        Logout
      </button>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Post Notices */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Post a Notice</h2>
        <div className="flex gap-4">
          <input
            type="text"
            ref={noticeRef}
            placeholder="Enter notice"
            className="flex-grow p-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={postNotice}
          >
            Post
          </button>
        </div>
      </div>

      {/* Post Messages */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Post a Message</h2>
        <div className="flex gap-4">
          <input
            type="text"
            ref={messageRef}
            placeholder="Enter message"
            className="flex-grow p-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={postMessage}
          >
            Post
          </button>
        </div>
      </div>

      {/* Notices */}
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Notices</h2>
      <div className="space-y-4">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div
              key={notice._id}
              className="p-4 bg-white rounded-md shadow-md flex justify-between items-center"
            >
              <p>{notice.notice}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notices available.</p>
        )}
      </div>

      {/* Messages */}
      <h2 className="text-xl font-semibold text-blue-700 mt-8 mb-4">Messages</h2>
      <div className="space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <div
              key={message._id}
              className="p-4 bg-white rounded-md shadow-md flex justify-between items-center"
            >
              <p>{message.message}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages available.</p>
        )}
      </div>
    </div>

  );
}

export default Chairman;
