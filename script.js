const express = require('express');
const { Telegraf, Markup } = require('telegraf');

// ===== التوكن =====
const BOT_TOKEN = "8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI";
const bot = new Telegraf(BOT_TOKEN);

// ===== إعداد Express للـ Render =====
const app = express();
const port = process.env.PORT || 3000;

// ===== الروابط =====
const DEVELOPER_LINK = "https://t.me/u_t_r";
const SUPPORT_CHANNEL = "https://t.me/u_t_r2";

// ===== قائمة المطور =====
const DEV_KEYBOARD = Markup.inlineKeyboard([
    [Markup.button.url('👨‍💻 تواصل مع المطور', DEVELOPER_LINK)],
    [Markup.button.url('📢 قناة الدعم', SUPPORT_CHANNEL)],
    [Markup.button.callback('🔙 رجوع', 'back_to_main')]
]);

// ===== القائمة الرئيسية =====
const MAIN_KEYBOARD = Markup.keyboard([
    ['👨‍💻 تواصل مع المطور'],
    ['ℹ️ معلومات عن البوت']
]).resize();

// ===== أمر /start =====
bot.start(async (ctx) => {
    const welcomeText = `
✨ *مرحباً بك عزيزي ${ctx.from.first_name}* ✨

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

🤖 *بوت التواصل مع المطور*

📌 *خدمات البوت:*
• 📱 التواصل المباشر مع المطور
• 💡 الحصول على الدعم الفني

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

💫 *كيفية الاستخدام:*
1️⃣ اضغط على زر "تواصل مع المطور"
2️⃣ اختر طريقة التواصل المناسبة
3️⃣ اكتب رسالتك وسيتم الرد عليك

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

⚡️ *متوفر 24/7* 
📌 *وقت الرد:* خلال 24 ساعة
`;

    await ctx.reply(welcomeText, {
        parse_mode: 'Markdown',
        reply_markup: MAIN_KEYBOARD
    });
});

// ===== أمر /menu =====
bot.command('menu', async (ctx) => {
    const menuText = `
📋 *القائمة الرئيسية*

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

👨‍💻 *تواصل مع المطور*
ℹ️ *معلومات عن البوت*

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📌 اختر الخدمة التي تريدها
`;

    await ctx.reply(menuText, {
        parse_mode: 'Markdown',
        reply_markup: MAIN_KEYBOARD
    });
});

// ===== معالجة الرسائل النصية =====
bot.on('text', async (ctx) => {
    const text = ctx.message.text;

    // ===== معلومات عن البوت =====
    if (text === 'ℹ️ معلومات عن البوت') {
        const infoText = `
📊 *معلومات عن البوت*

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

🤖 *الاسم:* بوت التواصل مع المطور
🐍 *لغة البرمجة:* JavaScript (Node.js)
⚡️ *الحالة:* نشط 🟢

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📌 *الوظيفة:*
• التواصل المباشر مع المطور والدعم الفني

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📢 *قناة الدعم:* @u_t_r2
📱 *للتواصل:* @u_t_r
`;

        await ctx.reply(infoText, {
            parse_mode: 'Markdown',
            reply_markup: MAIN_KEYBOARD
        });
        return;
    }

    // ===== تواصل مع المطور =====
    if (text === '👨‍💻 تواصل مع المطور') {
        const devText = `
👨‍💻 *المطور*

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📱 *طرق التواصل:*
• اضغط على زر التواصل أدناه
• ارسال رسالة مباشرة
• الرد خلال 24 ساعة

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📢 *للانضمام لقناة الدعم:* @u_t_r2
💫 *للتواصل اضغط على الزر أدناه*
`;

        await ctx.reply(devText, {
            parse_mode: 'Markdown',
            reply_markup: DEV_KEYBOARD
        });
        return;
    }

    // ===== رسالة افتراضية =====
    await ctx.reply(
        `❓ *عذراً، لم أفهم طلبك*

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📌 *الخيارات المتاحة:*
• 👨‍💻 تواصل مع المطور
• ℹ️ معلومات عن البوت

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📢 *قناة الدعم:* @u_t_r2
💡 *للتواصل المباشر:* @u_t_r`,
        {
            parse_mode: 'Markdown',
            reply_markup: MAIN_KEYBOARD
        }
    );
});

