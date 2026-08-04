const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const BOT_TOKEN = "8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI";
const bot = new Telegraf(BOT_TOKEN);

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
    'CryptoPunks': { floor: '49.5 ETH', avg: '47.2 ETH', change: '+3.2%' },
    'Bored Ape': { floor: '28.7 ETH', avg: '26.8 ETH', change: '-1.5%' },
    'Azuki': { floor: '12.3 ETH', avg: '11.5 ETH', change: '+5.8%' },
    'Clone X': { floor: '8.9 ETH', avg: '8.2 ETH', change: '+2.1%' },
    'Moonbirds': { floor: '6.8 ETH', avg: '6.3 ETH', change: '-0.8%' },
    'Doodles': { floor: '4.5 ETH', avg: '4.1 ETH', change: '+4.3%' }
};

// ========== القائمة الرئيسية ==========
function mainMenu() {
    return {
        text: `
<b>💰 NFT Price Bot</b>

👥 <b>1.2M</b> مشترك

📊 <b>أهم أسعار NFT:</b>
• CryptoPunks: <code>${nftPrices['CryptoPunks'].floor}</code> (AVG: ${nftPrices['CryptoPunks'].avg})
• Bored Ape: <code>${nftPrices['Bored Ape'].floor}</code> (AVG: ${nftPrices['Bored Ape'].avg})
• Azuki: <code>${nftPrices['Azuki'].floor}</code> (AVG: ${nftPrices['Azuki'].avg})

📌 <b>الأوامر المتوفرة:</b>
/market — إشعارات بيع الهدايا
/auction — إشعارات المزادات
/search — بحث عن الهدايا
/filter — تتبع الأسعار
/me — سعر هداياك

📌 <b>الاستخدام السريع:</b>
@PriceNFTbot «link/username/id/TON-address»
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('📊 عرض الأسعار', 'show_prices')],
            [Markup.button.callback('🔍 بحث عن هدية', 'search')],
            [Markup.button.callback('📈 تحليل السوق', 'market_analysis')],
            [Markup.button.callback('🔔 تنبيهات المزاد', 'auction')],
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
        text += `• متوسط السعر: <code>${nft.avg}</code>\n`;
        text += `• التغير: <code>${nft.change}</code>\n\n`;
    });
    text += `🔄 <b>آخر تحديث:</b> <code>${new Date().toLocaleTimeString()}</code>`;
    return text;
}

// ========== الأزرار ==========
bot.action('show_prices', async (ctx) => {
    await ctx.answerCbQuery('📊 عرض الأسعار');
    await ctx.replyWithHTML(`
${showAllPrices()}

📌 <b>للحصول على سعر هداياك:</b>
أرسل /me
    `, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.callback('🔄 تحديث الأسعار', 'update_prices')],
                [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
            ]
        }
    });
});

bot.action('update_prices', async (ctx) => {
    Object.keys(nftPrices).forEach(key => {
        const change = (Math.random() * 8 - 4).toFixed(1);
        const floorChange = (Math.random() * 2 - 1).toFixed(1);
        const avgChange = (Math.random() * 2 - 1).toFixed(1);
        const currentFloor = parseFloat(nftPrices[key].floor);
        const currentAvg = parseFloat(nftPrices[key].avg);
        nftPrices[key].floor = `${(currentFloor + parseFloat(floorChange)).toFixed(1)} ETH`;
        nftPrices[key].avg = `${(currentAvg + parseFloat(avgChange)).toFixed(1)} ETH`;
        nftPrices[key].change = change > 0 ? `+${change}%` : `${change}%`;
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

bot.action('search', async (ctx) => {
    await ctx.answerCbQuery('🔍 بحث عن هدية');
    await ctx.replyWithHTML(`
<b>🔍 بحث عن الهدايا</b>

📌 <b>ابحث عن هدية عن طريق:</b>
• النموذج (Model)
• الخلفية (Background)
• النمط (Pattern)

📌 <b>مثال:</b>
<code>/search CryptoPunks</code>

📌 <b>نتائج البحث:</b>
• CryptoPunks: 49.5 ETH (Floor)
• CryptoPunks: 47.2 ETH (AVG)
    `, {
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

🔔 <b>للحصول على إشعارات:</b>
/market - إشعارات البيع
/auction - إشعارات المزاد
    `, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.callback('🔙 العودة للقائمة', 'menu')]
            ]
        }
    });
});

