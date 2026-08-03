const { Telegraf, Markup } = require('telegraf');
const express = require('express');

// ===== التوكن =====
const BOT_TOKEN = "8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI";
const bot = new Telegraf(BOT_TOKEN);

// ===== البيانات =====
const userId = "8505541555";
const adminUsername = "@SSSTlF";

// ===== خادم الويب (لـ Render) =====
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
    res.send(`
        <h1>🔥 Hacker Academy Bot</h1>
        <p>🤖 @aaaasvvvbot</p>
        <p>👑 تحت إشراف ${adminUsername}</p>
        <p>📚 افخم بوت تعليم برمجة واختراقات</p>
    `);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Web server running on port ${PORT}`);
});

// ===== القائمة الرئيسية الفخمة =====
function mainMenu() {
    return {
        text: `
🔥 *هاكر أكاديمي* 🔥
━━━━━━━━━━━━━━━━━
👑 *تحت إشراف* ${adminUsername}
📚 *أفخم بوت تعليم برمجة واختراقات*

📖 *المحتوى التعليمي:*
• 50+ درس حقيقي
• كودات اختراق احترافية
• تصميم مواقع متقدمة
• برمجة بوتات تليجرام

💻 *المستويات:*
🟢 مبتدئ → 🟡 متوسط → 🔴 محترف

━━━━━━━━━━━━━━━━━
📌 *اختر مسارك التعليمي*
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('🐍 بايثون - اختراق', 'python_hacking')],
            [Markup.button.callback('🤖 برمجة البوتات', 'bot_programming')],
            [Markup.button.callback('🌐 تصميم المواقع', 'web_design')],
            [Markup.button.callback('🔐 أمن سيبراني', 'cyber_security')],
            [Markup.button.callback('📱 اختراق الموبايل', 'mobile_hacking')],
            [Markup.button.callback('🛠 أدوات الهاكر', 'hacker_tools')],
            [Markup.button.callback('📖 دروس متقدمة', 'advanced_lessons')],
            [Markup.button.callback('💻 مشاريع عملية', 'projects')],
            [Markup.button.callback('👥 المجتمع', 'community')],
            [Markup.button.callback('📞 تواصل مع المشرف', 'contact_admin')]
        ], { columns: 2 })
    };
}

// ===== دروس بايثون - اختراق =====
const pythonHackingLessons = [
    '📚 *درس 1: مقدمة في اختراق بايثون*\n\n🐍 تعلم أساسيات اختراق بايثون\n📌 فهم الثغرات الأمنية\n🔧 أدوات الاختراق الأساسية\n\n`code: print("Hacking with Python")`',
    '📚 *درس 2: ماسح المنافذ*\n\n🛠 بناء ماسح منافذ باستخدام بايثون\n📡 اكتشاف الخدمات المشغلة\n🔍 تحليل النتائج\n\n```python\nimport socket\ndef scan_port(host, port):\n    sock = socket.socket()\n    result = sock.connect_ex((host, port))\n    sock.close()\n    return result == 0\n```',
    '📚 *درس 3: هجوم القاموس*\n\n🔐 اختبار كلمات المرور\n📚 استخدام قواميس اختراق\n⚡️ تحسين الأداء\n\n```python\nimport hashlib\ndef crack_password(hash_value, wordlist):\n    for word in wordlist:\n        if hashlib.md5(word.encode()).hexdigest() == hash_value:\n            return word\n    return None\n```',
    '📚 *درس 4: اعتراض الحزم*\n\n📡 استخدام Scapy لاعتراض الحزم\n🔍 تحليل حركة المرور\n🛡 اكتشاف هجمات الشبكة',
    '📚 *درس 5: استغلال الثغرات*\n\n💥 استغلال ثغرات الويب\n🔧 استخدام requests للهجوم\n🛠 تنفيذ أوامر عن بعد',
    '📚 *درس 6: تشفير وفك تشفير*\n\n🔐 تشفير البيانات\n🗝 فك التشفير\n📜 تقنيات التشفير المتقدمة',
    '📚 *درس 7: هجوم MITM*\n\n👤 هجوم الرجل في المنتصف\n📡 اعتراض الاتصالات\n🛡 الحماية من الهجوم',
    '📚 *درس 8: اختراق واي فاي*\n\n📶 اختراق شبكات الواي فاي\n🔑 استخراج كلمات المرور\n🛠 استخدام Aircrack-ng',
    '📚 *درس 9: بناء روت كيت*\n\n🕵️‍♂️ بناء روت كيت خفي\n🔧 التحكم في النظام\n🛡 تجنب الكشف',
    '📚 *درس 10: اختبار الاختراق المتقدم*\n\n🎯 اختبار اختراق شامل\n📊 تقارير الثغرات\n🛠 أدوات متقدمة',
    '📚 *درس 11: هندسة عكسية*\n\n🔍 تحليل البرمجيات\n🛠 فك التجميع\n🔧 فهم الشيفرة المصدرية',
    '📚 *درس 12: استغلال الثغرات الصفرية*\n\n💥 ثغرات اليوم صفر\n🔍 اكتشاف الثغرات\n🛡 تطوير إكسبلويت',
    '📚 *درس 13: أمن الشبكات*\n\n🛡 حماية الشبكات\n🔍 كشف الاختراقات\n📊 تحليل السجلات',
    '📚 *درس 14: اختراق السيرفرات*\n\n🖥 اختراق خوادم الويب\n🔍 استغلال الثغرات\n🛠 أدوات الاختراق',
    '📚 *درس 15: البايثون للأمن السيبراني*\n\n🔐 بايثون للأمن\n🛠 أدوات حماية\n📚 دروس متقدمة',
    '📚 *درس 16: بناء فايروس بايثون*\n\n🦠 بناء فيروسات تجريبية\n🔧 تقنيات التخفي\n🛡 تجنب الكشف',
    '📚 *درس 17: اختراق الأنظمة المدمجة*\n\n🤖 اختراق الأجهزة المدمجة\n🔍 استغلال الثغرات\n🛠 أدوات متخصصة',
    '📚 *درس 18: أمن قواعد البيانات*\n\n🗄 حماية قواعد البيانات\n🔍 كشف الثغرات\n🛡 هجمات SQL Injection',
    '📚 *درس 19: اختراق التطبيقات*\n\n📱 اختراق تطبيقات الموبايل\n🔍 استغلال الثغرات\n🛠 أدوات اختبار',
    '📚 *درس 20: أمن السحابة*\n\n☁️ حماية السحابة\n🔍 كشف الثغرات\n🛡 تأمين البيئات السحابية'
];

