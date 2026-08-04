const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const BOT_TOKEN = "8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI";
const bot = new Telegraf(BOT_TOKEN);
const userId = "8505541555";

// ========== خادم الويب ==========
const app = express();
const PORT = process.env.PORT || 10000;

// ========== صفحة الويب المخصصة ==========
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TG - Store Roz | API</title>
            <script src="https://telegram.org/js/telegram-web-app.js"></script>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    background: #0a0a1a;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                    padding: 20px;
                    color: white;
                    min-height: 100vh;
                }
                .container {
                    max-width: 500px;
                    margin: 0 auto;
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                    padding: 20px;
                    background: linear-gradient(135deg, #1a1a3e, #2d1b69);
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .header h1 {
                    font-size: 28px;
                    font-weight: 800;
                    background: linear-gradient(135deg, #ff6b6b, #ffd93d);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .header .sub {
                    color: #888;
                    font-size: 14px;
                    margin-top: 5px;
                }
                .stats {
                    background: rgba(255,255,255,0.05);
                    border-radius: 15px;
                    padding: 15px;
                    margin-bottom: 15px;
                    text-align: center;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .stats .number {
                    font-size: 24px;
                    font-weight: bold;
                    color: #ffd93d;
                }
                .stats .label {
                    color: #888;
                    font-size: 14px;
                }
                .info-box {
                    background: rgba(255,255,255,0.05);
                    border-radius: 15px;
                    padding: 15px;
                    margin-bottom: 15px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .info-box .title {
                    color: #ffd93d;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .info-box .text {
                    color: #ccc;
                    font-size: 14px;
                }
                .info-box .highlight {
                    color: #ff6b6b;
                }
                .balance {
                    background: linear-gradient(135deg, #1a1a3e, #2d1b69);
                    border-radius: 15px;
                    padding: 15px;
                    margin-bottom: 20px;
                    text-align: center;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .balance .amount {
                    font-size: 28px;
                    font-weight: bold;
                    color: #ffd93d;
                }
                .balance .label {
                    color: #888;
                    font-size: 14px;
                }
                .grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-bottom: 20px;
                }
                .btn {
                    padding: 16px 12px;
                    border: none;
                    border-radius: 14px;
                    font-size: 14px;
                    font-weight: 600;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    position: relative;
                    overflow: hidden;
                }
                .btn:active {
                    transform: scale(0.95);
                }
                .btn .emoji {
                    display: block;
                    font-size: 22px;
                    margin-bottom: 4px;
                }
                .btn-gold { background: linear-gradient(135deg, #f7971e, #ffd200); }
                .btn-purple { background: linear-gradient(135deg, #a18cd1, #fbc2eb); color: #1a1a3e; }
                .btn-blue { background: linear-gradient(135deg, #4facfe, #00f2fe); }
                .btn-green { background: linear-gradient(135deg, #43e97b, #38f9d7); color: #1a1a3e; }
                .btn-red { background: linear-gradient(135deg, #f093fb, #f5576c); }
                .btn-orange { background: linear-gradient(135deg, #fa709a, #fee140); color: #1a1a3e; }
                .btn-pink { background: linear-gradient(135deg, #fbc2eb, #a6c1ee); color: #1a1a3e; }
                .btn-teal { background: linear-gradient(135deg, #a8edea, #fed6e3); color: #1a1a3e; }
                .btn-indigo { background: linear-gradient(135deg, #4facfe, #00f2fe); }
                .btn-cyan { background: linear-gradient(135deg, #89f7fe, #66a6ff); }
                .btn-amber { background: linear-gradient(135deg, #f7971e, #ffd200); }
                .btn-deep-purple { background: linear-gradient(135deg, #a18cd1, #fbc2eb); color: #1a1a3e; }
                .btn-full {
                    grid-column: 1 / -1;
                }
                .footer {
                    text-align: center;
                    color: #666;
                    font-size: 12px;
                    padding: 10px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                @media (max-width: 400px) {
                    .grid {
                        grid-template-columns: 1fr;
                    }
                    .btn-full {
                        grid-column: 1;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🔥 TG - Store Roz | API</h1>
                    <div class="sub">🤖 @StoreRozbot</div>
                </div>

                <div class="stats">
                    <div class="number">1.75M</div>
                    <div class="label">مستخدمًا شهريًا</div>
                </div>

                <div class="info-box">
                    <div class="title">📌 الشراء الخدمات:</div>
                    <div class="text">اختر "الخدمات" ...</div>
                </div>

                <div class="info-box">
                    <div class="title">📌 لرؤية المنتجات حسب عملك المحلية</div>
                    <div class="text">• <span class="highlight">الإعدادات</span></div>
                    <div class="text">• <span class="highlight">تغيير العملة</span></div>
                </div>

                <div class="info-box">
                    <div class="text">🔒 كل العمليات تتم تلقائياً وبشكل آمن وفوراً</div>
                </div>

                <div class="balance">
                    <div class="label">💰 رصيدك</div>
                    <div class="amount">$0.0000 | $0.00</div>
                </div>

                <div class="grid">
                    <button class="btn btn-gold" onclick="sendData('shop')">
                        <span class="emoji">🛒</span> إبدأ التسوق
                    </button>
                    <button class="btn btn-purple" onclick="sendData('orders')">
                        <span class="emoji">📦</span> طلباتي
                    </button>
                    <button class="btn btn-blue" onclick="sendData('charge')">
                        <span class="emoji">💳</span> إشحن رصيدك
                    </button>
                    <button class="btn btn-green" onclick="sendData('cards')">
                        <span class="emoji">🎫</span> شحن بطاقات
                    </button>
                    <button class="btn btn-red" onclick="sendData('channel')">
                        <span class="emoji">📢</span> قناة البوت
                    </button>
                    <button class="btn btn-orange" onclick="sendData('settings')">
                        <span class="emoji">⚙️</span> الإعدادات
                    </button>
                    <button class="btn btn-pink" onclick="sendData('support')">
                        <span class="emoji">🛠</span> الدعم الفني
                    </button>
                    <button class="btn btn-teal" onclick="sendData('daily_offer')">
                        <span class="emoji">🎁</span> العرض اليومي
                    </button>
                    <button class="btn btn-indigo" onclick="sendData('vip')">
                        <span class="emoji">⭐</span> مستوى VIP
                    </button>
                    <button class="btn btn-cyan" onclick="sendData('assistant')">
                        <span class="emoji">🧠</span> المساعد الذكي
                    </button>
                    <button class="btn btn-amber btn-full" onclick="sendData('guide')">
                        <span class="emoji">📖</span> دليل الاستخدام
                    </button>
                </div>

                <div class="footer">
                    🔒 جميع العمليات آمنة ومشفرة
                </div>
            </div>

            <script>
                function sendData(action) {
                    if (window.Telegram && Telegram.WebApp) {
                        Telegram.WebApp.sendData(JSON.stringify({ action: action }));
                        Telegram.WebApp.close();
                    } else {
                        alert('يفضل فتح البوت من تطبيق تيليجرام');
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// ========== معالجة Web App ==========
bot.on('web_app_data', async (ctx) => {
    try {
        const data = JSON.parse(ctx.message.web_app_data.data);
        const action = data.action;
        
        const responses = {
            shop: `
<b>🛒 الخدمات المتوفرة</b>

📌 <b>جميع الخدمات متوفرة</b>
💰 <b>للطلب تواصل مع المطور:</b> @SSSTlF

🔒 <b>جميع الخدمات آمنة</b>
            `,
            orders: `
<b>📦 طلباتي</b>

📌 <b>ليس لديك طلبات حالياً</b>

🛒 <b>ابدأ التسوق الآن!</b>
            `,
            charge: `
<b>💳 إشحن رصيدك</b>

💰 <b>رصيدك الحالي:</b> $0.00

📌 <b>اختر المبلغ:</b>
• 10$ → 10$ 
• 25$ → 25$ 
• 50$ → 50$ + 5$ هدية
• 100$ → 100$ + 15$ هدية

💳 <b>طرق الدفع:</b>
• بطاقة ائتمان
• تحويل بنكي
            `,
            cards: `
<b>🎫 شحن بطاقات</b>

📌 <b>اشحن باستخدام بطاقات:</b>
• بطاقات STC
• بطاقات Mobily
• بطاقات Zain

💰 <b>الرصيد:</b>
• 10$ → 10$
• 25$ → 25$
• 50$ → 50$

⚡ <b>شحن فوري وآمن</b>
            `,
            channel: '<b>📢 قناة البوت الرسمية:</b> @SSSTlF',
            settings: `
<b>⚙️ الإعدادات</b>

🔹 <b>العملة:</b> USD ($)
🔹 <b>اللغة:</b> العربية
🔹 <b>الإشعارات:</b> مفعلة

📌 <b>اختر ما تريد تعديله:</b>
            `,
            support: `
<b>🛠 الدعم الفني</b>

📩 <b>تواصل مع المطور:</b> @SSSTlF

⏰ <b>أوقات الدعم:</b> 24/7
            `,
            daily_offer: `
<b>🎁 العرض اليومي</b>

🔥 <b>خصم 50% على جميع الخ services</b>

⏰ <b>العرض محدود!</b>

📌 <b>للطلب:</b> @SSSTlF
            `,
            vip: `
<b>⭐ مستوى VIP</b>

👑 <b>مستواك الحالي:</b> برونزي

<b>📊 مميزات VIP:</b>
✅ خصم 10% على جميع الخدمات
✅ أولوية في الدعم الفني
            `,
            assistant: `
<b>🧠 المساعد الذكي</b>

🤖 <b>اسألني أي شيء!</b>

💬 <b>أنا هنا لمساعدتك 24/7</b>
            `,
            guide: `
<b>📖 دليل استخدام البوت</b>

📌 <b>خطوات التسوق:</b>
1️⃣ اختر "إبدأ التسوق"
2️⃣ اختر الخدمة المناسبة
3️⃣ ادفع واستلم الخدمة

🔒 <b>جميع العمليات آمنة</b>
            `
        };

        await ctx.replyWithHTML(responses[action] || '❌ حدث خطأ، حاول مرة أخرى');

    } catch (error) {
        await ctx.reply('❌ حدث خطأ، حاول مرة أخرى');
    }
});

// ========== القائمة الرئيسية ==========
function mainMenu() {
    const webAppUrl = `https://${process.env.RAILWAY_STATIC_URL || 'localhost:' + PORT}`;
    return {
        text: `
<b>🔥 TG - Store Roz | API</b>

👥 <b>1.75M</b> مستخدمًا شهريًا

<b>📌 الشراء الخدمات:</b>
اختر "الخدمات" ...

<b>📌 لرؤية المنتجات حسب عملك المحلية</b>
• الإعدادات
• تغيير العملة

🔒 <b>كل العمليات تتم تلقائياً وبشكل آمن وفوراً</b>

<b>💰 رصيدك:</b> <code>$0.0000 | $0.00</code>

<b>📌 اختر من القائمة:</b>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.webApp('🔥 افتح المتجر', webAppUrl)]
        ])
    };
}

// ========== الأوامر ==========
bot.start(async (ctx) => {
    const data = mainMenu();
    await ctx.replyWithHTML(`
<b>🔥 مرحباً بك في متجر روز للتطبيقات</b>

👤 <b>المستخدم:</b> ${ctx.from.first_name}
💰 <b>رصيدك:</b> $0.00
    `);
    await ctx.replyWithHTML(data.text, data.buttons);
});

bot.command('menu', async (ctx) => {
    const data = mainMenu();
    await ctx.replyWithHTML(data.text, data.buttons);
});

// ========== تشغيل البوت ==========
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Web server running on port ${PORT}`);
});

console.log('🚀 جاري تشغيل البوت...');

bot.launch({
    dropPendingUpdates: true
}).then(() => {
    console.log('✅ Bot is running successfully!');
    console.log('🤖 Bot: @StoreRozbot');
    console.log('👑 المطور: @SSSTlF');
}).catch((err) => {
    console.error('❌ Failed to start bot:', err.message);
});

process.once('SIGINT', () => {
    console.log('🛑 Stopping bot...');
    bot.stop('SIGINT');
    server.close(() => process.exit(0));
});

process.once('SIGTERM', () => {
    console.log('🛑 Stopping bot...');
    bot.stop('SIGTERM');
    server.close(() => process.exit(0));
});
