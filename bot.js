const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ===== التوكن =====
const BOT_TOKEN = "8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI";
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ===== البيانات =====
let fakeAccounts = [
    "+1 555 123 4567",
    "+1 555 234 5678",
    "+1 555 345 6789",
    "+1 555 456 7890"
];
let balance = 4.36;
const userId = "1170411845";
const refLink = "https://t.me/YourBot?start=ref123456";

// ===== دالة اختبار التوكن =====
async function testToken() {
    try {
        const response = await fetch(`${TELEGRAM_API}/getMe`);
        const data = await response.json();
        if (data.ok) {
            console.log(`✅ التوكن صحيح! البوت: @${data.result.username}`);
            return true;
        } else {
            console.log(`❌ التوكن غير صحيح: ${data.description}`);
            return false;
        }
    } catch (err) {
        console.log(`❌ فشل الاتصال: ${err.message}`);
        return false;
    }
}

// ===== دالة إرسال رسالة =====
async function sendMessage(chatId, text, keyboard = null) {
    try {
        const payload = {
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        };
        if (keyboard) payload.reply_markup = keyboard;
        
        const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (err) {
        console.error('خطأ في الإرسال:', err);
        return null;
    }
}

// ===== بناء لوحة المفاتيح =====
function getKeyboard() {
    return {
        inline_keyboard: [
            [{ text: '➕ إضافة رقم وهمي', callback_data: 'add' }],
            [{ text: '✖ حذف آخر رقم', callback_data: 'remove' }],
            [{ text: '💳 شحن رصيد', callback_data: 'charge' }],
            [{ text: '📋 نسخ الرابط', callback_data: 'copy' }],
            [{ text: '📢 القناة الرسمية', callback_data: 'channel' }],
            [{ text: '🛠 فريق الدعم', callback_data: 'support' }]
        ]
    };
}

// ===== بناء رسالة القائمة =====
function getMainMenu() {
    let accountsList = fakeAccounts.map((num, i) => `${i+1}. ${num}`).join('\n');
    if (!fakeAccounts.length) accountsList = '❌ لا توجد حسابات';
    
    return {
        text: `
📋 *القائمة الرئيسية*

🆔 ايدي حسابك: \`${userId}\`
💰 رصيدك: *$${balance.toFixed(2)}*
💵 عملة البوت: دولار

📱 *حسابات تليجرام جاهزة*
${accountsList}

🔗 *الإحالة الخاص بك*
\`${refLink}\`
        `,
        keyboard: getKeyboard()
    };
}

// ===== معالجة الأوامر =====
app.use(express.json());

app.post('/webhook', async (req, res) => {
    const { message, callback_query } = req.body;
    
    // معالجة الضغط على الأزرار
    if (callback_query) {
        const chatId = callback_query.message.chat.id;
        const msgId = callback_query.message.message_id;
        const data = callback_query.data;
        
        if (data === 'add') {
            const randomNum = `+1 ${Math.floor(Math.random()*900+100)} ${Math.floor(Math.random()*900+100)} ${Math.floor(Math.random()*9000+1000)}`;
            fakeAccounts.push(randomNum);
            const menu = getMainMenu();
            await sendMessage(chatId, menu.text, menu.keyboard);
            await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: callback_query.id, text: `✅ تم إضافة: ${randomNum}` })
            });
        }
        else if (data === 'remove') {
            if (fakeAccounts.length === 0) {
                await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ callback_query_id: callback_query.id, text: '❌ لا يوجد أرقام' })
                });
                return res.sendStatus(200);
            }
            const removed = fakeAccounts.pop();
            const menu = getMainMenu();
            await sendMessage(chatId, menu.text, menu.keyboard);
            await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: callback_query.id, text: `🗑️ تم حذف: ${removed}` })
            });
        }
        else if (data === 'charge') {
            await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: callback_query.id, text: '💰 أرسل المبلغ' })
            });
            await sendMessage(chatId, '💰 أرسل المبلغ الذي تريد شحنه (رقم فقط):\nمثال: 10');
        }
        else if (data === 'copy') {
            await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: callback_query.id, text: '📋 تم النسخ' })
            });
            await sendMessage(chatId, `📋 رابط الإحالة:\n\`${refLink}\``);
        }
        else if (data === 'channel') {
            await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: callback_query.id, text: '📢' })
            });
            await sendMessage(chatId, '📢 قناة البوت: @YourChannel');
        }
        else if (data === 'support') {
            await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: callback_query.id, text: '🛠' })
            });
            await sendMessage(chatId, '🛠 فريق الدعم: @YourSupport');
        }
        
        return res.sendStatus(200);
    }
    
    // معالجة الرسائل النصية
    if (message && message.text) {
        const chatId = message.chat.id;
        const text = message.text;
        
        if (text === '/start' || text === '/menu') {
            const menu = getMainMenu();
            await sendMessage(chatId, menu.text, menu.keyboard);
            if (text === '/start') {
                await sendMessage(chatId, '👋 أهلاً بك في بوت الحسابات الوهمية!');
            }
            return res.sendStatus(200);
        }
        
        // معالجة الشحن
        if (!isNaN(text) && parseFloat(text) > 0) {
            const amount = parseFloat(text);
            balance += amount;
            await sendMessage(chatId, `✅ تم شحن $${amount}\n💰 الرصيد الجديد: $${balance.toFixed(2)}`);
            const menu = getMainMenu();
            await sendMessage(chatId, menu.text, menu.keyboard);
            return res.sendStatus(200);
        }
        
        await sendMessage(chatId, '❌ أمر غير معروف. استخدم /menu');
    }
    
    res.sendStatus(200);
});

// ===== تشغيل الخادم =====
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    
    // اختبار التوكن فور التشغيل
    const isValid = await testToken();
    if (!isValid) {
        console.log('⚠️ البوت لن يعمل حتى يتم إصلاح التوكن!');
        return;
    }
    
    // إعداد Webhook
    const webhookUrl = `https://telegram-accounts.onrender.com/webhook`;
    try {
        const response = await fetch(`${TELEGRAM_API}/setWebhook?url=${webhookUrl}`);
        const data = await response.json();
        if (data.ok) {
            console.log(`✅ Webhook set to: ${webhookUrl}`);
        } else {
            console.log(`❌ Webhook error: ${data.description}`);
        }
    } catch (err) {
        console.log(`❌ Webhook setup failed: ${err.message}`);
    }
});
