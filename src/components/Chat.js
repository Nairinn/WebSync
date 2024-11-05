import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/websync-websocket');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      stompClient.current.subscribe('/topic/public', (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, newMessage]);
      });

      // Send join message
      stompClient.current.send('/app/message', {}, JSON.stringify({
        sender: username,
        type: 'JOIN',
        content: `${username} joined the chat`,
      }));
    });

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, [username]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() && stompClient.current) {
      stompClient.current.send('/app/message', {}, JSON.stringify({
        sender: username,
        content: messageInput,
        type: 'CHAT',
      }));
      setMessageInput('');
    }
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender === username ? 'own' : ''}`}>
            <span className="sender">{msg.sender}</span>
            <span className="content">{msg.content}</span>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="chat-input">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;