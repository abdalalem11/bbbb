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
        <h1 style="color:red;text-align:center;">🔥 TG - Store Roz | API</h1>
        <p style="text-align:center;">🤖 @StoreRozbot</p>
        <p style="text-align:center;color:red;">👑 المطور: @SSSTlF</p>
    `);
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Web server running on port ${PORT}`);
});

// ========== الألوان ==========
const COLORS = {
    primary: '#1a73e8',
    success: '#34a853',
    warning: '#fbbc04',
    danger: '#ea4335',
    dark: '#202124',
    gray: '#5f6368',
    gold: '#FFD700',
    purple: '#9c27b0'
};

// ========== القائمة الرئيسية ==========
function mainMenu() {
    return {
        text: `
<b>🔥 TG - Store Roz | API</b>

👤 <b>المستخدم:</b> ${userId}
💰 <b>رصيدك:</b> <code>$0.0000 | $0.00</code>
📊 <b>المستخدمين:</b> 1.75M شهرياً

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

// ========== قائمة الخدمات ==========
function servicesMenu() {
    return {
        text: `
<b>🛒 اختر الخدمات</b>

📌 <b>لرؤية المنتجات حسب عملك المحلية</b>

💱 <b>العملة الحالية:</b> USD ($)

<b>📦 جميع الخدمات تعمل تلقائياً وبشكل آمن</b>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('📱 تطبيقات جوال', 'services_apps')],
            [Markup.button.callback('🤖 بوتات تليجرام', 'services_bots')],
            [Markup.button.callback('🌐 مواقع ويب', 'services_websites')],
            [Markup.button.callback('💾 قواعد بيانات', 'services_databases')],
            [Markup.button.callback('🛡️ أمن سيبراني', 'services_security')],
            [Markup.button.callback('🎨 تصميم واجهات', 'services_design')],
            [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
        ], { columns: 2 })
    };
}

// ========== الإعدادات ==========
function settingsMenu() {
    return {
        text: `
<b>⚙️ الإعدادات</b>

🔹 <b>العملة:</b> USD ($)
🔹 <b>اللغة:</b> العربية
🔹 <b>الإشعارات:</b> مفعلة
🔹 <b>الخصوصية:</b> عام

<b>📌 اختر ما تريد تعديله:</b>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('💱 تغيير العملة', 'change_currency')],
            [Markup.button.callback('🌐 تغيير اللغة', 'change_language')],
            [Markup.button.callback('🔔 الإشعارات', 'notifications')],
            [Markup.button.callback('🔒 الخصوصية', 'privacy')],
            [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
        ], { columns: 2 })
    };
}

// ========== الدعم الفني ==========
function supportMenu() {
    return {
        text: `
<b>🛠 الدعم الفني</b>

📩 <b>تواصل مع المطور:</b> @SSSTlF

📋 <b>للإبلاغ عن مشكلة أو استفسار</b>

⏰ <b>أوقات الدعم:</b> 24/7
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.url('📩 تواصل مع المطور', 'https://t.me/SSSTlF')],
            [Markup.button.callback('📋 الإبلاغ عن مشكلة', 'report_issue')],
            [Markup.button.callback('❓ الأسئلة الشائعة', 'faq')],
            [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
        ], { columns: 2 })
    };
}

// ========== مستوى VIP ==========
function vipMenu() {
    return {
        text: `
<b>⭐ مستوى VIP</b>

👑 <b>مستواك الحالي:</b> برونزي

<b>📊 مميزات VIP:</b>
✅ خصم 10% على جميع الخدمات
✅ أولوية في الدعم الفني
✅ خدمات حصرية

<b>📌 لرفع مستواك:</b>
🟡 برونزي → فضي (اشتراك 50$)
🟡 فضي → ذهبي (اشتراك 100$)
🟡 ذهبي → ماسي (اشتراك 200$)
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('💳 ترقية VIP', 'upgrade_vip')],
            [Markup.button.callback('📊 مميزات VIP', 'vip_features')],
            [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
        ], { columns: 2 })
    };
}

// ========== المساعد الذكي ==========
function assistantMenu() {
    return {
        text: `
<b>🧠 المساعد الذكي</b>

🤖 <b>اسألني أي شيء!</b>

📌 <b>أمثلة:</b>
• ما هو أفضل تطبيق لمشروعي؟
• كيف أبدأ في البرمجة؟
• ما هي أفضل أدوات التصميم؟

💬 <b>أنا هنا لمساعدتك 24/7</b>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('💬 اسأل المساعد', 'ask_assistant')],
            [Markup.button.callback('📚 مواضيع شائعة', 'popular_topics')],
            [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
        ], { columns: 2 })
    };
}