// ===== دروس برمجة البوتات =====
const botProgrammingLessons = [
    '📚 *درس 1: مقدمة في برمجة البوتات*\n\n🤖 أساسيات برمجة البوتات\n📚 استخدام مكتبة Telegraf\n🔧 إنشاء أول بوت',
    '📚 *درس 2: بناء بوت تليجرام متقدم*\n\n🛠 بوت متكامل\n📊 قواعد البيانات\n🔐 أمان البوتات',
    '📚 *درس 3: أزرار تفاعلية فخمة*\n\n🎛 أزرار Inline\n📋 قوائم منسقة\n🎨 تصميم واجهات',
    '📚 *درس 4: ربط البوت بقواعد البيانات*\n\n🗄 استخدام MongoDB\n📊 تخزين البيانات\n🔍 استرجاع المعلومات',
    '📚 *درس 5: بوتات الذكاء الاصطناعي*\n\n🧠 استخدام APIs ذكاء اصطناعي\n🤖 بوتات متقدمة\n📚 تطبيقات عملية'
];

// ===== دروس تصميم المواقع =====
const webDesignLessons = [
    '📚 *درس 1: مقدمة في تصميم المواقع*\n\n🌐 أساسيات HTML & CSS\n🎨 تصميم صفحات احترافية\n📱 تصميم متجاوب',
    '📚 *درس 2: مواقع اختراق وهمية*\n\n🕵️ تصميم مواقع تجريبية\n🔐 واجهات اختراق\n🛠 أدوات التصميم',
    '📚 *درس 3: واجهات فخمة للمخترقين*\n\n🎨 تصميم واجهات سوداء\n💻 تأثيرات متقدمة\n⚡️ أداء عالي',
    '📚 *درس 4: مواقع إدارة الاختراقات*\n\n📊 لوحات تحكم\n📈 إحصائيات\n🛠 أدوات إدارة',
    '📚 *درس 5: تصميم مواقع بوتات*\n\n🤖 واجهات بوتات\n📱 تطبيقات ويب\n🔧 تكامل مع APIs'
];

// ===== دروس الأمن السيبراني =====
const cyberSecurityLessons = [
    '📚 *درس 1: مقدمة في الأمن السيبراني*\n\n🛡 أساسيات الأمن\n🔍 أنواع الهجمات\n📚 استراتيجيات الدفاع',
    '📚 *درس 2: تحليل الثغرات*\n\n🔍 كشف الثغرات\n📊 تقييم المخاطر\n🛠 أدوات التحليل',
    '📚 *درس 3: أمن التطبيقات*\n\n🛡 حماية التطبيقات\n🔐 تشفير البيانات\n📚 أفضل الممارسات'
];

