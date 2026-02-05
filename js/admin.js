let products = JSON.parse(localStorage.getItem('products')) || [
    {id:1, name:"Помідор Черрі", category:"vegetables", price:30, image:"assets/images/tomato.jpg", desc:"Смачні черрі, вирощено органічно"},
    {id:2, name:"Базилік", category:"greens", price:20, image:"assets/images/basil.jpg", desc:"Ароматна зелень для ваших страв"}
];

function renderAdmin(){
    const tbody = document.querySelector('#admin-table tbody');
    if(!tbody) return;
    tbody.innerHTML = '';
    products.forEach(p=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>${p.price}</td>
            <td>
                <button class="edit" onclick="editProduct(${p.id})">Редагувати</button>
                <button class="delete" onclick="deleteProduct(${p.id})">Видалити</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    localStorage.setItem('products', JSON.stringify(products));
}

function addProduct(){ 
    const name = prompt('Назва товару'); 
    const category = prompt('Категорія'); 
    const price = parseFloat(prompt('Ціна')); 
    const image = prompt('Шлях до зображення'); 
    const desc = prompt('Опис'); 
    const id = Date.now();
    products.push({id,name,category,price,image,desc});
    renderAdmin();
}

function editProduct(id){
    const p = products.find(p=>p.id===id);
    p.name = prompt('Назва товару', p.name);
    p.category = prompt('Категорія', p.category);
    p.price = parseFloat(prompt('Ціна', p.price));
    p.image = prompt('Шлях до зображення', p.image);
    p.desc = prompt('Опис', p.desc);
    renderAdmin();
}

function deleteProduct(id){ products = products.filter(p=>p.id!==id); renderAdmin(); }

document.addEventListener('DOMContentLoaded', ()=>{ renderAdmin(); });
