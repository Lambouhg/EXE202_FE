// src/App.js
import React from 'react';
import '../index.css';
import { FaHome, FaCommentDots, FaBell, FaCog, FaVideo, FaPhoneAlt, FaEllipsisV, FaPaperclip, FaCamera, FaSmile } from 'react-icons/fa';

const Chat = () => {
  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="w-1/6 bg-purple-700 flex flex-col items-center py-4">
        <img
          src="https://storage.googleapis.com/a1aa/image/9ldQKxbk1xCRpu5Sr9032h_dyIg0HWsJSM5yIn90rdo.jpg"
          alt="User profile picture"
          className="rounded-full mb-4"
          width="50"
          height="50"
        />
        <div className="flex flex-col items-center space-y-6 text-white">
          <FaHome className="text-2xl" />
          <FaCommentDots className="text-2xl" />
          <FaBell className="text-2xl" />
          <FaCog className="text-2xl" />
          <FaVideo className="text-2xl" />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="flex items-center bg-white p-4 shadow-md">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 p-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-1">
          {/* Groups and People List */}
          <div className="w-1/3 p-4 space-y-4">
            {/* Groups */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="font-bold mb-4">Groups</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://storage.googleapis.com/a1aa/image/7C7s_U5pueaMGyMWIUuaIu2r54FnDqivTJOXf9kkzyg.jpg"
                      alt="Group icon"
                      className="rounded-full"
                      width="30"
                      height="30"
                    />
                    <div>
                      <p className="font-bold">Friends Forever</p>
                      <p className="text-sm text-gray-500">Itheftshdf</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">today, 5:02pm</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://storage.googleapis.com/a1aa/image/7C7s_U5pueaMGyMWIUuaIu2r54FnDqivTJOXf9kkzyg.jpg"
                      alt="Group icon"
                      className="rounded-full"
                      width="30"
                      height="30"
                    />
                    <div>
                      <p className="font-bold">Mera Gang</p>
                      <p className="text-sm text-gray-500">Kyu aaaaa???</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Yesterday, 2:31pm</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://storage.googleapis.com/a1aa/image/7C7s_U5pueaMGyMWIUuaIu2r54FnDqivTJOXf9kkzyg.jpg"
                      alt="Group icon"
                      className="rounded-full"
                      width="30"
                      height="30"
                    />
                    <div>
                      <p className="font-bold">Hiking</p>
                      <p className="text-sm text-gray-500">Its not going to happen</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Wednesday, 9:12am</p>
                </div>
              </div>
            </div>
            {/* People */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="font-bold mb-4">People</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://storage.googleapis.com/a1aa/image/l2Z0zVCIAuNOIx3C8g5UzjfAXEsZMEKnC6wvDlDq4kQ.jpg"
                      alt="Person icon"
                      className="rounded-full"
                      width="30"
                      height="30"
                    />
                    <div>
                      <p className="font-bold">Anil</p>
                      <p className="text-sm text-gray-500">Apr Fool's day</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">today, 5:02pm</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://storage.googleapis.com/a1aa/image/l2Z0zVCIAuNOIx3C8g5UzjfAXEsZMEKnC6wvDlDq4kQ.jpg"
                      alt="Person icon"
                      className="rounded-full"
                      width="30"
                      height="30"
                    />
                    <div>
                      <p className="font-bold">Chuthiya</p>
                      <p className="text-sm text-gray-500">Read</p>
                    </div>
                  </div>
                  <p className="text-sm text-red-500">today, 12:10pm</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://storage.googleapis.com/a1aa/image/l2Z0zVCIAuNOIx3C8g5UzjfAXEsZMEKnC6wvDlDq4kQ.jpg"
                      alt="Person icon"
                      className="rounded-full"
                      width="30"
                      height="30"
                    />
                    <div>
                      <p className="font-bold">Mary ma'am</p>
                      <p className="text-sm text-gray-500">You have to score it...</p>
                    </div>
                  </div>
                  <p className="text-sm text-orange-500">Yesterday, 2:41pm</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://storage.googleapis.com/a1aa/image/l2Z0zVCIAuNOIx3C8g5UzjfAXEsZMEKnC6wvDlDq4kQ.jpg"
                      alt="Person icon"
                      className="rounded-full"
                      width="30"
                      height="30"
                    />
                    <div>
                      <p className="font-bold">Bill Gates</p>
                      <p className="text-sm text-gray-500">Nostrud irure</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Yesterday, 12:41pm</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://storage.googleapis.com/a1aa/image/l2Z0zVCIAuNOIx3C8g5UzjfAXEsZMEKnC6wvDlDq4kQ.jpg"
                      alt="Person icon"
                      className="rounded-full"
                      width="30"
                      height="30"
                    />
                    <div>
                      <p className="font-bold">Victoria H</p>
                      <p className="text-sm text-gray-500">Okay, brother. Let's go...</p>
                    </div>
                  </div>
                  <p className="text-sm text-purple-500">Wednesday, 11:12am</p>
                </div>
              </div>
            </div>
          </div>
          {/* Chat Section */}
          <div className="flex-1 p-4">
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://storage.googleapis.com/a1aa/image/9ldQKxbk1xCRpu5Sr9032h_dyIg0HWsJSM5yIn90rdo.jpg"
                  alt="User profile picture"
                  className="rounded-full"
                  width="50"
                  height="50"
                />
                <div>
                  <p className="font-bold">Anil</p>
                  <p className="text-sm text-gray-500">Online - Last seen, 2:02pm</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-500">
                <FaPhoneAlt />
                <FaVideo />
                <FaEllipsisV />
              </div>
            </div>
            {/* Chat Messages */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-2">
                <img
                  src="https://storage.googleapis.com/a1aa/image/9ldQKxbk1xCRpu5Sr9032h_dyIg0HWsJSM5yIn90rdo.jpg"
                  alt="User profile picture"
                  className="rounded-full"
                  width="30"
                  height="30"
                />
                <div className="bg-gray-200 p-2 rounded-lg">
                  <p>Hey There!</p>
                  <p className="text-xs text-gray-500">Today, 8:30pm</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <img
                  src="https://storage.googleapis.com/a1aa/image/9ldQKxbk1xCRpu5Sr9032h_dyIg0HWsJSM5yIn90rdo.jpg"
                  alt="User profile picture"
                  className="rounded-full"
                  width="30"
                  height="30"
                />
                <div className="bg-gray-200 p-2 rounded-lg">
                  <p>How are you?</p>
                  <p className="text-xs text-gray-500">Today, 8:30pm</p>
                </div>
              </div>
              <div className="flex items-end justify-end space-x-2">
                <div className="bg-purple-600 text-white p-2 rounded-lg">
                  <p>Hello!</p>
                  <p className="text-xs text-gray-200">Today, 8:34pm</p>
                </div>
                <img
                  src="https://storage.googleapis.com/a1aa/image/9ldQKxbk1xCRpu5Sr9032h_dyIg0HWsJSM5yIn90rdo.jpg"
                  alt="User profile picture"
                  className="rounded-full"
                  width="30"
                  height="30"
                />
              </div>
              <div className="flex items-end justify-end space-x-2">
                <div className="bg-purple-600 text-white p-2 rounded-lg">
                  <p>I am fine and how are you?</p>
                  <p className="text-xs text-gray-200">Today, 8:34pm</p>
                </div>
                <img
                  src="https://storage.googleapis.com/a1aa/image/9ldQKxbk1xCRpu5Sr9032h_dyIg0HWsJSM5yIn90rdo.jpg"
                  alt="User profile picture"
                  className="rounded-full"
                  width="30"
                  height="30"
                />
              </div>
              <div className="flex items-start space-x-2">
                <img
                  src="https://storage.googleapis.com/a1aa/image/9ldQKxbk1xCRpu5Sr9032h_dyIg0HWsJSM5yIn90rdo.jpg"
                  alt="User profile picture"
                  className="rounded-full"
                  width="30"
                  height="30"
                />
                <div className="bg-gray-200 p-2 rounded-lg">
                  <p>I am doing well, Can we meet tomorrow?</p>
                  <p className="text-xs text-gray-500">Today, 8:36pm</p>
                </div>
              </div>
              <div className="flex items-end justify-end space-x-2">
                <div className="bg-purple-600 text-white p-2 rounded-lg">
                  <p>Yes Sure!</p>
                  <p className="text-xs text-gray-200">Today, 8:58pm</p>
                </div>
                <img
                  src="https://storage.googleapis.com/a1aa/image/9ldQKxbk1xCRpu5Sr9032h_dyIg0HWsJSM5yIn90rdo.jpg"
                  alt="User profile picture"
                  className="rounded-full"
                  width="30"
                  height="30"
                />
              </div>
            </div>
            {/* Chat Input */}
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md mt-4">
              <input
                type="text"
                placeholder="Type your message here..."
                className="flex-1 p-2 border rounded-lg"
              />
              <div className="flex items-center space-x-4 text-gray-500 ml-4">
                <FaPaperclip />
                <FaCamera />
                <FaSmile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;