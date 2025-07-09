import React, { useState } from 'react';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Processing...');

    try {
      const response = await fetch('https://your-backend-url.com/send-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl }),
      });

      if (response.ok) {
        setMessage('View request sent successfully!');
      } else {
        setMessage('Failed to send view request.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', textAlign: 'center' }}>
      <h2>TikTok Auto View Sender</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter TikTok video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          style={{ width: '100%', padding: 10, fontSize: 16 }}
          required
        />
        <button type="submit" style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}>
          Send View
        </button>
      </form>
      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
}

export default App;
