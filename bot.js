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
        <h1 style="color:red;text-align:center;">🔥 متجر روز للتطبيقات</h1>
        <p style="text-align:center;">🤖 @StoreRozbot</p>
        <p style="text-align:center;color:red;">👑 المطور: @SSSTlF</p>
    `);
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Web server running on port ${PORT}`);
});

// ========== ألوان فاخرة للأزرار ==========
const buttonColors = {
    gold: '#FFD700',
    purple: '#9C27B0',
    blue: '#1A73E8',
    green: '#34A853',
    red: '#EA4335',
    orange: '#FF6D00',
    pink: '#E91E63',
    teal: '#00897B',
    indigo: '#3F51B5',
    cyan: '#00BCD4',
    amber: '#FFC107',
    deepPurple: '#673AB7'
};

// ========== القائمة الرئيسية ==========
function mainMenu() {
    return {
        text: `
<b>🔥 متجر روز للتطبيقات</b>

👤 <b>المستخدم:</b> <code>${userId}</code>
💰 <b>رصيدك:</b> <code>$0.0000</code>

<b>📌 اختر من القائمة:</b>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('🛒 إبدأ التسوق', 'shop')],
            [Markup.button.callback('📦 طلباتي', 'orders')],
            [Markup.button.callback('💳 إشحن رصيدك', 'charge')],
            [Markup.button.callback('🎫 شحن بطاقات', 'cards')],
            [Markup.button.callback('📢 قناة البوت', 'channel')],
            [Markup.button.callback('⚙️ الإعدادات', 'settings')],
            [Markup.button.callback('🛠 الدعم الفني', 'support')],
            [Markup.button.callback('🎁 العرض اليومي', 'daily_offer')],
            [Markup.button.callback('⭐ مستوى VIP', 'vip')],
            [Markup.button.callback('🧠 المساعد الذكي', 'assistant')],
            [Markup.button.callback('📖 دليل الاستخدام', 'guide')]
        ], { columns: 2 })
    };
}

// ========== الأزرار ==========
bot.action('shop', async (ctx) => {
    await ctx.answerCbQuery('🛒 جاري تحميل الخدمات...');
    await ctx.replyWithHTML(`
<b>🛒 الخدمات المتوفرة</b>

📌 <b>جميع الخدمات متوفرة</b>
💰 <b>للطلب تواصل مع المطور:</b> @SSSTlF

🔒 <b>جميع الخدمات آمنة</b>
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('orders', async (ctx) => {
    await ctx.answerCbQuery('📦 طلباتك');
    await ctx.replyWithHTML(`
<b>📦 طلباتي</b>

📌 <b>ليس لديك طلبات حالياً</b>

🛒 <b>ابدأ التسوق الآن!</b>
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('charge', async (ctx) => {
    await ctx.answerCbQuery('💳 شحن الرصيد');
    await ctx.replyWithHTML(`
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
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('cards', async (ctx) => {
    await ctx.answerCbQuery('🎫 شحن بطاقات');
    await ctx.replyWithHTML(`
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
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('settings', async (ctx) => {
    await ctx.answerCbQuery('⚙️ الإعدادات');
    await ctx.replyWithHTML(`
<b>⚙️ الإعدادات</b>

🔹 <b>العملة:</b> USD ($)
🔹 <b>اللغة:</b> العربية
🔹 <b>الإشعارات:</b> مفعلة

📌 <b>اختر ما تريد تعديله:</b>
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('support', async (ctx) => {
    await ctx.answerCbQuery('🛠 الدعم الفني');
    await ctx.replyWithHTML(`
<b>🛠 الدعم الفني</b>

📩 <b>تواصل مع المطور:</b> @SSSTlF

⏰ <b>أوقات الدعم:</b> 24/7
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('daily_offer', async (ctx) => {
    await ctx.answerCbQuery('🎁 العرض اليومي');
    await ctx.replyWithHTML(`
<b>🎁 العرض اليومي</b>

🔥 <b>خصم 50% على جميع الخدمات</b>

⏰ <b>العرض محدود!</b>

📌 <b>للطلب:</b> @SSSTlF
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('vip', async (ctx) => {
    await ctx.answerCbQuery('⭐ VIP');
    await ctx.replyWithHTML(`
<b>⭐ مستوى VIP</b>

👑 <b>مستواك الحالي:</b> برونزي

<b>📊 مميزات VIP:</b>
✅ خصم 10% على جميع الخدمات
✅ أولوية في الدعم الفني
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('assistant', async (ctx) => {
    await ctx.answerCbQuery('🧠 المساعد الذكي');
    await ctx.replyWithHTML(`
<b>🧠 المساعد الذكي</b>

🤖 <b>اسألني أي شيء!</b>

💬 <b>أنا هنا لمساعدتك 24/7</b>
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('guide', async (ctx) => {
    await ctx.answerCbQuery('📖 دليل الاستخدام');
    await ctx.replyWithHTML(`
<b>📖 دليل استخدام البوت</b>

📌 <b>خطوات التسوق:</b>
1️⃣ اختر "إبدأ التسوق"
2️⃣ اختر الخدمة المناسبة
3️⃣ ادفع واستلم الخدمة

🔒 <b>جميع العمليات آمنة</b>
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('channel', async (ctx) => {
    await ctx.answerCbQuery('📢 القناة الرسمية');
    await ctx.replyWithHTML('<b>📢 قناة البوت الرسمية:</b> @SSSTlF', {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
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
<b>🔥 مرحباً بك في متجر روز للتطبيقات</b>

👤 <b>المستخدم:</b> ${ctx.from.first_name}
💰 <b>رصيدك:</b> $0.00
    `);
    await ctx.replyWithHTML(data.text, { ...data.buttons, disable_web_page_preview: true });
});

bot.command('menu', async (ctx) => {
    const data = mainMenu();
    await ctx.replyWithHTML(data.text, { ...data.buttons, disable_web_page_preview: true });
});

// ========== تشغيل البوت ==========
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
