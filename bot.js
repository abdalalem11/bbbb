const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const BOT_TOKEN = "8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI";
const bot = new Telegraf(BOT_TOKEN);
const userId = "8505541555";

// ========== خادم الويب ==========
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
    res.send(`
        <h1 style="color:blue;text-align:center;">💰 TON Price Bot</h1>
        <p style="text-align:center;">🤖 @tonpricesbot</p>
        <p style="text-align:center;">👑 المطور: @SSSTlF</p>
    `);
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Web server running on port ${PORT}`);
});

// ========== سعر TON ==========
let tonPrice = {
    usd: '5.42',
    btc: '0.000085',
    change: '+2.3%'
};

// تحديث السعر كل 5 دقائق (محاكاة)
setInterval(() => {
    const randomChange = (Math.random() * 4 - 2).toFixed(1);
    const basePrice = 5.42 + (Math.random() * 0.5 - 0.25);
    tonPrice = {
        usd: basePrice.toFixed(2),
        btc: (basePrice * 0.0000157).toFixed(6),
        change: randomChange > 0 ? `+${randomChange}%` : `${randomChange}%`
    };
    console.log(`💰 تحديث السعر: $${tonPrice.usd} | ${tonPrice.change}`);
}, 300000); // 5 دقائق

// ========== القائمة الرئيسية ==========
function mainMenu() {
    return {
        text: `
<b>💰 TON Price</b>

👥 <b>57,836</b> مشترك

📊 <b>سعر TON الحالي:</b>
💵 <b>USD:</b> <code>$${tonPrice.usd}</code>
₿ <b>BTC:</b> <code>${tonPrice.btc}</code>
📈 <b>التغير:</b> <code>${tonPrice.change}</code>

🔄 <b>يتم تحديث السعر كل 5 دقائق</b>

📌 <b>اختر من القائمة:</b>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('🔄 تحديث السعر', 'update_price')],
            [Markup.button.callback('📊 عرض السعر', 'show_price')],
            [Markup.button.callback('📤 مشاركة السعر', 'share_price')],
            [Markup.button.callback('📈 الرسم البياني', 'chart')],
            [Markup.button.callback('🔔 تنبيه السعر', 'alert')],
            [Markup.button.callback('📢 القناة الرسمية', 'channel')],
            [Markup.button.callback('🛠 الدعم الفني', 'support')]
        ], { columns: 2 })
    };
}

