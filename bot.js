const { Telegraf, Markup } = require('telegraf');

// ===== التوكن =====
const BOT_TOKEN = "8584318691:AAGHfeUE57_3z04oI91gHiy6MqNSn-RLj5k";
const bot = new Telegraf(BOT_TOKEN);

// ===== البيانات الوهمية =====
let fakeAccounts = [
    "+1 555 123 4567",
    "+1 555 234 5678",
    "+1 555 345 6789",
    "+1 555 456 7890"
];

let balance = 4.36;
const userId = "8505541555";
const refLink = "https://t.me/YourBot?start=ref123456";

// ===== دالة عرض القائمة الرئيسية =====
function mainMenu() {
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
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('➕ إضافة رقم وهمي', 'add_account')],
            [Markup.button.callback('✖ حذف آخر رقم', 'remove_account')],
            [Markup.button.callback('💳 شحن رصيد', 'charge_balance')],
            [Markup.button.callback('📋 نسخ الرابط', 'copy_ref')],
            [Markup.button.callback('📢 القناة الرسمية', 'channel')],
            [Markup.button.callback('🛠 الدعم', 'support')]
        ], { columns: 2 })
    };
}

// ===== أمر /start =====
bot.start(async (ctx) => {
    const menu = mainMenu();
    await ctx.reply(menu.text, { 
        parse_mode: 'Markdown',
        ...menu.buttons,
        disable_web_page_preview: true
    });
});

// ===== أمر /menu =====
bot.command('menu', async (ctx) => {
    const menu = mainMenu();
    await ctx.reply(menu.text, { 
        parse_mode: 'Markdown',
        ...menu.buttons,
        disable_web_page_preview: true
    });
});

// ===== زر إضافة رقم =====
bot.action('add_account', async (ctx) => {
    const randomNum = `+1 ${Math.floor(Math.random()*900+100)} ${Math.floor(Math.random()*900+100)} ${Math.floor(Math.random()*9000+1000)}`;
    fakeAccounts.push(randomNum);
    await ctx.answerCbQuery(`✅ تم إضافة رقم: ${randomNum}`);
    const menu = mainMenu();
    await ctx.editMessageText(menu.text, {
        parse_mode: 'Markdown',
        ...menu.buttons,
        disable_web_page_preview: true
    });
});

// ===== زر حذف آخر رقم =====
bot.action('remove_account', async (ctx) => {
    if (fakeAccounts.length === 0) {
        await ctx.answerCbQuery('❌ لا يوجد أرقام للحذف');
        return;
    }
    const removed = fakeAccounts.pop();
    await ctx.answerCbQuery(`🗑️ تم حذف: ${removed}`);
    const menu = mainMenu();
    await ctx.editMessageText(menu.text, {
        parse_mode: 'Markdown',
        ...menu.buttons,
        disable_web_page_preview: true
    });
});

// ===== زر شحن رصيد =====
bot.action('charge_balance', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('💰 أدخل المبلغ الذي تريد شحنه (رقم فقط):');
    // هنا ننتظر رد المستخدم
});

// ===== استقبال رسائل الشحن =====
bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    const chatId = ctx.chat.id;
    
    // التأكد إن الرسالة رقم
    if (!isNaN(text) && parseFloat(text) > 0) {
        const amount = parseFloat(text);
        balance += amount;
        await ctx.reply(`✅ تم شحن رصيدك بمبلغ $${amount}\n💰 الرصيد الجديد: $${balance.toFixed(2)}`);
        const menu = mainMenu();
        await ctx.reply(menu.text, {
            parse_mode: 'Markdown',
            ...menu.buttons,
            disable_web_page_preview: true
        });
    } else {
        // أي رسالة غير رقم تعتبر أمر غير معروف
        await ctx.reply('❌ أمر غير معروف. استخدم /menu للقائمة الرئيسية');
    }
});

// ===== زر نسخ الرابط =====
bot.action('copy_ref', async (ctx) => {
    await ctx.answerCbQuery('📋 تم نسخ رابط الإحالة');
    await ctx.reply(`📋 رابط الإحالة الخاص بك:\n\`${refLink}\``, {
        parse_mode: 'Markdown'
    });
});

// ===== زر القناة =====
bot.action('channel', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('📢 القناة الرسمية: @YourChannel');
});

// ===== زر الدعم =====
bot.action('support', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('🛠 فريق الدعم: @YourSupport');
});

// ===== تشغيل البوت =====
bot.launch()
    .then(() => console.log('✅ Bot is running...'))
    .catch(err => console.error('❌ Error:', err));

// ===== إيقاف البوت =====
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
