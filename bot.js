const express = require('express');
const { Telegraf, Markup } = require('telegraf');

// ===== التوكن =====
const BOT_TOKEN = "8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI";
const bot = new Telegraf(BOT_TOKEN);

// ===== إعداد Express =====
const app = express();
const port = process.env.PORT || 3000;

// ===== معرف المالك =====
const OWNER_ID = "1170411845";

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
    const user = ctx.from;
    const welcomeText = `
✨ *مرحباً بك عزيزي ${user.first_name}* ✨

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

    // إشعار للمالك
    try {
        await bot.telegram.sendMessage(
            OWNER_ID,
            `👤 *مستخدم جديد دخل البوت*

🆔 *المعرف:* ${user.id}
📛 *الاسم:* ${user.first_name} ${user.last_name || ''}
👤 *اليوزر:* ${user.username ? '@' + user.username : 'لا يوجد'}
📅 *التاريخ:* ${new Date().toLocaleString('ar-EG')}`,
            { parse_mode: 'Markdown' }
        );
    } catch (error) {
        console.log('❌ فشل إرسال الإشعار:', error.message);
    }
});

// ===== معالجة الرسائل =====
bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    const user = ctx.from;

    if (text === 'ℹ️ معلومات عن البوت') {
        await ctx.reply(`
📊 *معلومات عن البوت*

🤖 *الاسم:* بوت التواصل مع المطور
⚡️ *الحالة:* نشط 🟢

📌 *الوظيفة:* التواصل المباشر مع المطور

📢 *قناة الدعم:* @u_t_r2
📱 *للتواصل:* @u_t_r
`, {
            parse_mode: 'Markdown',
            reply_markup: MAIN_KEYBOARD
        });
        return;
    }

    if (text === '👨‍💻 تواصل مع المطور') {
        await ctx.reply(`
👨‍💻 *المطور*

📱 *طرق التواصل:*
• اضغط على زر التواصل أدناه
• الرد خلال 24 ساعة

📢 *قناة الدعم:* @u_t_r2
💫 *للتواصل اضغط على الزر أدناه*
`, {
            parse_mode: 'Markdown',
            reply_markup: DEV_KEYBOARD
        });
        return;
    }

    // إرسال رسالة المستخدم للمالك
    try {
        await bot.telegram.sendMessage(
            OWNER_ID,
            `📩 *رسالة جديدة*

👤 *من:* ${user.first_name} ${user.last_name || ''}
🆔 *المعرف:* ${user.id}
👤 *اليوزر:* ${user.username ? '@' + user.username : 'لا يوجد'}

💬 *الرسالة:*
${text}

📅 *التاريخ:* ${new Date().toLocaleString('ar-EG')}`,
            { parse_mode: 'Markdown' }
        );

        await ctx.reply(
            `✅ *تم إرسال رسالتك بنجاح!*

📩 *سيتم الرد عليك في أقرب وقت*
⏳ *وقت الرد المتوقع:* خلال 24 ساعة

📢 *قناة الدعم:* @u_t_r2`,
            {
                parse_mode: 'Markdown',
                reply_markup: MAIN_KEYBOARD
            }
        );

    } catch (error) {
        await ctx.reply('❌ حدث خطأ، حاول مرة أخرى');
    }
});

// ===== الأزرار =====
bot.action('back_to_main', async (ctx) => {
    await ctx.deleteMessage();
    await ctx.reply('✨ *القائمة الرئيسية*', {
        parse_mode: 'Markdown',
        reply_markup: MAIN_KEYBOARD
    });
    await ctx.answerCbQuery();
});

// ===== التشغيل =====
async function startBot() {
    try {
        await bot.launch();
        console.log('✅ Bot is running!');

        app.listen(port, () => {
            console.log(`✅ Server on port ${port}`);
        });

        app.get('/', (req, res) => {
            res.send('🤖 Bot is running!');
        });

    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

startBot();

process.once('SIGINT', () => {
    bot.stop('SIGINT');
    process.exit(0);
});

process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
    process.exit(0);
});