// ===== دروس اختراق الموبايل =====
const mobileHackingLessons = [
    '📚 *درس 1: مقدمة في اختراق الموبايل*\n\n📱 أساسيات اختراق الأندرويد\n🔍 استغلال الثغرات\n🛠 أدوات الاختراق',
    '📚 *درس 2: اختراق تطبيقات الموبايل*\n\n🔐 تحليل التطبيقات\n💥 استغلال الثغرات\n📚 تقنيات متقدمة'
];

// ===== أدوات الهاكر =====
const hackerToolsLessons = [
    '📚 *أداة 1: Nmap*\n\n🔍 ماسح الشبكات\n📡 اكتشاف الأجهزة\n🛠 استخدام متقدم',
    '📚 *أداة 2: Metasploit*\n\n💥 إطار الاختراق\n🛠 تطوير إكسبلويت\n🔧 استخدام متقدم',
    '📚 *أداة 3: Wireshark*\n\n📡 تحليل الحزم\n🔍 كشف الهجمات\n📊 تقارير متقدمة'
];

// ===== دروس متقدمة =====
const advancedLessons = [
    '📚 *درس متقدم 1: اختراق الأنظمة الخبيرة*\n\n💻 استغلال الثغرات المعقدة\n🛠 أدوات متخصصة\n🔍 تحليل متقدم',
    '📚 *درس متقدم 2: أمن الذكاء الاصطناعي*\n\n🧠 حماية الأنظمة الذكية\n🔐 تشفير متقدم\n📚 دراسات حالة'
];

// ===== مشاريع عملية =====
const projectsLessons = [
    '📚 *مشروع 1: بناء ماسح ثغرات*\n\n🛠 مشروع متكامل\n🔍 اكتشاف الثغرات\n📊 تقارير احترافية',
    '📚 *مشروع 2: بناء بوت اختراق*\n\n🤖 بوت متقدم\n🔧 أدوات الاختراق\n📚 تطبيق عملي'
];

// ===== دوال عرض الدروس =====
function sendLesson(ctx, lessons, title) {
    let text = `📚 *${title}*\n━━━━━━━━━━━━━━━━━\n`;
    lessons.forEach((lesson, i) => {
        text += `\n${i+1}. ${lesson.split('\n')[0].replace('📚 ', '')}`;
    });
    text += `\n━━━━━━━━━━━━━━━━━\n📌 اختر درساً لقراءة الكود والشرح`;

    const buttons = lessons.map((_, i) => {
        return [Markup.button.callback(`${i+1}`, `lesson_${title}_${i}`)];
    });
    buttons.push([Markup.button.callback('🔙 رجوع للقائمة', 'back_to_main')]);

    return ctx.reply(text, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard(buttons)
    });
}

// ===== معالج الأزرار =====
bot.action('python_hacking', async (ctx) => {
    await ctx.answerCbQuery();
    await sendLesson(ctx, pythonHackingLessons, 'دروس اختراق بايثون');
});

bot.action('bot_programming', async (ctx) => {
    await ctx.answerCbQuery();
    await sendLesson(ctx, botProgrammingLessons, 'دروس برمجة البوتات');
});

bot.action('web_design', async (ctx) => {
    await ctx.answerCbQuery();
    await sendLesson(ctx, webDesignLessons, 'دروس تصميم المواقع');
});

bot.action('cyber_security', async (ctx) => {
    await ctx.answerCbQuery();
    await sendLesson(ctx, cyberSecurityLessons, 'دروس الأمن السيبراني');
});

bot.action('mobile_hacking', async (ctx) => {
    await ctx.answerCbQuery();
    await sendLesson(ctx, mobileHackingLessons, 'دروس اختراق الموبايل');
});

bot.action('hacker_tools', async (ctx) => {
    await ctx.answerCbQuery();
    await sendLesson(ctx, hackerToolsLessons, 'أدوات الهاكر');
});

bot.action('advanced_lessons', async (ctx) => {
    await ctx.answerCbQuery();
    await sendLesson(ctx, advancedLessons, 'دروس متقدمة');
});

bot.action('projects', async (ctx) => {
    await ctx.answerCbQuery();
    await sendLesson(ctx, projectsLessons, 'مشاريع عملية');
});

bot.action('community', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply(`
👥 *مجتمع الهاكرز*
━━━━━━━━━━━━━━━━━
🌐 انضم لقنواتنا:
📢 @YourChannel
💬 @YourGroup

👑 *المشرف*: ${adminUsername}

📚 *محتوى حصري*
• دروس يومية
• كودات اختراق
• مشاريع عملية
• تحديات أسبوعية
    `, { parse_mode: 'Markdown' });
});

bot.action('contact_admin', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply(`
📞 *تواصل مع المشرف*
━━━━━━━━━━━━━━━━━
👑 *المشرف*: ${adminUsername}

📌 *للتواصل*:
• مباشرة: ${adminUsername}
• البوت: @aaaasvvvbot

🛠 *الخدمات*:
• استشارات أمنية
• دورات خاصة
• مشاريع مخصصة
    `, { parse_mode: 'Markdown' });
});

