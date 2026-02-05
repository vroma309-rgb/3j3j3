// ======================
// Telegram Bot
// ======================
const TG_TOKEN = "8160091591:AAHObpoUDVIA2aQmJA7DpPWVb8qPGpwkAA0";
const CHAT_ID = "5047592912";

// ======================
// Дані корзини
// ======================
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ======================
// Відображення корзини
// ======================
function renderCart() {
    const cartContainer = document.querySelector('.cart-container');
    if (!cartContainer) return;
    let cart = getCart();
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Корзина порожня</p>';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="details">
                <h5>${item.name}</h5>
                <div class="quantity">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <input type="number" value="${item.qty}" min="1" onchange="updateQtyInput(${item.id}, this.value)">
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
                <p class="price">${item.price * item.qty} грн</p>
            </div>
            <button class="remove" onclick="removeItem(${item.id})">Видалити</button>
        `;
        cartContainer.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('cart-total');
    totalDiv.innerHTML = `<strong>Всього: ${total} грн</strong>`;
    cartContainer.appendChild(totalDiv);
}

// ======================
// Зміна кількості
// ======================
function changeQty(id, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty < 1) item.qty = 1;
        saveCart(cart);
        renderCart();
    }
}

function updateQtyInput(id, value) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty = parseInt(value);
        if(item.qty < 1) item.qty = 1;
        saveCart(cart);
        renderCart();
    }
}

// ======================
// Видалення товару
// ======================
function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
}

// ======================
// Відправка замовлення в Telegram
// ======================
function sendOrder() {
    const phone = document.querySelector('#phone').value;
    if (!phone) {
        alert('Введіть номер телефону');
        return;
    }

    const cart = getCart();
    if (cart.length === 0) {
        alert('Корзина порожня');
        return;
    }

    let message = `📦 Нове замовлення:\n📱 Телефон: ${phone}\n\n`;
    cart.forEach(i => {
        message += `• ${i.name} x${i.qty} = ${i.price * i.qty} грн\n`;
    });
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    message += `\n💰 Сума: ${total} грн`;

    fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message })
    })
    .then(res => res.json())
    .then(data => {
        if (data.ok) {
            alert('✅ Замовлення надіслано!');
            localStorage.removeItem('cart');
            renderCart();
        } else {
            alert('❌ Помилка при відправці замовлення');
            console.error(data);
        }
    })
    .catch(err => {
        alert('❌ Помилка при відправці замовлення');
        console.error(err);
    });
}

// ======================
// Ініціалізація
// ======================
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