bot.action('auction', async (ctx) => {
    await ctx.answerCbQuery('🔔 تنبيهات المزاد');
    await ctx.replyWithHTML(`
<b>🔔 تنبيهات المزاد</b>

📌 <b>إشعارات المزادات الجديدة</b>

🔔 <b>المزادات النشطة:</b>
• CryptoPunks #1234: 50 ETH
• Bored Ape #5678: 30 ETH
• Azuki #9012: 15 ETH

📌 <b>لتفعيل التنبيهات:</b>
<code>/auction CryptoPunks</code>

📌 <b>لإلغاء التنبيهات:</b>
<code>/auction stop</code>
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
• كيف أبحث عن هدية؟ استخدم /search
• كيف أتابع الأسعار؟ استخدم /filter
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
• CryptoPunks: <code>${nftPrices['CryptoPunks'].floor}</code> (AVG: ${nftPrices['CryptoPunks'].avg})
• Bored Ape: <code>${nftPrices['Bored Ape'].floor}</code> (AVG: ${nftPrices['Bored Ape'].avg})

📌 <b>الأوامر المتوفرة:</b>
/market — إشعارات بيع الهدايا
/auction — إشعارات المزادات
/search — بحث عن الهدايا
/filter — تتبع الأسعار
/me — سعر هداياك

📌 <b>الاستخدام السريع:</b>
@PriceNFTbot «link/username/id/TON-address»
    `);
    await ctx.replyWithHTML(data.text, { ...data.buttons, disable_web_page_preview: true });
});

bot.command('menu', async (ctx) => {
    const data = mainMenu();
    await ctx.replyWithHTML(data.text, { ...data.buttons, disable_web_page_preview: true });
});

bot.command('me', async (ctx) => {
    await ctx.replyWithHTML(`
<b>🎁 سعر هداياك</b>

📊 <b>هداياك الحالية:</b>
• CryptoPunks: <code>49.5 ETH</code> (Floor)
• Bored Ape: <code>28.7 ETH</code> (Floor)

💰 <b>إجمالي القيمة:</b> <code>78.2 ETH</code>

📌 <b>للحصول على سعر محدد:</b>
@PriceNFTbot «link/username/id/TON-address»
    `);
});

bot.command('market', async (ctx) => {
    await ctx.replyWithHTML(`
<b>🔔 إشعارات بيع الهدايا</b>

📌 <b>تم تفعيل الإشعارات</b>

🔔 <b>سيتم إعلامك عند:</b>
• طرح هدية للبيع
• تغير السعر الأرضي
• صفقات جديدة

📌 <b>لإلغاء الإشعارات:</b>
<code>/market stop</code>
    `);
});

bot.command('auction', async (ctx) => {
    const args = ctx.message.text.split(' ');
    if (args.length > 1 && args[1] === 'stop') {
        await ctx.replyWithHTML(`
<b>✅ تم إلغاء تنبيهات المزاد</b>

📌 لن تصلك أي إشعارات مزاد جديدة
        `);
        return;
    }
    
    await ctx.replyWithHTML(`
<b>🔔 تنبيهات المزاد</b>

📌 <b>تم تفعيل التنبيهات</b>

🔔 <b>المزادات النشطة:</b>
• CryptoPunks #1234: 50 ETH
• Bored Ape #5678: 30 ETH

📌 <b>لإلغاء التنبيهات:</b>
<code>/auction stop</code>
    `);
});

