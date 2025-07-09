require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root route
app.get('/', (req, res) => {
  res.send('✅ TikTok Auto View API is running!');
});

// 🔁 Random user-agents
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  'Mozilla/5.0 (Linux; Android 11)',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  'Mozilla/5.0 (Windows NT 6.1; WOW64)',
  'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0)',
  'Mozilla/5.0 (Linux; Android 9; SM-G960F)',
  'Mozilla/5.0 (iPad; CPU OS 13_2_3 like Mac OS X)'
];

// 🔁 Delay function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ✅ View sending endpoint
app.post('/send-view', async (req, res) => {
  const { videoUrl, viewCount } = req.body;
  if (!videoUrl) return res.status(400).json({ error: 'Video URL is required' });

  const count = viewCount || 1;
  let success = 0;

  for (let i = 0; i < count; i++) {
    try {
      const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
      await axios.get(videoUrl, {
        headers: {
          'User-Agent': userAgent
        }
      });
      success++;
      await sleep(300 + Math.random() * 300); // 300-600ms delay between views
    } catch (err) {
      // optional: log errors silently
    }
  }

  res.json({
    message: `✅ ${success}/${count} views sent successfully`
  });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
