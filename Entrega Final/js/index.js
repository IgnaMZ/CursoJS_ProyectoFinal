// const url = 'https://raw.githubusercontent.com/IgnaMZ/info-and-data/main/products.json?token=GHSAT0AAAAAACLLO3SHSGDZUBIJ72THJARCZLY35MA';
const file = './data/products.json';
const contProducts = document.getElementById('container');
const modal = document.getElementById('modal');
const itemsInCart = document.getElementById('itemsNum');
const cartLabel = document.querySelector('.cartContainer');
const cItems = document.querySelector('.mBody');
const totalPrice = document.getElementById('total');
const cartButton = document.getElementById('cart');
const filterImput = document.getElementById('filter');
const filterBtn = document.getElementById('btnFilter');
const endPurchase = document.getElementById('end-purchase');
const emptyCart = document.getElementById('empty-cart');
const closeButton = document.getElementById('close');

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    width: 300,
    color: 'whitesmoke',
    timer: 3000,
    timerProgresBar: true,
});

let cartItems = [];

class Product {
    constructor(image, name, price, id){
        this.image = image;
        this.name = name;
        this.price = price;
        this.id = id;
        this.quantity = 1;
        this.subtotal = 0;
    }
    obtenerTotal() {
        this.subtotal = this.price * this.quantity;
    }
}

triggerEvents();

function triggerEvents() {
    document.addEventListener('DOMContentLoaded', () => {
        renderProducts();
        getLocalStorageCart()
        showCart();
    });

    contProducts.addEventListener('click', addItem);
    cItems.addEventListener('click', deleteItem);
    cartButton.addEventListener('click', openCart);
    closeButton.addEventListener('click', closeCart);
    filterBtn.addEventListener('click', filterProducts);
    endPurchase.addEventListener('click', purchaseCompleted);
    emptyCart.addEventListener('click', resetCart);
    
}

function openCart() {
    modal.style.display = 'block';
}
function closeCart() {
    modal.style.display = 'none';
}

function toastAlert(icon, title, bgColor){
    Toast.fire({
        icon: icon,
        title: title,
        background: bgColor,
    });
}

function purchaseCompleted(){
    Swal.fire({
        icon: 'success',
        title: 'Compra finalizada',
        text: 'Su compra ha sido realizada con éxito',
        timerProgresBar: 'true',
        timer: 5000
    });

    resetCartLS();
    getLocalStorageCart()
    showCart();
    closeCart();    
}

//Elimina los productos del carrito.
function resetCart(){
    Swal.fire({
        title: 'Limpiar carrito',
        text: '¿Realmente desea eliminar todos los productos del carrito?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((btnResponse) => {
        if (btnResponse.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Vaciando Carrito',
                text: 'Su carrito de compras ha sido vaciado con éxito',
                timerProgresBar: 'true',
                timer: 5000
            });
            resetCartLS();
            getLocalStorageCart()
            showCart();
            closeCart();

        } else {
            Swal.fire({
                icon: 'info',
                title: 'Compra cancelada',
                text: 'Su compra ha sido cancelada con éxito',
                timerProgresBar: 'true',
                timer: 5000
            });
        }      
    }) 
}

// Eliminamos los productos en Local Stoarge.
function resetCartLS(){
    localStorage.removeItem('localItems');
}

async function filterProducts(){
    const products = await makeRequest(file);
    let filteredProducts, filter;

    filter = filterImput.value.toLowerCase();

    filteredProducts = products.filter((product) => product.name.toLowerCase().includes(filter));

    if(filteredProducts.length > 0){
        cleanUpContainer()
        arrayReview(filteredProducts);

    } else {
        Swal.fire({
            icon: 'info',
            title: 'Sin resultados',
            text: '¡Upps! No hemos encontrado autos para tu búsqueda.',
            confirmButtonText: 'OK',
        });
        console.log('¡Upps! No hemos encontrado autos para tu búsqueda.');

        cleanUpContainer();
        arrayReview(products);
    }
}

