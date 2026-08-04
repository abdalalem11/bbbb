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
<b>🔥 متجر روز للتطبيقات</b>

👤 <b>المستخدم:</b> ${userId}
💰 <b>رصيدك:</b> <code>$0.0000</code>

<b>📌 اختر من القائمة:</b>
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

// ========== الخدمات ==========
function servicesMenu() {
    return {
        text: `
<b>🛒 اختر الخدمات</b>

📌 <b>لرؤية المنتجات حسب عملك المحلية</b>
💱 <b>العملة الحالية:</b> USD ($)

🔒 <b>جميع الخدمات تعمل تلقائياً وبشكل آمن</b>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('📱 تطبيقات جوال', 'product_apps')],
            [Markup.button.callback('🤖 بوتات تليجرام', 'product_bots')],
            [Markup.button.callback('🌐 مواقع ويب', 'product_websites')],
            [Markup.button.callback('💾 قواعد بيانات', 'product_databases')],
            [Markup.button.callback('🛡️ أمن سيبراني', 'product_security')],
            [Markup.button.callback('🎨 تصميم واجهات', 'product_design')],
            [Markup.button.callback('🔙 العودة للقائمة', 'back_to_main')]
        ], { columns: 2 })
    };
}

// ========== المنتجات ==========
const products = {
    apps: {
        title: '📱 تطبيقات جوال',
        items: [
            { name: 'تطبيق إدارة مبيعات', price: '150$', desc: 'تطبيق متكامل لإدارة المبيعات والمخزون' },
            { name: 'تطبيق توصيل طلبات', price: '200$', desc: 'تطبيق مشابه لتوصيل الطلبات' },
            { name: 'تطبيق تواصل اجتماعي', price: '350$', desc: 'تطبيق تواصل اجتماعي متكامل' },
            { name: 'تطبيق حجز مواعيد', price: '180$', desc: 'نظام حجز مواعيد مع إشعارات' }
        ]
    },
    bots: {
        title: '🤖 بوتات تليجرام',
        items: [
            { name: 'بوت متجر إلكتروني', price: '120$', desc: 'بوت متجر مع نظام دفع' },
            { name: 'بوت خدمة عملاء', price: '100$', desc: 'بوت ردود تلقائية للدعم' },
            { name: 'بوت إدارة قنوات', price: '80$', desc: 'بوت لإدارة القنوات والأعضاء' },
            { name: 'بوت مسابقات وألعاب', price: '150$', desc: 'بوت مسابقات مع نظام نقاط' }
        ]
    },
    websites: {
        title: '🌐 مواقع ويب',
        items: [
            { name: 'متجر إلكتروني كامل', price: '300$', desc: 'متجر مع بوابة دفع وشحن' },
            { name: 'موقع شركة', price: '200$', desc: 'موقع شركة مع نظام إدارة محتوى' },
            { name: 'منصة تعليمية', price: '350$', desc: 'منصة دروس مع اختبارات' },
            { name: 'مدونة احترافية', price: '150$', desc: 'مدونة مع نظام تعليقات' }
        ]
    },
    databases: {
        title: '💾 قواعد بيانات',
        items: [
            { name: 'قاعدة بيانات SQL', price: '100$', desc: 'تصميم قاعدة بيانات SQL متكاملة' },
            { name: 'قاعدة بيانات NoSQL', price: '120$', desc: 'تصميم قاعدة بيانات MongoDB' },
            { name: 'لوحة تحكم إحصاءات', price: '180$', desc: 'لوحة تحكم مع رسوم بيانية' },
            { name: 'نظام تقارير', price: '150$', desc: 'نظام تقارير وتحليلات' }
        ]
    },
    security: {
        title: '🛡️ أمن سيبراني',
        items: [
            { name: 'فحص ثغرات', price: '200$', desc: 'فحص أمني كامل للموقع' },
            { name: 'تشفير بيانات', price: '150$', desc: 'نظام تشفير متقدم للبيانات' },
            { name: 'حماية DDoS', price: '250$', desc: 'حماية ضد هجمات DDoS' },
            { name: 'تدقيق أمني', price: '180$', desc: 'تدقيق أمني شامل' }
        ]
    },
    design: {
        title: '🎨 تصميم واجهات',
        items: [
            { name: 'تصميم UI/UX', price: '100$', desc: 'تصميم واجهات متكاملة' },
            { name: 'تصميم شعار', price: '50$', desc: 'تصميم شعار احترافي' },
            { name: 'تصميم تطبيق', price: '200$', desc: 'تصميم واجهة تطبيق جوال' },
            { name: 'تصميم موقع', price: '150$', desc: 'تصميم واجهة موقع ويب' }
        ]
    }
};

// ========== عرض المنتجات ==========
function showProductList(category) {
    const product = products[category];
    let productList = '';
    product.items.forEach((item, index) => {
        productList += `📌 ${item.name}\n💰 ${item.price}\n📝 ${item.desc}\n\n`;
    });

    return {
        text: `
<b>${product.title}</b>

${productList}

<b>📌 للطلب تواصل مع المطور:</b> @SSSTlF
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('🔙 العودة للخدمات', 'back_to_services')],
            [Markup.button.callback('🏠 القائمة الرئيسية', 'menu')]
        ], { columns: 2 })
    };
}

// ========== الأزرار ==========
// القائمة الرئيسية للخدمات
bot.action('services_apps', async (ctx) => {
    const data = servicesMenu();
    await ctx.answerCbQuery('📱 الخدمات');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

bot.action('services_bots', async (ctx) => {
    const data = servicesMenu();
    await ctx.answerCbQuery('🤖 الخدمات');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

bot.action('services_websites', async (ctx) => {
    const data = servicesMenu();
    await ctx.answerCbQuery('🌐 الخدمات');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

bot.action('services_databases', async (ctx) => {
    const data = servicesMenu();
    await ctx.answerCbQuery('💾 الخدمات');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

bot.action('services_security', async (ctx) => {
    const data = servicesMenu();
    await ctx.answerCbQuery('🛡️ الخدمات');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

bot.action('services_design', async (ctx) => {
    const data = servicesMenu();
    await ctx.answerCbQuery('🎨 الخدمات');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

// أزرار المنتجات
Object.keys(products).forEach(category => {
    bot.action(`product_${category}`, async (ctx) => {
        const data = showProductList(category);
        await ctx.answerCbQuery(`📦 ${products[category].title}`);
        await ctx.editMessageText(data.text, {
            parse_mode: 'HTML',
            ...data.buttons,
            disable_web_page_preview: true
        });
    });
});

// أزرار التنقل
bot.action('back_to_main', async (ctx) => {
    const data = mainMenu();
    await ctx.answerCbQuery('🔙 العودة للقائمة');
    await ctx.editMessageText(data.text, {
        parse_mode: 'HTML',
        ...data.buttons,
        disable_web_page_preview: true
    });
});

bot.action('back_to_services', async (ctx) => {
    const data = servicesMenu();
    await ctx.answerCbQuery('🔙 العودة للخدمات');
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
