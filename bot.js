const { Telegraf, Markup } = require('telegraf');

// ===== التوكن =====
const BOT_TOKEN = "8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI";
const bot = new Telegraf(BOT_TOKEN);

// ===== البيانات الوهمية =====
let fakeAccounts = [
    "+1 555 123 4567",
    "+1 555 234 5678",
    "+1 555 345 6789",
    "+1 555 456 7890"
];

let balance = 4.36;
const userId = "1170411845";
const refLink = "https://t.me/aaaasvvvbot?start=ref123456";

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
            [Markup.button.callback('🛠 فريق الدعم', 'support')]
        ], { columns: 2 })
    };
}

// ===== أمر /start =====
bot.start(async (ctx) => {
    const menu = mainMenu();
    await ctx.reply('👋 أهلاً بك في بوت الحسابات الوهمية!', {
        parse_mode: 'Markdown'
    });
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
    await ctx.reply('💰 أدخل المبلغ الذي تريد شحنه (رقم فقط):\nمثال: 10');
});

// ===== استقبال رسائل الشحن =====
bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    
    // نتجاهل الأوامر
    if (text.startsWith('/')) return;
    
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

// ===== تشغيل البوت (Polling) =====
async function startBot() {
    try {
        // إلغاء أي Webhook سابق
        await bot.telegram.setWebhook();
        console.log('✅ Webhook removed, using polling...');
        
        await bot.launch();
        console.log('✅ Bot is running successfully!');
        console.log(`🤖 Bot username: @${bot.botInfo?.username || 'unknown'}`);
        console.log(`🆔 Bot ID: ${bot.botInfo?.id || 'unknown'}`);
        console.log('📡 Polling for updates...');
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
    console.log('🛑 Bot stopped');
});
process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
    console.log('🛑 Bot stopped');
});
