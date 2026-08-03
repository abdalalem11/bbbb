const { Telegraf, Markup } = require('telegraf');
const express = require('express');

// ===== التوكن =====
const BOT_TOKEN = "8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI";
const bot = new Telegraf(BOT_TOKEN);

// ===== البيانات =====
const userId = "8505541555";
const refLink = "https://t.me/aaaasvvvbot?start=ref123456";

// ===== خادم الويب (لـ Render) =====
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
    res.send(`
        <h1>🔥 منصة عبود التعليمية الشاملة</h1>
        <p>🤖 @aaaasvvvbot</p>
        <p>👑 تحت إشراف عبود @SSSTlF</p>
        <p>📚 200 درس تعليمي في 10 أقسام</p>
    `);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Web server running on port ${PORT}`);
});

// ===== الأقسام التعليمية (10 أقسام × 20 زر = 200 درس) =====
const SECTIONS = {
    basics: {
        title: '📘 أساسيات البرمجة',
        emoji: '📘',
        description: 'أساسيات البرمجة للمبتدئين',
        lessons: [
            'مقدمة البرمجة', 'المتغيرات', 'أنواع البيانات', 'الشروط',
            'الحلقات', 'الدوال', 'الكلاسات', 'معالجة الأخطاء',
            'الملفات', 'المكتبات', 'Git', 'GitHub',
            'أساسيات الشبكات', 'TCP/IP', 'HTTP', 'DNS',
            'Linux', 'Bash', 'Docker', 'APIs'
        ]
    },
    python: {
        title: '🐍 بايثون',
        emoji: '🐍',
        description: 'تعلم لغة بايثون من الصفر للاحتراف',
        lessons: [
            'مقدمة بايثون', 'المتغيرات في بايثون', 'أنواع البيانات', 'الشروط في بايثون',
            'الحلقات في بايثون', 'الدوال في بايثون', 'الكلاسات في بايثون', 'معالجة الأخطاء',
            'الملفات في بايثون', 'المكتبات الشهيرة', 'بايثون للويب', 'بايثون للبيانات',
            'بايثون للذكاء الاصطناعي', 'بايثون للأمن', 'بايثون للبوتات', 'بايثون للأتمتة',
            'بايثون للشبكات', 'بايثون للقواعد', 'بايثون للتطبيقات', 'بايثون للمشاريع'
        ]
    },
    telegram_bots: {
        title: '🤖 برمجة بوتات تليجرام',
        emoji: '🤖',
        description: 'تعلم برمجة بوتات تليجرام بجميع المكتبات',
        lessons: [
            'مقدمة البوتات', 'TeleBot', 'Aiogram', 'Pyrogram',
            'Telethon', 'Webhooks', 'Long Polling', 'أزرار البوتات',
            'قواعد البيانات', 'API الخارجية', 'إرسال الملفات', 'إرسال الصور',
            'إرسال الفيديو', 'إرسال الصوت', 'بوتات الدفع', 'بوتات الألعاب',
            'بوتات التعليم', 'بوتات التواصل', 'بوتات التحليل', 'مشروع بوت متكامل'
        ]
    },
    html_css: {
        title: '🌐 HTML & CSS',
        emoji: '🌐',
        description: 'تعلم تصميم مواقع الويب',
        lessons: [
            'مقدمة HTML', 'هيكل الصفحة', 'النصوص', 'الروابط',
            'الصور', 'القوائم', 'الجداول', 'النماذج',
            'مقدمة CSS', 'الألوان', 'الخطوط', 'التخطيط',
            'Flexbox', 'Grid', 'التجاوب', 'التحريك',
            'CSS المتقدم', 'CSS Variables', 'SASS', 'مشروع تصميم'
        ]
    },
    javascript: {
        title: '⚙️ JavaScript',
        emoji: '⚙️',
        description: 'تعلم لغة JavaScript لتطوير الويب',
        lessons: [
            'مقدمة JavaScript', 'المتغيرات', 'أنواع البيانات', 'الشروط',
            'الحلقات', 'الدوال', 'الأشياء', 'المصفوفات',
            'DOM', 'الأحداث', 'AJAX', 'Fetch API',
            'Promises', 'Async/Await', 'ES6', 'المكتبات',
            'React', 'Vue.js', 'Node.js', 'مشروع JavaScript'
        ]
    },
    databases: {
        title: '💾 قواعد البيانات',
        emoji: '💾',
        description: 'تعلم قواعد البيانات SQL و NoSQL',
        lessons: [
            'مقدمة قواعد البيانات', 'SQLite', 'MySQL', 'PostgreSQL',
            'MongoDB', 'Redis', 'Firebase', 'إنشاء الجداول',
            'الاستعلامات', 'التحديث', 'الحذف', 'الربط',
            'الفهرسة', 'النسخ الاحتياطي', 'الأمان', 'التحسين',
            'العلاقات', 'المعاملات', 'التخزين', 'مشروع قاعدة بيانات'
        ]
    },
    flask_fastapi: {
        title: '🌍 Flask & FastAPI',
        emoji: '🌍',
        description: 'تعلم بناء APIs ومواقع ويب',
        lessons: [
            'مقدمة Flask', 'Flask للمبتدئين', 'Flask المتقدم', 'Flask APIs',
            'مقدمة FastAPI', 'FastAPI للمبتدئين', 'FastAPI المتقدم', 'FastAPI APIs',
            'OAuth', 'JWT', 'التوثيق', 'الأمان',
            'التعامل مع الطلبات', 'الاستجابات', 'قواعد البيانات', 'الاختبار',
            'النشر', 'الأداء', 'التوسع', 'مشروع API'
        ]
    },
    cyber_security: {
        title: '🛡️ الأمن السيبراني الدفاعي',
        emoji: '🛡️',
        description: 'تعلم حماية الأنظمة والتصدي للهجمات',
        lessons: [
            'مقدمة الأمن السيبراني', 'OWASP Top 10', 'SQL Injection (للشرح والدفاع)',
            'XSS (للشرح والدفاع)', 'CSRF (للشرح والدفاع)', 'أمن كلمات المرور',
            'التشفير', 'الهاش', 'التوقيع الرقمي', 'الشهادات',
            'جدران الحماية', 'أنظمة الكشف', 'التصدي للهجمات', 'الاختبار الأمني',
            'أمن الشبكات', 'أمن التطبيقات', 'أمن السحابة', 'أمن الأجهزة',
            'التحليل الأمني', 'الاستجابة للحوادث'
        ]
    },
    lab_ctf: {
        title: '🧪 المختبرات العملية وCTF',
        emoji: '🧪',
        description: 'تطبيق عملي ومختبرات اختراق',
        lessons: [
            'مقدمة CTF', 'CTF للمبتدئين', 'تحديات الويب', 'تحديات الشبكات',
            'تحديات التشفير', 'تحديات الثغرات', 'تحديات الاستغلال', 'تحليل الثغرات',
            'اختبار الاختراق', 'أدوات الاختبار', 'Nmap', 'Metasploit',
            'Burp Suite', 'Wireshark', 'Hydra', 'John the Ripper',
            'مختبر الويب', 'مختبر الشبكات', 'مختبر الأنظمة', 'مختبر الأمن'
        ]
    },
    projects_tests: {
        title: '🎓 المشاريع والاختبارات',
        emoji: '🎓',
        description: 'مشاريع عملية واختبارات تقييم',
        lessons: [
            'مشروع بوت متجر', 'مشروع بوت إدارة', 'مشروع API', 'مشروع موقع',
            'مشروع قاعدة بيانات', 'مشروع أمني', 'مشروع تحليل', 'مشروع أتمتة',
            'اختبار المستوى', 'اختبار أساسيات', 'اختبار بايثون', 'اختبار بوتات',
            'اختبار ويب', 'اختبار قواعد', 'اختبار أمن', 'اختبار شامل',
            'شهادة إتمام', 'تقييم المشاريع', 'تحليل النتائج', 'خطة تطوير'
        ]
    }
};

// ===== دالة عرض القائمة الرئيسية =====
function mainMenu() {
    return {
        text: `