bot.action(/lesson_.+/, async (ctx) => {
    const callbackData = ctx.callbackQuery.data;
    const parts = callbackData.split('_');
    const title = parts[1] + '_' + parts[2];
    const index = parseInt(parts[3]);

    let lessons;
    if (title.includes('دروس اختراق بايثون')) lessons = pythonHackingLessons;
    else if (title.includes('دروس برمجة البوتات')) lessons = botProgrammingLessons;
    else if (title.includes('دروس تصميم المواقع')) lessons = webDesignLessons;
    else if (title.includes('دروس الأمن السيبراني')) lessons = cyberSecurityLessons;
    else if (title.includes('دروس اختراق الموبايل')) lessons = mobileHackingLessons;
    else if (title.includes('أدوات الهاكر')) lessons = hackerToolsLessons;
    else if (title.includes('دروس متقدمة')) lessons = advancedLessons;
    else if (title.includes('مشاريع عملية')) lessons = projectsLessons;
    else return ctx.answerCbQuery('❌ درس غير موجود');

    if (index < lessons.length) {
        await ctx.answerCbQuery(`📚 عرض الدرس ${index+1}`);
        await ctx.reply(lessons[index], {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('📖 الدرس التالي', `lesson_${title}_${index+1}`)],
                [Markup.button.callback('📚 العودة للدروس', `back_${title}`)],
                [Markup.button.callback('🔙 القائمة الرئيسية', 'back_to_main')]
            ])
        });
    } else {
        await ctx.answerCbQuery('🏁 وصلت لآخر درس');
        await ctx.reply('🏁 *وصلت لآخر درس في هذه المجموعة*\n📚 اختر درساً آخر أو عد للقائمة', {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('📚 العودة للدروس', `back_${title}`)],
                [Markup.button.callback('🔙 القائمة الرئيسية', 'back_to_main')]
            ])
        });
    }
});

bot.action(/back_.+/, async (ctx) => {
    const callbackData = ctx.callbackQuery.data;
    const title = callbackData.replace('back_', '');
    
    let lessons;
    if (title.includes('دروس اختراق بايثون')) lessons = pythonHackingLessons;
    else if (title.includes('دروس برمجة البوتات')) lessons = botProgrammingLessons;
    else if (title.includes('دروس تصميم المواقع')) lessons = webDesignLessons;
    else if (title.includes('دروس الأمن السيبراني')) lessons = cyberSecurityLessons;
    else if (title.includes('دروس اختراق الموبايل')) lessons = mobileHackingLessons;
    else if (title.includes('أدوات الهاكر')) lessons = hackerToolsLessons;
    else if (title.includes('دروس متقدمة')) lessons = advancedLessons;
    else if (title.includes('مشاريع عملية')) lessons = projectsLessons;
    else return ctx.answerCbQuery('❌');

    await ctx.answerCbQuery();
    await sendLesson(ctx, lessons, title);
});

bot.action('back_to_main', async (ctx) => {
    await ctx.answerCbQuery();
    const menu = mainMenu();
    await ctx.editMessageText(menu.text, {
        parse_mode: 'Markdown',
        ...menu.buttons,
        disable_web_page_preview: true
    });
});

// ===== أوامر البوت =====
bot.start(async (ctx) => {
    const menu = mainMenu();
    await ctx.reply(`
🔥 *مرحباً بك في هاكر أكاديمي* 🔥
━━━━━━━━━━━━━━━━━
👑 *تحت إشراف* ${adminUsername}
📚 *أفخم بوت تعليمي في الشرق الأوسط*

📌 *المحتوى:*
• 50+ درس حقيقي
• كودات اختراق احترافية
• تصميم مواقع متقدمة
• برمجة بوتات تليجرام

💡 *ابدأ رحلتك في عالم الاختراق الأخلاقي*
    `, {
        parse_mode: 'Markdown',
        ...menu.buttons,
        disable_web_page_preview: true
    });
});

bot.command('menu', async (ctx) => {
    const menu = mainMenu();
    await ctx.reply(menu.text, {
        parse_mode: 'Markdown',
        ...menu.buttons,
        disable_web_page_preview: true
    });
});

// ===== تشغيل البوت =====
async function startBot() {
    try {
        await bot.telegram.setWebhook();
        console.log('✅ Webhook removed, using polling...');
        await bot.launch();
        console.log('✅ Bot is running successfully!');
        console.log(`🤖 Bot username: @${bot.botInfo?.username || 'unknown'}`);
    } catch (err) {
        console.error('❌ Failed to start bot:', err.message);
        process.exit(1);
    }
}

startBot();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
