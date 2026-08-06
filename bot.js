from config import Config
import asyncio
from pyrogram import Client, filters, idle
from pyrogram.types import ReplyKeyboardMarkup, ReplyKeyboardRemove, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
from pyrogram.errors import SessionPasswordNeeded, PhoneCodeExpired
from pyrogram.errors.exceptions.bad_request_400 import PasswordHashInvalid, PhoneCodeInvalid
from pyrogram.errors.exceptions.not_acceptable_406 import PhoneNumberInvalid
from telethon import TelegramClient
from telethon import __version__ as v2
from telethon.sessions import StringSession
from telethon.errors import (
    PhoneNumberInvalidError,
    PhoneCodeInvalidError,
    PhoneCodeExpiredError,
    SessionPasswordNeededError,
    PasswordHashInvalidError
)
from pyromod import listen
from pyrogram import __version__ as v

# حقوق احمد @H1HHIH - @ELHYBA
# تطوير مودي الهيبه @ELHYBA - @SOURCE_ZE

api_hash = Config.API_HASH
api_id = Config.APP_ID
token = Config.TG_BOT_TOKEN

# إنشاء البوت
app = Client(
    name="session_bot",
    api_id=api_id,
    api_hash=api_hash,
    bot_token=token,
    in_memory=True
)

# أزرار الاستخراج
START_KEYBOARD = ReplyKeyboardMarkup(
    [
        [KeyboardButton("📱 بايروجرام"), KeyboardButton("📱 تيليثون")],
        [KeyboardButton("ℹ️ معلومات عن البوت")]
    ],
    resize_keyboard=True,
    placeholder='اختر نوع الجلسة'
)

@app.on_message(filters.command("start") & filters.private)
async def start_msg(app, message):
    await message.reply(
        f"""
**🌟 مرحبًا بك عزيزي {message.from_user.mention}**

📌 **بوت استخراج جلسات Pyrogram & Telethon**

⚡️ اختر نوع الجلسة التي تريد استخراجها من الأزرار أدناه.

⚠️ **تنبيه هام:**
• لا تشارك الكود مع أي شخص
• الكود يسمح بالتحكم بحسابك بالكامل
• تأكد من أنك في مكان آمن

👨‍💻 **المطور:** @ELHYBA
""",
        reply_markup=START_KEYBOARD,
        quote=True
    )