// ===== معالجة الأزرار =====
bot.action('back_to_main', async (ctx) => {
    await ctx.deleteMessage();
    await ctx.reply(
        '✨ *تم العودة إلى القائمة الرئيسية* ✨\n\n📌 اختر الخدمة التي تريدها:',
        {
            parse_mode: 'Markdown',
            reply_markup: MAIN_KEYBOARD
        }
    );
    await ctx.answerCbQuery();
});

// ===== تشغيل البوت مع Express =====
async function startBot() {
    try {
        // تشغيل البوت
        await bot.launch();
        console.log('✅ Bot is running successfully!');
        console.log(`🤖 Bot username: @${bot.botInfo?.username || 'unknown'}`);
        console.log(`🆔 Bot ID: ${bot.botInfo?.id || 'unknown'}`);

        // تشغيل الخادم
        app.listen(port, () => {
            console.log(`✅ Server running on port ${port}`);
            console.log('📢 Support Channel: @u_t_r2');
            console.log('📱 Contact: @u_t_r');
        });

        // ===== مسار بسيط للتحقق =====
        app.get('/', (req, res) => {
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>🤖 بوت التواصل</title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-height: 100vh;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            margin: 0;
                            color: white;
                            text-align: center;
                            padding: 20px;
                        }
                        .container {
                            background: rgba(255,255,255,0.15);
                            padding: 50px;
                            border-radius: 30px;
                            backdrop-filter: blur(20px);
                            border: 1px solid rgba(255,255,255,0.2);
                            max-width: 600px;
                            width: 100%;
                            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                        }
                        .icon { font-size: 80px; margin-bottom: 20px; }
                        h1 { 
                            font-size: 2.5em; 
                            margin-bottom: 15px;
                            font-weight: 700;
                        }
                        p { 
                            font-size: 1.2em; 
                            opacity: 0.95;
                            line-height: 1.6;
                            margin-bottom: 10px;
                        }
                        .status { 
                            color: #4ade80; 
                            font-weight: bold;
                            font-size: 1.1em;
                            display: inline-block;
                            background: rgba(74, 222, 128, 0.2);
                            padding: 8px 25px;
                            border-radius: 50px;
                            margin: 15px 0;
                        }
                        hr { 
                            border: 1px solid rgba(255,255,255,0.15); 
                            margin: 25px 0; 
                        }
                        .info-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 15px;
                            margin-top: 20px;
                        }
                        .info-item {
                            background: rgba(255,255,255,0.08);
                            padding: 15px;
                            border-radius: 15px;
                            backdrop-filter: blur(10px);
                        }
                        .info-item .label {
                            font-size: 0.8em;
                            opacity: 0.7;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        }
                        .info-item .value {
                            font-size: 1.1em;
                            font-weight: 600;
                            margin-top: 5px;
                        }
                        .footer {
                            margin-top: 25px;
                            font-size: 0.9em;
                            opacity: 0.8;
                        }
                        @media (max-width: 500px) {
                            .container { padding: 30px 20px; }
                            h1 { font-size: 1.8em; }
                            .icon { font-size: 60px; }
                            .info-grid { grid-template-columns: 1fr; }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="icon">🤖</div>
                        <h1>بوت التواصل مع المطور</h1>
                        <p>✅ البوت يعمل بنجاح!</p>
                        <div class="status">🟢 Online</div>
                        <hr>
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="label">📢 قناة الدعم</div>
                                <div class="value">@u_t_r2</div>
                            </div>
                            <div class="info-item">
                                <div class="label">📱 تواصل</div>
                                <div class="value">@u_t_r</div>
                            </div>
                            <div class="info-item">
                                <div class="label">⚡️ الحالة</div>
                                <div class="value" style="color: #4ade80;">نشط</div>
                            </div>
                        </div>
                        <div class="footer">
                            💡 للتواصل مع المطور اضغط على @u_t_r
                        </div>
                    </div>
                </body>
                </html>
            `);
        });

    } catch (err) {
        console.error('❌ Failed to start bot:', err.message);
        if (err.message.includes('401')) {
            console.error('⚠️ توكن البوت غير صحيح. تأكد من التوكن من @BotFather');
        }
        process.exit(1);
    }
}

startBot();

// ===== إيقاف البوت =====
process.once('SIGINT', () => {
    bot.stop('SIGINT');
    console.log('🛑 Bot stopped by SIGINT');
    process.exit(0);
});

process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
    console.log('🛑 Bot stopped by SIGTERM');
    process.exit(0);
});
