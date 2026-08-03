// قاعدة أرقام وهمية أولية
let fakeAccounts = [
    "+1 555 123 4567",
    "+1 555 234 5678",
    "+1 555 345 6789",
    "+1 555 456 7890"
];

// رصيد وهمي
let balance = 4.36;

// عرض الأرقام
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
        };
        li.appendChild(delBtn);
        list.appendChild(li);
    });
    document.getElementById('balance').textContent = `$ ${balance.toFixed(2)}`;
}

// إضافة رقم وهمي عشوائي
function addFakeAccount() {
    const randomNum = `+1 ${Math.floor(Math.random()*900+100)} ${Math.floor(Math.random()*900+100)} ${Math.floor(Math.random()*9000+1000)}`;
    fakeAccounts.push(randomNum);
    renderAccounts();
}

// حذف آخر رقم
function removeLastAccount() {
    if (fakeAccounts.length > 0) {
        fakeAccounts.pop();
        renderAccounts();
    }
}

// شحن رصيد وهمي
function chargeBalance() {
    const amount = prompt('أدخل مبلغ الشحن (وهمي):', '10');
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
        balance += parseFloat(amount);
        document.getElementById('balance').textContent = `$ ${balance.toFixed(2)}`;
        alert(`✅ تم شحن $${amount} بنجاح (رصيد وهمي)`);
    } else {
        alert('⚠️ مبلغ غير صالح');
    }
}

// نسخ رابط الإحالة
function copyRef() {
    const link = document.getElementById('refLink').textContent;
    navigator.clipboard.writeText(link).then(() => {
        alert('📋 تم نسخ الرابط');
    }).catch(() => {
        alert('اضغط Ctrl+C لنسخ: ' + link);
    });
}

// تشغيل العرض
renderAccounts();
