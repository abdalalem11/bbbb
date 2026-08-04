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

// ========== القائمة الرئيسية (أزرار عادية ملونة) ==========
function mainMenu() {
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
        buttons: {
            reply_markup: {
                keyboard: [
                    [{ text: '🛒 إبدأ التسوق' }, { text: '📦 طلباتي' }],
                    [{ text: '💳 إشحن رصيدك' }, { text: '🎫 شحن بطاقات' }],
                    [{ text: '📢 قناة البوت' }, { text: '⚙️ الإعدادات' }],
                    [{ text: '🛠 الدعم الفني' }, { text: '🎁 العرض اليومي' }],
                    [{ text: '⭐ مستوى VIP' }, { text: '🧠 المساعد الذكي' }],
                    [{ text: '📖 دليل الاستخدام' }]
                ],
                resize_keyboard: true,
                one_time_keyboard: false
            }
        }
    };
}

// ========== معالجة الأزرار العادية ==========
bot.hears('🛒 إبدأ التسوق', async (ctx) => {
    await ctx.replyWithHTML(`
<b>🛒 الخدمات المتوفرة</b>

📌 <b>جميع الخدمات متوفرة</b>
💰 <b>للطلب تواصل مع المطور:</b> @SSSTlF

🔒 <b>جميع الخدمات آمنة</b>
    `, {
        reply_markup: {
            keyboard: [
                [{ text: '🔙 العودة للقائمة' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('📦 طلباتي', async (ctx) => {
    await ctx.replyWithHTML(`
<b>📦 طلباتي</b>

📌 <b>ليس لديك طلبات حالياً</b>

🛒 <b>ابدأ التسوق الآن!</b>
    `, {
        reply_markup: {
            keyboard: [
                [{ text: '🔙 العودة للقائمة' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('💳 إشحن رصيدك', async (ctx) => {
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
            keyboard: [
                [{ text: '🔙 العودة للقائمة' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('🎫 شحن بطاقات', async (ctx) => {
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
            keyboard: [
                [{ text: '🔙 العودة للقائمة' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('📢 قناة البوت', async (ctx) => {
    await ctx.replyWithHTML('<b>📢 قناة البوت الرسمية:</b> @SSSTlF', {
        reply_markup: {
            keyboard: [
                [{ text: '🔙 العودة للقائمة' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('⚙️ الإعدادات', async (ctx) => {
    await ctx.replyWithHTML(`
<b>⚙️ الإعدادات</b>

🔹 <b>العملة:</b> USD ($)
🔹 <b>اللغة:</b> العربية
🔹 <b>الإشعارات:</b> مفعلة

📌 <b>اختر ما تريد تعديله:</b>
    `, {
        reply_markup: {
            keyboard: [
                [{ text: '🔙 العودة للقائمة' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('🛠 الدعم الفني', async (ctx) => {
    await ctx.replyWithHTML(`
<b>🛠 الدعم الفني</b>

📩 <b>تواصل مع المطور:</b> @SSSTlF

⏰ <b>أوقات الدعم:</b> 24/7
    `, {
        reply_markup: {
            keyboard: [
                [{ text: '🔙 العودة للقائمة' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('🎁 العرض اليومي', async (ctx) => {
    await ctx.replyWithHTML(`
<b>🎁 العرض اليومي</b>

🔥 <b>خصم 50% على جميع الخدمات</b>

⏰ <b>العرض محدود!</b>

📌 <b>للطلب:</b> @SSSTlF
    `, {
        reply_markup: {
            keyboard: [
                [{ text: '🔙 العودة للقائمة' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('⭐ مستوى VIP', async (ctx) => {
    await ctx.replyWithHTML(`
<b>⭐ مستوى VIP</b>

👑 <b>مستواك الحالي:</b> برونزي

<b>📊 مميزات VIP:</b>
✅ خصم 10% على جميع الخدمات
✅ أولوية في الدعم الفني
    `, {
        reply_markup: {
            keyboard: [
                [{ text: '🔙 العودة للقائمة' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('🧠 المساعد الذكي', async (ctx) => {
    await ctx.replyWithHTML(`
<b>🧠 المساعد الذكي</b>

🤖 <b>اسألني أي شيء!</b>

💬 <b>أنا هنا لمساعدتك 24/7</b>
    `, {
        reply_markup: {
            keyboard: [
                [{ text: '🔙 العودة للقائمة' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('📖 دليل الاستخدام', async (ctx) => {
    await ctx.replyWithHTML(`
<b>📖 دليل استخدام البوت</b>

📌 <b>خطوات التسوق:</b>
1️⃣ اختر "إبدأ التسوق"
2️⃣ اختر الخدمة المناسبة
3️⃣ ادفع واستلم الخدمة

🔒 <b>جميع العمليات آمنة</b>
    `, {
        reply_markup: {
            keyboard: [
                [{ text: '🔙 العودة للقائمة' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('🔙 العودة للقائمة', async (ctx) => {
    const data = mainMenu();
    await ctx.replyWithHTML(data.text, data.buttons);
});

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