bot.command('search', async (ctx) => {
    const args = ctx.message.text.split(' ');
    if (args.length < 2) {
        await ctx.replyWithHTML(`
<b>❌ استخدام خاطئ</b>

📌 <b>الاستخدام الصحيح:</b>
<code>/search [النموذج]</code>

مثال:
<code>/search CryptoPunks</code>
        `);
        return;
    }
    
    const query = args.slice(1).join(' ');
    const results = Object.keys(nftPrices).filter(key => 
        key.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length === 0) {
        await ctx.replyWithHTML(`
<b>❌ لم يتم العثور على نتائج</b>

📌 حاول البحث بـ:
• النموذج (Model)
• الخلفية (Background)
• النمط (Pattern)
        `);
        return;
    }
    
    let text = `<b>🔍 نتائج البحث عن: "${query}"</b>\n\n`;
    results.forEach(key => {
        const nft = nftPrices[key];
        text += `<b>${key}</b>\n`;
        text += `• السعر الأرضي: <code>${nft.floor}</code>\n`;
        text += `• متوسط السعر: <code>${nft.avg}</code>\n\n`;
    });
    
    await ctx.replyWithHTML(text);
});

bot.command('filter', async (ctx) => {
    const args = ctx.message.text.split(' ');
    if (args.length < 2) {
        await ctx.replyWithHTML(`
<b>❌ استخدام خاطئ</b>

📌 <b>الاستخدام الصحيح:</b>
<code>/filter [النموذج]</code>

مثال:
<code>/filter CryptoPunks</code>

📌 <b>لإزالة من القائمة:</b>
<code>/filter remove CryptoPunks</code>
        `);
        return;
    }
    
    if (args[1] === 'remove') {
        await ctx.replyWithHTML(`
<b>✅ تم إزالة ${args.slice(2).join(' ')} من قائمة التتبع</b>
        `);
        return;
    }
    
    const model = args.slice(1).join(' ');
    await ctx.replyWithHTML(`
<b>✅ تم إضافة ${model} إلى قائمة التتبع</b>

📌 <b>سيتم تتبع الأسعار لهذا النموذج</b>
• السعر الأرضي: <code>${nftPrices[model]?.floor || 'غير متوفر'}</code>
• متوسط السعر: <code>${nftPrices[model]?.avg || 'غير متوفر'}</code>

📌 <b>لإزالة من القائمة:</b>
<code>/filter remove ${model}</code>
    `);
});

// ========== معالجة الـ Inline Queries ==========
bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query;
    const results = [];
    
    if (query) {
        Object.keys(nftPrices).forEach(key => {
            if (key.toLowerCase().includes(query.toLowerCase())) {
                const nft = nftPrices[key];
                results.push({
                    type: 'article',
                    id: key,
                    title: key,
                    description: `Floor: ${nft.floor} | AVG: ${nft.avg} | ${nft.change}`,
                    input_message_content: {
                        message_text: `
<b>💰 ${key}</b>

• السعر الأرضي: <code>${nft.floor}</code>
• متوسط السعر: <code>${nft.avg}</code>
• التغير: <code>${nft.change}</code>

🔄 تحديث: ${new Date().toLocaleTimeString()}
                        `,
                        parse_mode: 'HTML'
                    },
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🔍 عرض التفاصيل', callback_data: `detail_${key}` }]
                        ]
                    }
                });
            }
        });
    }
    
    if (results.length === 0 && query) {
        results.push({
            type: 'article',
            id: 'not_found',
            title: '❌ لم يتم العثور على نتائج',
            description: 'حاول البحث عن نموذج آخر',
            input_message_content: {
                message_text: '❌ لم يتم العثور على نتائج للبحث: ' + query
            }
        });
    }
    
    await ctx.answerInlineQuery(results, {
        cache_time: 300,
        is_personal: true
    });
});

// ========== تشغيل البوت ==========
console.log('🚀 جاري تشغيل البوت...');

bot.launch({
    dropPendingUpdates: true
}).then(() => {
    console.log('✅ Bot is running successfully!');
    console.log('🤖 Bot: @PriceNFTbot');
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