// ========== دليل الاستخدام ==========
function guideMenu() {
    return {
        text: `
<b>📖 دليل استخدام البوت</b>

📌 <b>خطوات التسوق:</b>
1️⃣ اختر "إبدأ التسوق" من القائمة
2️⃣ اختر الخدمة المناسبة
3️⃣ ادفع عبر البطاقة أو الرصيد
4️⃣ استلم الخدمة فوراً

💰 <b>طرق الدفع:</b>
• بطاقات ائتمان
• تحويل بنكي
• رصيد البوت

🔒 <b>جميع العمليات آمنة ومشفرة</b>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('📹 فيديو شرح', 'video_guide')],
            [Markup.button.callback('❓ أسئلة شائعة', 'faq_guide')],
            [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
        ], { columns: 2 })
    };
}

// ========== الأزرار ==========
bot.action('shop', async (ctx) => {
    const data = servicesMenu();
    await ctx.answerCbQuery('🛒 جاري تحميل الخدمات...');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

bot.action('orders', async (ctx) => {
    await ctx.answerCbQuery('📦 طلباتك');
    await ctx.replyWithHTML(`
<b>📦 طلباتي</b>

📌 <b>ليس لديك طلبات حالياً</b>

🛒 <b>ابدأ التسوق الآن!</b>
    `);
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
    `);
});

bot.action('cards', async (ctx) => {
    await ctx.answerCbQuery('🎫 شحن بطاقات');
    await ctx.replyWithHTML(`
<b>🎫 شحن بطاقات</b>

📌 <b>اشحن باستخدام بطاقات:</b>
• بطاقات STC
• بطاقات Mobily
• بطاقات Zain
• بطاقات Jawwy

💰 <b>الرصيد:</b>
• 10$ → 10$
• 25$ → 25$
• 50$ → 50$

⚡ <b>شحن فوري وآمن</b>
    `);
});

bot.action('settings', async (ctx) => {
    const data = settingsMenu();
    await ctx.answerCbQuery('⚙️ الإعدادات');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

bot.action('support', async (ctx) => {
    const data = supportMenu();
    await ctx.answerCbQuery('🛠 الدعم الفني');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

bot.action('daily_offer', async (ctx) => {
    await ctx.answerCbQuery('🎁 العرض اليومي');
    await ctx.replyWithHTML(`
<b>🎁 العرض اليومي</b>

🔥 <b>خصم 50% على:</b>
• تطبيقات الجوال
• بوتات تليجرام

💎 <b>السعر:</b> 50$ → 25$
⏰ <b>العرض محدود!</b>

📌 <b>للطلب:</b> @SSSTlF
    `);
});

bot.action('vip', async (ctx) => {
    const data = vipMenu();
    await ctx.answerCbQuery('⭐ VIP');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

bot.action('assistant', async (ctx) => {
    const data = assistantMenu();
    await ctx.answerCbQuery('🧠 المساعد الذكي');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

bot.action('guide', async (ctx) => {
    const data = guideMenu();
    await ctx.answerCbQuery('📖 دليل الاستخدام');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
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

bot.action('channel', async (ctx) => {
    await ctx.answerCbQuery('📢 القناة الرسمية');
    await ctx.replyWithHTML('<b>📢 قناة البوت الرسمية:</b> @SSSTlF\n\n📦 تابع كل جديد');
});

// ========== الأوامر ==========
bot.start(async (ctx) => {
    const data = mainMenu();
    await ctx.replyWithHTML(`
<b>🔥 مرحباً بك في متجر روز للتطبيقات</b>

👤 <b>المستخدم:</b> ${ctx.from.first_name}
💰 <b>رصيدك:</b> $0.00

📌 <b>اختر من القائمة:</b>
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
    console.log('📦 TG - Store Roz | API');
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
