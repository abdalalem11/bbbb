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
        <h1 style="color:purple;text-align:center;">💰 NFT Price Bot</h1>
        <p style="text-align:center;">🤖 @PriceNFTbot</p>
        <p style="text-align:center;">👑 المطور: @SSSTlF</p>
    `);
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Web server running on port ${PORT}`);
});

// ========== أسعار NFT ==========
let nftPrices = {
    'CryptoPunks': { floor: '49.5 ETH', change: '+3.2%', volume: '245 ETH' },
    'Bored Ape': { floor: '28.7 ETH', change: '-1.5%', volume: '180 ETH' },
    'Azuki': { floor: '12.3 ETH', change: '+5.8%', volume: '95 ETH' },
    'Clone X': { floor: '8.9 ETH', change: '+2.1%', volume: '67 ETH' },
    'Moonbirds': { floor: '6.8 ETH', change: '-0.8%', volume: '42 ETH' },
    'Doodles': { floor: '4.5 ETH', change: '+4.3%', volume: '38 ETH' }
};

// تحديث الأسعار كل 5 دقائق (محاكاة)
setInterval(() => {
    Object.keys(nftPrices).forEach(key => {
        const change = (Math.random() * 8 - 4).toFixed(1);
        const floorChange = (Math.random() * 2 - 1).toFixed(1);
        const currentFloor = parseFloat(nftPrices[key].floor);
        const newFloor = (currentFloor + parseFloat(floorChange)).toFixed(1);
        nftPrices[key].floor = `${newFloor} ETH`;
        nftPrices[key].change = change > 0 ? `+${change}%` : `${change}%`;
        nftPrices[key].volume = (parseFloat(nftPrices[key].volume) + (Math.random() * 20 - 10)).toFixed(0) + ' ETH';
    });
    console.log('🔄 تم تحديث أسعار NFT');
}, 300000); // 5 دقائق

// ========== القائمة الرئيسية ==========
function mainMenu() {
    return {
        text: `
<b>💰 NFT Price Bot</b>

👥 <b>1.2M</b> مشترك

📊 <b>أهم أسعار NFT:</b>
• CryptoPunks: <code>${nftPrices['CryptoPunks'].floor}</code> ${nftPrices['CryptoPunks'].change}
• Bored Ape: <code>${nftPrices['Bored Ape'].floor}</code> ${nftPrices['Bored Ape'].change}
• Azuki: <code>${nftPrices['Azuki'].floor}</code> ${nftPrices['Azuki'].change}

🔄 <b>يتم التحديث كل 5 دقائق</b>

📌 <b>اختر من القائمة:</b>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('🔄 تحديث الأسعار', 'update_prices')],
            [Markup.button.callback('📊 عرض الأسعار', 'show_prices')],
            [Markup.button.callback('🏆 أفضل NFT', 'top_nft')],
            [Markup.button.callback('📈 تحليل السوق', 'market_analysis')],
            [Markup.button.callback('🔔 تنبيه السعر', 'price_alert')],
            [Markup.button.callback('📢 القناة الرسمية', 'channel')],
            [Markup.button.callback('🛠 الدعم الفني', 'support')]
        ], { columns: 2 })
    };
}

// ========== عرض جميع الأسعار ==========
function showAllPrices() {
    let text = '<b>📊 أسعار NFT الحالية</b>\n\n';
    Object.keys(nftPrices).forEach(key => {
        const nft = nftPrices[key];
        text += `<b>${key}</b>\n`;
        text += `• السعر الأرضي: <code>${nft.floor}</code>\n`;
        text += `• التغير: <code>${nft.change}</code>\n`;
        text += `• الحجم: <code>${nft.volume}</code>\n\n`;
    });
    text += `🔄 <b>آخر تحديث:</b> <code>${new Date().toLocaleTimeString()}</code>`;
    return text;
}

// ========== الأزرار ==========
bot.action('update_prices', async (ctx) => {
    // تحديث يدوي
    Object.keys(nftPrices).forEach(key => {
        const change = (Math.random() * 8 - 4).toFixed(1);
        const floorChange = (Math.random() * 2 - 1).toFixed(1);
        const currentFloor = parseFloat(nftPrices[key].floor);
        const newFloor = (currentFloor + parseFloat(floorChange)).toFixed(1);
        nftPrices[key].floor = `${newFloor} ETH`;
        nftPrices[key].change = change > 0 ? `+${change}%` : `${change}%`;
        nftPrices[key].volume = (parseFloat(nftPrices[key].volume) + (Math.random() * 20 - 10)).toFixed(0) + ' ETH';
    });
    
    await ctx.answerCbQuery('🔄 تم تحديث الأسعار');
    await ctx.replyWithHTML(`
<b>✅ تم تحديث الأسعار</b>

${showAllPrices()}
    `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙 العودة للقائمة', callback_data: 'menu' }]
            ]
        }
    });
});

bot.action('show_prices', async (ctx) => {
    await ctx.answerCbQuery('📊 عرض الأسعار');
    await ctx.replyWithHTML(`
${showAllPrices()}

📌 <b>شارك الأسعار مع أصدقائك!</b>
    `, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.callback('🔄 تحديث الأسعار', 'update_prices')],
                [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
            ]
        }
    });
});

bot.action('top_nft', async (ctx) => {
    await ctx.answerCbQuery('🏆 أفضل NFT');
    const sorted = Object.keys(nftPrices).sort((a, b) => {
        const priceA = parseFloat(nftPrices[a].floor);
        const priceB = parseFloat(nftPrices[b].floor);
        return priceB - priceA;
    });
    
    let text = '<b>🏆 ترتيب أفضل NFT</b>\n\n';
    sorted.forEach((key, index) => {
        const nft = nftPrices[key];
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index+1}.`;
        text += `${medal} <b>${key}</b>\n`;
        text += `   السعر: <code>${nft.floor}</code> (${nft.change})\n\n`;
    });
    
    await ctx.replyWithHTML(text, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
            ]
        }
    });
});