🔥 *منصة عبود التعليمية الشاملة* 🔥

👑 *تحت إشراف:* @SSSTlF
🆔 *ايدي حسابك:* \`${userId}\`

📚 *اختر القسم التعليمي المناسب لك:*

📘 أساسيات البرمجة (20 درس)
🐍 بايثون (20 درس)
🤖 برمجة بوتات تليجرام (20 درس)
🌐 HTML & CSS (20 درس)
⚙️ JavaScript (20 درس)
💾 قواعد البيانات (20 درس)
🌍 Flask & FastAPI (20 درس)
🛡️ الأمن السيبراني الدفاعي (20 درس)
🧪 المختبرات العملية وCTF (20 درس)
🎓 المشاريع والاختبارات (20 درس)

📊 *إجمالي الدروس: 200 درس تعليمي*

🎯 *تعلم وطور مهاراتك مع أفضل المدربين*
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('📘 أساسيات البرمجة', 'section_basics')],
            [Markup.button.callback('🐍 بايثون', 'section_python')],
            [Markup.button.callback('🤖 برمجة بوتات تليجرام', 'section_telegram_bots')],
            [Markup.button.callback('🌐 HTML & CSS', 'section_html_css')],
            [Markup.button.callback('⚙️ JavaScript', 'section_javascript')],
            [Markup.button.callback('💾 قواعد البيانات', 'section_databases')],
            [Markup.button.callback('🌍 Flask & FastAPI', 'section_flask_fastapi')],
            [Markup.button.callback('🛡️ الأمن السيبراني الدفاعي', 'section_cyber_security')],
            [Markup.button.callback('🧪 المختبرات العملية وCTF', 'section_lab_ctf')],
            [Markup.button.callback('🎓 المشاريع والاختبارات', 'section_projects_tests')],
            [Markup.button.callback('📢 القناة الرسمية', 'channel')],
            [Markup.button.callback('🛠 الدعم الفني', 'support')]
        ], { columns: 2 })
    };
}

// ===== دالة عرض الدروس =====
function showLesson(sectionKey, index) {
    const section = SECTIONS[sectionKey];
    if (!section || index >= section.lessons.length) {
        return {
            text: `✅ *انتهت الدروس التعليمية في قسم ${section.title}*\n\n🎉 لقد أكملت جميع الدروس!`,
            buttons: Markup.inlineKeyboard([
                [Markup.button.callback('🔙 العودة للقائمة الرئيسية', 'menu')]
            ])
        };
    }
    
    const lessonName = section.lessons[index];
    const total = section.lessons.length;
    
    return {
        text: `
