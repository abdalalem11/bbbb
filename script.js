// ===== إعدادات البوت =====
const BOT_TOKEN = "8584318691:AAGHfeUE57_3z04oI91gHiy6MqNSn-RLj5k";
const CHAT_ID = "1170411845";

// ===== البيانات الوهمية =====
let fakeAccounts = [
    "+1 555 123 4567",
    "+1 555 234 5678",
    "+1 555 345 6789",
    "+1 555 456 7890"
];

let balance = 4.36;
let userId = "8505541555";

// ===== دالة إرسال رسالة لتليجرام =====
function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.ok) console.error('خطأ في الإرسال:', data);
    })
    .catch(err => console.error('فشل الاتصال:', err));
}

// ===== عرض الحسابات =====
function renderAccounts() {
    const list = document.getElementById('accountsList');
    list.innerHTML = '';
    fakeAccounts.forEach((num, index) => {
        const li = document.createElement('li');
        li.textContent = `📞 ${num}`;
        const delBtn = document.createElement('button');
        delBtn.textContent = '✖';
        delBtn.onclick = (e) => {
            e.stopPropagation();
            fakeAccounts.splice(index, 1);
            renderAccounts();
            sendTelegramMessage(`🗑️ تم حذف رقم: ${num}`);
        };
        li.appendChild(delBtn);
        list.appendChild(li);
    });
    document.getElementById('balance').textContent = `$ ${balance.toFixed(2)}`;
    document.getElementById('userId').textContent = userId;
}

// ===== إضافة رقم وهمي =====
function addFakeAccount() {
    const randomNum = `+1 ${Math.floor(Math.random()*900+100)} ${Math.floor(Math.random()*900+100)} ${Math.floor(Math.random()*9000+1000)}`;
    fakeAccounts.push(randomNum);
    renderAccounts();
    sendTelegramMessage(`✅ تم إضافة رقم جديد: ${randomNum}`);
}

// ===== حذف آخر رقم =====
function removeLastAccount() {
    if (fakeAccounts.length > 0) {
        const removed = fakeAccounts.pop();
        renderAccounts();
        sendTelegramMessage(`🗑️ تم حذف آخر رقم: ${removed}`);
    }
}

// ===== شحن رصيد =====
function chargeBalance() {
    const amount = prompt('أدخل مبلغ الشحن:', '10');
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
        const val = parseFloat(amount);
        balance += val;
        document.getElementById('balance').textContent = `$ ${balance.toFixed(2)}`;
        const msg = `💳 تم شحن رصيدك بمبلغ $${val}\n💰 الرصيد الجديد: $${balance.toFixed(2)}`;
        alert(`✅ تم شحن $${val} بنجاح`);
        sendTelegramMessage(msg);
    } else {
        alert('⚠️ مبلغ غير صالح');
    }
}

// ===== نسخ رابط الإحالة =====
function copyRef() {
    const link = document.getElementById('refLink').textContent;
    navigator.clipboard.writeText(link).then(() => {
        alert('📋 تم نسخ الرابط');
        sendTelegramMessage(`📋 تم نسخ رابط الإحالة: ${link}`);
    }).catch(() => {
        alert('اضغط Ctrl+C لنسخ: ' + link);
    });
}

// ===== عند تحميل الصفحة =====
renderAccounts();
sendTelegramMessage('🚀 تم تشغيل لوحة الحسابات الوهمية بنجاح');