bot.action('market_analysis', async (ctx) => {
    await ctx.answerCbQuery('📈 تحليل السوق');
    await ctx.replyWithHTML(`
<b>📈 تحليل سوق NFT</b>

📊 <b>إجمالي السوق:</b>
• القيمة السوقية: <code>$8.5B</code>
• الحجم اليومي: <code>$245M</code>
• عدد التداولات: <code>12.4K</code>

📈 <b>أفضل الأداء:</b>
• Azuki: <code>+5.8%</code>
• Doodles: <code>+4.3%</code>
• CryptoPunks: <code>+3.2%</code>

📉 <b>أسوأ الأداء:</b>
• Bored Ape: <code>-1.5%</code>
• Moonbirds: <code>-0.8%</code>

📌 <b>توقعات السوق:</b>
🟢 إيجابية مع ارتفاع في الطلب
    `, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
            ]
        }
    });
});

bot.action('price_alert', async (ctx) => {
    await ctx.answerCbQuery('🔔 تنبيه السعر');
    await ctx.replyWithHTML(`
<b>🔔 تنبيه سعر NFT</b>

📌 <b>قم بتعيين تنبيه للسعر:</b>

1️⃣ <b>تنبيه ارتفاع:</b>
عندما يصل السعر إلى حد معين

2️⃣ <b>تنبيه انخفاض:</b>
عندما ينخفض السعر إلى حد معين

📌 <b>لتفعيل التنبيه:</b>
أرسل الأمر التالي:
<code>/alert CryptoPunks 50 ETH</code>

🔔 <b>التنبيهات الحالية:</b>
• CryptoPunks: عند 50 ETH
• Bored Ape: عند 25 ETH
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
<b>📢 قناة NFT Price الرسمية</b>

👥 <b>المشتركين:</b> 1.2M

📊 <b>مميزات القناة:</b>
• تحديث الأسعار كل 5 دقائق
• أخبار NFT الحصرية
• تحليلات السوق
• صفقات مميزة

🔗 <b>رابط القناة:</b>
https://t.me/PriceNFTbot

🤖 <b>بوت الأسعار:</b>
@PriceNFTbot
    `, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.url('📢 اشترك في القناة', 'https://t.me/PriceNFTbot')],
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
• كيف يتم تحديث الأسعار؟ كل 5 دقائق
• هل البوت مجاني؟ نعم
• كيف أشارك الأسعار؟ اضغط على زر المشاركة
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
<b>💰 مرحباً بك في بوت NFT Price</b>

📊 <b>أهم الأسعار:</b>
• CryptoPunks: <code>${nftPrices['CryptoPunks'].floor}</code>
• Bored Ape: <code>${nftPrices['Bored Ape'].floor}</code>

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
    await ctx.replyWithHTML(showAllPrices());
});

// ========== تشغيل البوت ==========
console.log('🚀 جاري تشغيل البوت...');

bot.launch({
    dropPendingUpdates: true
}).then(() => {
    console.log('✅ Bot is running successfully!');
    console.log('🤖 Bot: @PriceNFTbot');
    console.log('👑 المطور: @SSSTlF');
    console.log('💰 تم تحميل أسعار NFT');
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
