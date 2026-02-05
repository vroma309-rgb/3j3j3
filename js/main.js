// ======================
// Дані товарів
// ======================
const products = [
    {id:1, name:"Помідор Черрі", category:"vegetables", price:30, image:"assets/images/tomato.jpg", desc:"Смачні черрі, вирощено органічно"},
    {id:2, name:"Базилік", category:"greens", price:20, image:"assets/images/basil.jpg", desc:"Ароматна зелень для ваших страв"},
    {id:3, name:"Троянда Червона", category:"flowers", price:50, image:"assets/images/rose.jpg", desc:"Красиві червоні троянди"},
    {id:4, name:"Полуниця", category:"berries", price:40, image:"assets/images/strawberry.jpg", desc:"Соковита садова полуниця"}
];

// ======================
// Відображення категорій / товарів
// ======================
function renderProducts(filterCategory = null){
    const container = document.querySelector('.product-grid');
    if(!container) return;
    container.innerHTML = '';
    const filtered = filterCategory ? products.filter(p => p.category === filterCategory) : products;
    filtered.forEach(product=>{
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${product.desc}</p>
                <div class="price">${product.price} грн</div>
                <button onclick="addToCart(${product.id})">Додати в корзину</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// ======================
// Корзина
// ======================
function getCart(){ return JSON.parse(localStorage.getItem('cart')) || []; }
function saveCart(cart){ localStorage.setItem('cart', JSON.stringify(cart)); }

function addToCart(id){
    let cart = getCart();
    const product = products.find(p=>p.id===id);
    const exists = cart.find(c=>c.id===id);
    if(exists){ exists.qty++; } else { cart.push({...product, qty:1}); }
    saveCart(cart);
    alert(`${product.name} додано в корзину`);
}

// ======================
// Ініціалізація
// ======================
document.addEventListener('DOMContentLoaded', ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const cat = urlParams.get('cat');
    renderProducts(cat);
});