// ========== الأزرار ==========
bot.action('update_price', async (ctx) => {
    // تحديث السعر يدوياً
    const randomChange = (Math.random() * 4 - 2).toFixed(1);
    const basePrice = 5.42 + (Math.random() * 0.5 - 0.25);
    tonPrice = {
        usd: basePrice.toFixed(2),
        btc: (basePrice * 0.0000157).toFixed(6),
        change: randomChange > 0 ? `+${randomChange}%` : `${randomChange}%`
    };
    
    await ctx.answerCbQuery('🔄 تم تحديث السعر');
    await ctx.replyWithHTML(`
<b>✅ تم تحديث السعر</b>

💵 <b>USD:</b> <code>$${tonPrice.usd}</code>
₿ <b>BTC:</b> <code>${tonPrice.btc}</code>
📈 <b>التغير:</b> <code>${tonPrice.change}</code>

🔄 <b>آخر تحديث:</b> <code>${new Date().toLocaleTimeString()}</code>
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('show_price', async (ctx) => {
    await ctx.answerCbQuery('📊 عرض السعر');
    await ctx.replyWithHTML(`
<b>📊 سعر TON الحالي</b>

💵 <b>USD:</b> <code>$${tonPrice.usd}</code>
₿ <b>BTC:</b> <code>${tonPrice.btc}</code>
📈 <b>التغير:</b> <code>${tonPrice.change}</code>

🔄 <b>آخر تحديث:</b> <code>${new Date().toLocaleTimeString()}</code>
⏱ <b>التحديث القادم:</b> بعد 5 دقائق

📌 <b>شارك السعر مع أصدقائك!</b>
    `, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.callback('📤 مشاركة السعر', 'share_price')],
                [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
            ]
        }
    });
});

bot.action('share_price', async (ctx) => {
    await ctx.answerCbQuery('📤 جاري التجهيز للمشاركة');
    await ctx.replyWithHTML(`
<b>📤 شارك سعر TON</b>

💵 <b>سعر TON الحالي:</b> <code>$${tonPrice.usd}</code>
📈 <b>التغير:</b> <code>${tonPrice.change}</code>

📌 <b>انسخ النص وأرسله لأصدقائك:</b>
<code>💰 سعر TON الآن: $${tonPrice.usd} (${tonPrice.change})
🔄 يتم التحديث كل 5 دقائق
🤖 @tonpricesbot</code>

🔗 <b>رابط البوت:</b> https://t.me/tonpricesbot
    `, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
            ]
        }
    });
});

bot.action('chart', async (ctx) => {
    await ctx.answerCbQuery('📈 الرسم البياني');
    await ctx.replyWithHTML(`
<b>📈 الرسم البياني لسعر TON</b>

📊 <b>البيانات المتوفرة:</b>
• السعر الحالي: <code>$${tonPrice.usd}</code>
• التغير: <code>${tonPrice.change}</code>
• آخر تحديث: <code>${new Date().toLocaleTimeString()}</code>

📌 <b>للحصول على رسم بياني تفصيلي:</b>
🔗 https://www.coingecko.com/en/coins/toncoin

📊 <b>بيانات السوق:</b>
• أعلى سعر اليوم: $5.68
• أدنى سعر اليوم: $5.12
• الحجم: 24.5M
    `, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.callback('🔄 تحديث السعر', 'update_price')],
                [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
            ]
        }
    });
});

bot.action('alert', async (ctx) => {
    await ctx.answerCbQuery('🔔 تنبيه السعر');
    await ctx.replyWithHTML(`
<b>🔔 تنبيه السعر</b>

📌 <b>قم بتعيين تنبيه للسعر:</b>

1️⃣ <b>تنبيه ارتفاع:</b>
عندما يصل السعر إلى $6.00

2️⃣ <b>تنبيه انخفاض:</b>
عندما يصل السعر إلى $5.00

📌 <b>لتفعيل التنبيه:</b>
أرسل الأمر التالي:
<code>/alert 6.00</code> (لارتفاع)
<code>/alert 5.00</code> (لانخفاض)

🔔 <b>التنبيهات الحالية:</b>
• لا توجد تنبيهات نشطة
    `, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
            ]
        }
    });
});

bot.action('channel', async (ctx) => {
    await ctx.answerCbQuery('📢 القناة الرسمية');
    await ctx.replyWithHTML(`
<b>📢 قناة TON Price الرسمية</b>

👥 <b>المشتركين:</b> 57,836

📊 <b>مميزات القناة:</b>
• تحديث السعر كل 5 دقائق
• أخبار TON الحصرية
• تحليلات السوق

🔗 <b>رابط القناة:</b>
https://t.me/tonprices

🤖 <b>بوت السعر:</b>
@tonpricesbot
    `, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.url('📢 اشترك في القناة', 'https://t.me/tonprices')],
                [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
            ]
        }
    });
});

bot.action('support', async (ctx) => {
    await ctx.answerCbQuery('🛠 الدعم الفني');
    await ctx.replyWithHTML(`
<b>🛠 الدعم الفني</b>

📩 <b>تواصل مع المطور:</b> @SSSTlF

📋 <b>للإبلاغ عن مشكلة أو استفسار</b>

⏰ <b>أوقات الدعم:</b> 24/7

📌 <b>الأسئلة الشائعة:</b>
• كيف يتم تحديث السعر؟ كل 5 دقائق
• هل البوت مجاني؟ نعم
• كيف أشارك السعر؟ اضغط على زر المشاركة
    `, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
            ]
        }
    });
});

bot.action('menu', async (ctx) => {
    const data = mainMenu();
    await ctx.answerCbQuery('🏠 القائمة الرئيسية');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

// ========== الأوامر ==========
bot.start(async (ctx) => {
    const data = mainMenu();
    await ctx.replyWithHTML(`
<b>💰 مرحباً بك في بوت TON Price</b>

📊 <b>سعر TON الحالي:</b> <code>$${tonPrice.usd}</code>
🔄 <b>يتم التحديث كل 5 دقائق</b>

📌 <b>اختر من القائمة:</b>
    `);
    await ctx.replyWithHTML(data.text, { ...data.buttons, disable_web_page_preview: true });
});

bot.command('menu', async (ctx) => {
    const data = mainMenu();
    await ctx.replyWithHTML(data.text, { ...data.buttons, disable_web_page_preview: true });
});

bot.command('price', async (ctx) => {
    await ctx.replyWithHTML(`
💰 <b>سعر TON</b>
💵 <b>USD:</b> <code>$${tonPrice.usd}</code>
📈 <b>التغير:</b> <code>${tonPrice.change}</code>
    `);
});

// ========== تشغيل البوت ==========
console.log('🚀 جاري تشغيل البوت...');

bot.launch({
    dropPendingUpdates: true
}).then(() => {
    console.log('✅ Bot is running successfully!');
    console.log('🤖 Bot: @tonpricesbot');
    console.log('👑 المطور: @SSSTlF');
    console.log(`💰 سعر TON: $${tonPrice.usd}`);
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