📚 *${section.title}*

📖 *الدرس ${index + 1} من ${total}*

📘 *${lessonName}*

📝 *شرح مفصل للدرس مع أمثلة عملية وتطبيقات واقعية*
👨‍🏫 *تحت إشراف عبود @SSSTlF*

💡 *للوصول للدرس التالي، استخدم الأزرار أدناه*
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('⬅️ السابق', `prev_${sectionKey}_${index}`)],
            [Markup.button.callback('التالي ➡️', `next_${sectionKey}_${index}`)],
            [Markup.button.callback('🔙 العودة للقسم', `back_${sectionKey}`)],
            [Markup.button.callback('🏠 القائمة الرئيسية', 'menu')]
        ], { columns: 2 })
    };
}

// ===== إنشاء الأزرار الديناميكية للأقسام =====
Object.keys(SECTIONS).forEach(sectionKey => {
    // زر فتح القسم
    bot.action(`section_${sectionKey}`, async (ctx) => {
        const lesson = showLesson(sectionKey, 0);
        await ctx.answerCbQuery(`📚 تم فتح ${SECTIONS[sectionKey].title}`);
        await ctx.editMessageText(lesson.text, {
            parse_mode: 'Markdown',
            ...lesson.buttons,
            disable_web_page_preview: true
        });
    });

    // زر العودة للقسم
    bot.action(`back_${sectionKey}`, async (ctx) => {
        const lesson = showLesson(sectionKey, 0);
        await ctx.answerCbQuery(`🔙 العودة إلى ${SECTIONS[sectionKey].title}`);
        await ctx.editMessageText(lesson.text, {
            parse_mode: 'Markdown',
            ...lesson.buttons,
            disable_web_page_preview: true
        });
    });

    // زر التالي
    bot.action(new RegExp(`next_${sectionKey}_(\\d+)`), async (ctx) => {
        const index = parseInt(ctx.match[1]) + 1;
        const lesson = showLesson(sectionKey, index);
        await ctx.answerCbQuery(`📖 الدرس ${index + 1}`);
        await ctx.editMessageText(lesson.text, {
            parse_mode: 'Markdown',
            ...lesson.buttons,
            disable_web_page_preview: true
        });
    });

    // زر السابق
    bot.action(new RegExp(`prev_${sectionKey}_(\\d+)`), async (ctx) => {
        const index = parseInt(ctx.match[1]) - 1;
        if (index < 0) {
            await ctx.answerCbQuery('⚠️ أنت في أول درس');
            return;
        }
        const lesson = showLesson(sectionKey, index);
        await ctx.answerCbQuery(`📖 الدرس ${index + 1}`);
        await ctx.editMessageText(lesson.text, {
            parse_mode: 'Markdown',
            ...lesson.buttons,
            disable_web_page_preview: true
        });
    });
});

