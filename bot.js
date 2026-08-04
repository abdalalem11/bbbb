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
        <p style="text-align:center;color:red;">👑 المطور: عبود @SSSTlF</p>
    `);
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Web server running on port ${PORT}`);
});

// ========== بيانات المنتجات ==========
const products = {
    '1': { name: 'تطبيق إدارة المبيعات', price: '150$', desc: 'تطبيق متكامل لإدارة المبيعات والمخزون', emoji: '📊' },
    '2': { name: 'تطبيق توصيل طلبات', price: '200$', desc: 'تطبيق مشابه لتوصيل الطلبات', emoji: '🚚' },
    '3': { name: 'منصة تعليمية', price: '300$', desc: 'منصة تعليمية متكاملة مع دروس واختبارات', emoji: '🎓' },
    '4': { name: 'بوت تليجرام متقدم', price: '100$', desc: 'بوت تليجرام مع لوحة تحكم كاملة', emoji: '🤖' },
    '5': { name: 'متجر إلكتروني', price: '250$', desc: 'متجر إلكتروني مع بوابة دفع', emoji: '🛒' },
    '6': { name: 'نظام حجز مواعيد', price: '180$', desc: 'نظام حجز مواعيد مع إشعارات', emoji: '📅' },
    '7': { name: 'تطبيق تواصل اجتماعي', price: '350$', desc: 'تطبيق تواصل اجتماعي متكامل', emoji: '💬' },
    '8': { name: 'لوحة تحكم إحصاءات', price: '120$', desc: 'لوحة تحكم مع رسوم بيانية وإحصاءات', emoji: '📈' },
};

// ========== القائمة الرئيسية ==========
function mainMenu() {
    let productList = '';
    Object.keys(products).forEach(key => {
        const p = products[key];
        productList += `${p.emoji} <b>${p.name}</b> — ${p.price}\n`;
    });

    return {
        text: `
<b>🔥 متجر روز للتطبيقات 🔥</b>

👑 <b>المطور:</b> @SSSTlF
🆔 <b>ايديك:</b> <code>${userId}</code>

<b>📦 المنتجات المتوفرة:</b>

${productList}

<b>📌 للطلب تواصل مع المطور</b>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('📊 تطبيق إدارة المبيعات', 'product_1')],
            [Markup.button.callback('🚚 تطبيق توصيل طلبات', 'product_2')],
            [Markup.button.callback('🎓 منصة تعليمية', 'product_3')],
            [Markup.button.callback('🤖 بوت تليجرام متقدم', 'product_4')],
            [Markup.button.callback('🛒 متجر إلكتروني', 'product_5')],
            [Markup.button.callback('📅 نظام حجز مواعيد', 'product_6')],
            [Markup.button.callback('💬 تطبيق تواصل اجتماعي', 'product_7')],
            [Markup.button.callback('📈 لوحة تحكم إحصاءات', 'product_8')],
            [Markup.button.callback('📢 القناة الرسمية', 'channel')],
            [Markup.button.callback('📩 تواصل مع المطور', 'contact')]
        ], { columns: 2 })
    };
}

// ========== عرض المنتج ==========
function showProduct(productKey) {
    const p = products[productKey];
    return {
        text: `
<b>${p.emoji} ${p.name}</b>

<b>💰 السعر:</b> ${p.price}
<b>📝 الوصف:</b> ${p.desc}

<b>📌 للشراء تواصل مع المطور:</b> @SSSTlF
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('📩 طلب المنتج', `order_${productKey}`)],
            [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
        ])
    };
}

// ========== الأزرار ==========
Object.keys(products).forEach(key => {
    bot.action(`product_${key}`, async (ctx) => {
        const data = showProduct(key);
        await ctx.answerCbQuery(`📦 ${products[key].name}`);
        await ctx.editMessageText(data.text, {
            parse_mode: 'HTML',
            ...data.buttons,
            disable_web_page_preview: true
        });
    });

    bot.action(`order_${key}`, async (ctx) => {
        const p = products[key];
        await ctx.answerCbQuery('📩 تم إرسال طلبك');
        await ctx.replyWithHTML(`
<b>📩 طلب جديد!</b>

<b>المنتج:</b> ${p.emoji} ${p.name}
<b>السعر:</b> ${p.price}
<b>المستخدم:</b> ${ctx.from.first_name}
<b>ايدي:</b> <code>${ctx.from.id}</code>

<b>📌 سيتم التواصل معك قريباً</b>
        `);
    });
});

// ========== الأوامر ==========
bot.start(async (ctx) => {
    const menu = mainMenu();
    await ctx.replyWithHTML(`<b>🔥 مرحباً بك في متجر روز للتطبيقات!</b>\n📦 اختر المنتج المناسب لك`);
    await ctx.replyWithHTML(menu.text, { ...menu.buttons, disable_web_page_preview: true });
});

bot.command('menu', async (ctx) => {
    const menu = mainMenu();
    await ctx.replyWithHTML(menu.text, { ...menu.buttons, disable_web_page_preview: true });
});

bot.action('menu', async (ctx) => {
    const menu = mainMenu();
    await ctx.answerCbQuery('🏠 القائمة الرئيسية');
    await ctx.editMessageText(menu.text, {
        parse_mode: 'HTML',
        ...menu.buttons,
        disable_web_page_preview: true
    });
});

bot.action('channel', async (ctx) => {
    await ctx.answerCbQuery('📢 القناة الرسمية');
    await ctx.replyWithHTML('<b>📢 قناة المتجر الرسمية:</b> @SSSTlF\n\n📦 تابع كل جديد');
});

bot.action('contact', async (ctx) => {
    await ctx.answerCbQuery('📩 المطور');
    await ctx.replyWithHTML('📩 <b>تواصل مع المطور:</b> @SSSTlF\n\n💬 للاستفسار والطلب');
});

// ========== تشغيل البوت ==========
console.log('🚀 جاري تشغيل البوت...');

bot.launch({
    dropPendingUpdates: true
}).then(() => {
    console.log('✅ Bot is running successfully!');
    console.log('🤖 Bot username: @StoreRozbot');
    console.log('👑 المطور: عبود @SSSTlF');
    console.log('📦 متجر روز للتطبيقات');
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
