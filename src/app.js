import React, { useState } from 'react';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [viewCount, setViewCount] = useState(500);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('⏳ Sending views...');

    try {
      const response = await fetch('https://your-backend-url.onrender.com/send-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ videoUrl, viewCount })
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`✅ ${viewCount} views sent successfully!`);
      } else {
        setMessage(`❌ Failed: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', padding: 20, textAlign: 'center' }}>
      <h2>🎯 TikTok Auto View Sender</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste TikTok video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          style={{ width: '100%', padding: 10, fontSize: 16 }}
          required
        />
        <select
          value={viewCount}
          onChange={(e) => setViewCount(Number(e.target.value))}
          style={{ width: '100%', padding: 10, marginTop: 10 }}
        >
          <option value={500}>500 Views</option>
          <option value={1000}>1000 Views</option>
          <option value={2000}>2000 Views</option>
        </select>
        <button
          type="submit"
          style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}
        >
          🚀 Get Views
        </button>
      </form>
      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
}

export default App;
