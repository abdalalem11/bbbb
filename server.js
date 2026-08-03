const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN || "8584318691:AAGHfeUE57_3z04oI91gHiy6MqNSn-RLj5k";
const CHAT_ID = process.env.CHAT_ID || "1170411845";

app.use(express.static('.'));
app.use(express.json());

app.post('/api/send-message', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'الرسالة مطلوبة' });
    
    try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