function arrayReview(array){
    array.forEach((product) => {
        const itemCard = document.createElement('article');
        itemCard.classList.add('card');
        itemCard.innerHTML = `
                        <img src="./img/${product.img}" alt="${product.name}"/>
                        <h4 class ="p-name">${product.name}</h4>
                        <p class="p-price">$${product.price}</p>
                        <a id="${product.id}" class="add-to-cart" href="#">AGREGAR AL CARRITO</a>
                        `;

                        contProducts.append(itemCard);
    });
}

function cleanUpContainer(){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function getLocalStorageCart() {
    cartItems = JSON.parse(localStorage.getItem('localItems')) || [];    
} 

function deleteItem(item) { 
    if (item.target.classList.contains('deleteItem')) {
        const itemId = parseInt(item.target.getAttribute('id'));
        // console.log(itemId);

        toastAlert('error','Producto eliminado del carrito.', '#ff3333');
        cartItems = cartItems.filter((item) => item.id !== itemId);
        saveLocal();
        showCart();
    }
}

function addItem(item) {
    item.preventDefault();
    if (item.target.classList.contains('add-to-cart')) {
        const addedItem = item.target.parentElement;
        //console.log(addedItem);

        toastAlert('success','Producto agregado al carrito.', '#5f9ea0');
        showItemInfo(addedItem);
    }
}

function showItemInfo(product) {
    //console.log(product);
    const productInfo = new Product(
        product.querySelector('img').src, product.querySelector('h4').textContent, Number(product.querySelector('p').textContent.replace('$', '')), parseInt(product.querySelector('a').getAttribute('id')));

        productInfo.obtenerTotal()
        //console.log(productInfo);

        addToCart(productInfo);
}

function addToCart(addItem) {
    // console.log(addItem);
    // console.log(cartItems);

    const inCart = cartItems.some((item) => item.id === addItem.id)

    if (inCart) {
        // Creamos un nuevo array con los productos del carrito actualizado.
        const products = cartItems.map((item) => {
            if (item.id === addItem.id) {
                item.quantity++;
                item.subtotal = item.price * item.quantity;
                // Retornamos el objeto item (cantidad y subtotal actualizados)
                return item;
            } else {
                // Retornamos el producto que estaba en el carrito, pero sin actualizar ya que no coincide con el nuevo producto agregado.
                return item;
            }
        })
        // Reasignamos con el arrat de productos devuelto por el método.
        cartItems = products;
    } else {
        // Agregamos un nuevo producto al carrito
        cartItems.push(addItem);
    }
    console.log(cartItems);
    // Guardamos los productos del carrito en localStorage.
    saveLocal();
    showCart();
}

function saveLocal() {
    localStorage.setItem('localItems', JSON.stringify(cartItems));    
}

function showCart() {
    cleanCart();

    cartItems.forEach((item) => {
        const {image, name, price, quantity, subtotal, id} = item;

        const rowItem = document.createElement('div');
        rowItem.classList.add('cartItemRow');
        rowItem.innerHTML = `
                                <img src="${image}" width="100">
                                <p>${name}</p>
                                <p>${price}</p>
                                <p>${quantity}</p>
                                <p>${subtotal}</p>
                                <a href="#" class="deleteItem" id="${id}">[x]</a>
                            `;
        cItems.appendChild(rowItem);
    });
    itemNumber();
    calcularTotal();
}

function calcularTotal() {
    let total = cartItems.reduce((totalPrice, item) => totalPrice + item.subtotal, 0);
    totalPrice.innerHTML = `Total a pagar: $ ${total} `;
}

function itemNumber() {
    let counter;

    if (cartItems.length > 0) {
        cartLabel.style.display = 'flex';
        cartLabel.style.alignItems = 'center';
        itemsInCart.style.display = 'flex';
        counter = cartItems.reduce((number, item) => number + item.quantity, 0);
        itemsInCart.innerText = `${counter}`;        
    } else {
        cartLabel.style.display = 'block';
        itemsInCart.style.display = 'none';
    }
}

function cleanCart() {
    while (cItems.firstChild) {
        cItems.removeChild(cItems.firstChild);        
    }
}

async function renderProducts() {
    // const products = await makeRequest(url);
    const products = await makeRequest(file);
    arrayReview(products);  
};

async function makeRequest(info) {
    try {
        const response = await fetch(info);
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`)            
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);        
    }
    // finally {
    //     console.log('La petición ha finalizado.')
    // }
}





