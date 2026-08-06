from config import Config
import asyncio
from pyrogram import Client, filters, idle
from pyrogram.types import (
    ReplyKeyboardMarkup, 
    ReplyKeyboardRemove, 
    KeyboardButton,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)
from pyrogram import __version__ as v
from telethon import __version__ as v2

# التوكين الجديد
api_hash = Config.API_HASH
api_id = Config.APP_ID
token = "8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI"

app = Client(
    name="contact_bot",
    api_id=api_id,
    api_hash=api_hash,
    bot_token=token,
    in_memory=True
)

# Main Menu Keyboard
MAIN_KEYBOARD = ReplyKeyboardMarkup(
    [
        [KeyboardButton("👨‍💻 تواصل مع المطور")],
        [KeyboardButton("ℹ️ معلومات عن البوت")]
    ],
    resize_keyboard=True,
    placeholder='اختر الخدمة المطلوبة'
)

# Developer Contact Keyboard
DEV_KEYBOARD = InlineKeyboardMarkup(
    [
        [InlineKeyboardButton("👨‍💻 تواصل مع المطور", url="https://t.me/u_t_r")],
        [InlineKeyboardButton("📢 قناة الدعم", url="https://t.me/u_t_r2")],
        [InlineKeyboardButton("💬 مجموعة الدعم", url="https://t.me/u_t_r")],
        [InlineKeyboardButton("🔙 رجوع", callback_data="back_to_main")]
    ]
)

@app.on_message(filters.command("start") & filters.private)
async def start_msg(app, message):
    await message.reply(
        f"""
✨ **مرحباً بك عزيزي {message.from_user.mention}** ✨

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

🤖 **بوت التواصل مع المطور**

📌 **خدمات البوت:**
• 📱 التواصل المباشر مع المطور
• 💡 الحصول على الدعم الفني
• 🛠️ طلب بوتات مخصصة
• 📊 استشارات تقنية

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

💫 **كيفية الاستخدام:**
1️⃣ اضغط على زر "تواصل مع المطور"
2️⃣ اختر طريقة التواصل المناسبة
3️⃣ اكتب رسالتك وسيتم الرد عليك

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

⚡️ **متوفر 24/7** 
📌 **وقت الرد:** خلال 24 ساعة
""",
        reply_markup=MAIN_KEYBOARD,
        quote=True
    )

@app.on_message(filters.text & filters.private)
async def handle_buttons(app, m):
    # About Section
    if m.text == "ℹ️ معلومات عن البوت":
        text = f"""
📊 **معلومات عن البوت**

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

🤖 **الاسم:** بوت التواصل مع المطور
🐍 **لغة البرمجة:** Python 3.11
🔥 **بايروجرام:** v{v}
🌱 **تيليثون:** v{v2}
⚡️ **الحالة:** نشط 🟢

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📌 **الوظائف:**
• التواصل المباشر مع المطور
• الدعم الفني والاستشارات
• طلب تصميم بوتات مخصصة
• حل المشاكل التقنية

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

👨‍💻 **المطور:** @ELHYBA
📢 **قناة الدعم:** @u_t_r2
📱 **للتواصل:** @u_t_r
"""
        await m.reply(text, quote=True, reply_markup=MAIN_KEYBOARD)
        return

    # Developer Section
    if m.text == "👨‍💻 تواصل مع المطور":
        dev_text = f"""
👨‍💻 **المطور**

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

🆔 **المعرف:** @ELHYBA
📌 **الاسم:** ELHYBA
🌐 **المنصة:** Telegram
💼 **المجال:** برمجة البوتات والتطبيقات

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📱 **طرق التواصل:**
• اضغط على زر التواصل أدناه
• ارسال رسالة مباشرة
• الرد خلال 24 ساعة

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

💡 **الخدمات المتوفرة:**
✅ تصميم بوتات تيليجرام
✅ استخراج جلسات
✅ حل مشاكل تقنية
✅ تطوير برمجيات
✅ استشارات برمجية

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📢 **للانضمام لقناة الدعم:** @u_t_r2
💫 **للتواصل اضغط على الزر أدناه**
"""
        await m.reply(dev_text, quote=True, reply_markup=DEV_KEYBOARD)
        return

    # Default response for any other text
    await m.reply(
        """
❓ **عذراً، لم أفهم طلبك**

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📌 **الخيارات المتاحة:**
• 👨‍💻 تواصل مع المطور
• ℹ️ معلومات عن البوت

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

📢 **قناة الدعم:** @u_t_r2
💡 **للتواصل المباشر:** @u_t_r
""",
        reply_markup=MAIN_KEYBOARD,
        quote=True
    )

# Handle callback queries
@app.on_callback_query()
async def handle_callback(app, callback_query):
    if callback_query.data == "back_to_main":
        await callback_query.message.delete()
        await callback_query.message.reply(
            "✨ **تم العودة إلى القائمة الرئيسية** ✨\n\n"
            "📌 اختر الخدمة التي تريدها:",
            reply_markup=MAIN_KEYBOARD
        )
        await callback_query.answer()
    else:
        await callback_query.answer()

print("🚀 جاري تشغيل بوت التواصل مع المطور...")
print("👨‍💻 المطور: @ELHYBA")
print("📢 قناة الدعم: https://t.me/u_t_r2")
print("📱 للتواصل: https://t.me/u_t_r")
print("🤖 توكن البوت: 8909739497:AAHBUGLmeligI-TX3kZKlQ_8nTZK61TKVtI")
app.start()
print("✅ تم تشغيل البوت بنجاح!")
print("📱 البوت جاهز للتواصل")
idle()
