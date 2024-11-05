import React, { useState } from 'react';
import Chat from './components/Chat';
import CodeEditor from './components/CodeEditor';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setJoined(true);
    }
  };

  if (!joined) {
    return (
      <div className="join-container">
        <form onSubmit={handleJoin}>
          <h2>Join WebSync</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Join</button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="editor-container">
        <CodeEditor username={username} />
      </div>
      <div className="chat-container">
        <Chat username={username} />
      </div>
    </div>
  );
}

export default App;