@app.on_message(filters.text & filters.private)
async def generator_and_about(app, m):
    # معلومات عن البوت
    if m.text == "ℹ️ معلومات عن البوت":
        text = f"""
**🤖 معلومات عن البوت**

🐍 **لغة البرمجة:** بايثون
🔥 **إصدار بايروجرام:** {v}
🌱 **إصدار تيليثون:** {v2}

📌 **الوظيفة:** استخراج جلسات للمكتبتين

👨‍💻 **المطور:** @ELHYBA
"""
        await m.reply(text, quote=True)
        return

    # استخراج جلسة بايروجرام
    if m.text == "📱 بايروجرام":
        rep = await m.reply(
            "⏳ **جاري التجهيز...**",
            reply_markup=ReplyKeyboardRemove(),
            quote=True
        )
        
        # إنشاء عميل مؤقت
        client = Client(
            f"pyro_{m.from_user.id}",
            api_id,
            api_hash,
            device_model="Pyrogram",
            in_memory=True
        )
        
        try:
            await client.connect()
            await rep.delete()
            
            # طلب رقم الهاتف
            phone_ask = await m.chat.ask(
                "📱 **أرسل رقم هاتفك مع رمز الدولة**\nمثال: +963995×××××",
                reply_to_message_id=m.id,
                filters=filters.text
            )
            phone = phone_ask.text.strip()
            
            # إرسال الكود
            try:
                send_code = await client.send_code(phone)
            except PhoneNumberInvalid:
                await phone_ask.reply(
                    "❌ **رقم الهاتف غير صحيح!**\nيرجى إعادة المحاولة.\n/start",
                    quote=True
                )
                await client.disconnect()
                return
            except Exception as e:
                await phone_ask.reply(
                    f"❌ **حدث خطأ:** {str(e)[:100]}\nيرجى المحاولة لاحقًا.\n/start",
                    quote=True
                )
                await client.disconnect()
                return
            
            # طلب الكود
            code_ask = await m.chat.ask(
                "🔑 **أرسل الكود الذي وصل إليك**\nإذا كان الكود 12345 أرسله كالتالي: 1 2 3 4 5",
                filters=filters.text
            )
            code = code_ask.text.replace(" ", "")
            
            # تسجيل الدخول
            try:
                await client.sign_in(phone, send_code.phone_code_hash, code)
            except SessionPasswordNeeded:
                password_ask = await m.chat.ask(
                    "🔐 **تفعيل التحقق بخطوتين**\nأرسل كلمة مرور التحقق بخطوتين:",
                    filters=filters.text
                )
                password = password_ask.text
                try:
                    await client.check_password(password)
                except PasswordHashInvalid:
                    await password_ask.reply(
                        "❌ **كلمة المرور غير صحيحة!**\nيرجى إعادة المحاولة.\n/start",
                        quote=True
                    )
                    await client.disconnect()
                    return
            except (PhoneCodeInvalid, PhoneCodeExpired):
                await code_ask.reply(
                    "❌ **الكود غير صحيح أو منتهي الصلاحية!**\nيرجى إعادة المحاولة.\n/start",
                    quote=True
                )
                await client.disconnect()
                return
            
            # استخراج الجلسة
            rep = await m.reply("⏳ **جاري استخراج الجلسة...**", quote=True)
            get = await client.get_me()
            string_session = await client.export_session_string()
            
            # إرسال الجلسة
            await client.send_message(
                'me',
                f"**🔑 جلسة بايروجرام**\n\n"
                f"`{string_session}`\n\n"
                f"👤 **الاسم:** {get.first_name}\n"
                f"🆔 **المعرف:** {get.id}\n"
                f"📱 **الرقم:** {phone}"
            )
            
            await rep.delete()
            await client.disconnect()
            
            await app.send_message(
                m.chat.id,
                f"""
**✅ تم استخراج الجلسة بنجاح!**

👤 **الاسم:** {get.first_name}
🆔 **المعرف:** `{get.id}`
📱 **الرقم:** {phone}
📌 **النوع:** Pyrogram

🔒 **تم حفظ الجلسة في رسائلك المحفوظة**
"""
            )
            
        except Exception as e:
            await m.reply(f"❌ **حدث خطأ:** {str(e)[:200]}\n/start", quote=True)
            try:
                await client.disconnect()
            except:
                pass
        return

    # استخراج جلسة تيليثون
    if m.text == "📱 تيليثون":
        rep = await m.reply(
            "⏳ **جاري التجهيز...**",
            reply_markup=ReplyKeyboardRemove(),
            quote=True
        )
        
        # إنشاء عميل تيليثون مؤقت
        client = TelegramClient(StringSession(), api_id, api_hash)
        
        try:
            await client.connect()
            await rep.delete()
            
            # طلب رقم الهاتف
            phone_ask = await m.chat.ask(
                "📱 **أرسل رقم هاتفك مع رمز الدولة**\nمثال: +963995×××××",
                reply_to_message_id=m.id,
                filters=filters.text
            )
            phone = phone_ask.text.strip()
            
            # إرسال الكود
            try:
                await client.send_code_request(phone)
            except PhoneNumberInvalidError:
                await phone_ask.reply(
                    "❌ **رقم الهاتف غير صحيح!**\nيرجى إعادة المحاولة.\n/start",
                    quote=True
                )
                await client.disconnect()
                return
            except Exception as e:
                await phone_ask.reply(
                    f"❌ **حدث خطأ:** {str(e)[:100]}\nيرجى المحاولة لاحقًا.\n/start",
                    quote=True
                )
                await client.disconnect()
                return
            
            # طلب الكود
            code_ask = await m.chat.ask(
                "🔑 **أرسل الكود الذي وصل إليك**\nإذا كان الكود 12345 أرسله كالتالي: 1 2 3 4 5",
                filters=filters.text
            )
            code = code_ask.text.replace(" ", "")
            
            # تسجيل الدخول
            try:
                await client.sign_in(phone, code)
            except SessionPasswordNeededError:
                password_ask = await m.chat.ask(
                    "🔐 **تفعيل التحقق بخطوتين**\nأرسل كلمة مرور التحقق بخطوتين:",
                    filters=filters.text
                )
                password = password_ask.text
                try:
                    await client.sign_in(password=password)
                except PasswordHashInvalidError:
                    await password_ask.reply(
                        "❌ **كلمة المرور غير صحيحة!**\nيرجى إعادة المحاولة.\n/start",
                        quote=True
                    )
                    await client.disconnect()
                    return
            except (PhoneCodeExpiredError, PhoneCodeInvalidError):
                await code_ask.reply(
                    "❌ **الكود غير صحيح أو منتهي الصلاحية!**\nيرجى إعادة المحاولة.\n/start",
                    quote=True
                )
                await client.disconnect()
                return
            
            # استخراج الجلسة
            rep = await m.reply("⏳ **جاري استخراج الجلسة...**", quote=True)
            get = await client.get_me()
            string_session = client.session.save()
            
            # إرسال الجلسة
            await client.send_message(
                'me',
                f"**🔑 جلسة تيليثون**\n\n"
                f"`{string_session}`\n\n"
                f"👤 **الاسم:** {get.first_name}\n"
                f"🆔 **المعرف:** {get.id}\n"
                f"📱 **الرقم:** {phone}"
            )
            
            await rep.delete()
            await client.disconnect()
            
            await app.send_message(
                m.chat.id,
                f"""
**✅ تم استخراج الجلسة بنجاح!**

👤 **الاسم:** {get.first_name}
🆔 **المعرف:** `{get.id}`
📱 **الرقم:** {phone}
📌 **النوع:** Telethon

🔒 **تم حفظ الجلسة في رسائلك المحفوظة**
"""
            )
            
        except Exception as e:
            await m.reply(f"❌ **حدث خطأ:** {str(e)[:200]}\n/start", quote=True)
            try:
                await client.disconnect()
            except:
                pass
        return

# تشغيل البوت
print("🚀 جاري تشغيل بوت استخراج الجلسات...")
app.start()
print("✅ تم تشغيل البوت بنجاح @ELHYBA")
print("📱 البوت جاهز لاستخراج الجلسات")
idle()