// ===== زر العودة للقائمة الرئيسية =====
bot.action('menu', async (ctx) => {
    const menu = mainMenu();
    await ctx.answerCbQuery('🏠 العودة للقائمة الرئيسية');
    await ctx.editMessageText(menu.text, {
        parse_mode: 'Markdown',
        ...menu.buttons,
        disable_web_page_preview: true
    });
});

// ===== أوامر البوت =====
bot.start(async (ctx) => {
    const menu = mainMenu();
    await ctx.reply('🔥 *مرحباً بك في منصة عبود التعليمية الشاملة!*\n📚 *استعد لتعلم 200 درس في 10 أقسام مختلفة*', { parse_mode: 'Markdown' });
    await ctx.reply(menu.text, { 
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

// ===== زر القناة =====
bot.action('channel', async (ctx) => {
    await ctx.answerCbQuery('📢 القناة الرسمية');
    await ctx.reply('📢 *القناة الرسمية:* @SSSTlF\n\n📚 *تابع كل جديد في عالم البرمجة والأمن السيبراني*', {
        parse_mode: 'Markdown'
    });
});

// ===== زر الدعم =====
bot.action('support', async (ctx) => {
    await ctx.answerCbQuery('🛠 فريق الدعم');
    await ctx.reply('🛠 *فريق الدعم الفني:* @SSSTlF\n\n📩 *للتواصل والاستفسارات، يرجى مراسلة الدعم مباشرة*', {
        parse_mode: 'Markdown'
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
        console.log('📡 Polling for updates...');
        console.log('👑 تحت إشراف عبود @SSSTlF');
        console.log('📚 200 درس في 10 أقسام');
    } catch (err) {
        console.error('❌ Failed to start bot:', err.message);
        process.exit(1);
    }
}

startBot();

process.once('SIGINT', () => { bot.stop('SIGINT'); console.log('🛑 Bot stopped'); });
process.once('SIGTERM', () => { bot.stop('SIGTERM'); console.log('🛑 Bot stopped'); });
