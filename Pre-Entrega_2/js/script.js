const contProducts = document.getElementById('container');
const modal = document.getElementById('modal');
const itemsInCart = document.getElementById('itemsNum');
const cartLabel = document.querySelector('.cartContainer');
const cItems = document.querySelector('.mBody');

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
    });

    contProducts.addEventListener('click', addItem);
}

function addItem(item) {
    //console.log('Se hizo click en la aplicación');
    item.preventDefault();
    if (item.target.classList.contains('add-to-cart')) {
        const addedItem = item.target.parentElement;
        //console.log(addedItem);
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
    showCart();
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
                                <a href="#" class="deleteItem" id="${id}">[ x ]</a>
                            `;
        cItems.appendChild(rowItem);
    });
    itemNumber();
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

const renderProducts = () => {
    products.forEach((product) => {
        const itemCard = document.createElement('article');
        itemCard.classList.add('card');
        itemCard.innerHTML = `
                        <img src="./img/${product.img}" alt="${product.name}"/>
                        <h4>${product.name}</h4>
                        <p>$${product.price}</p>
                        <a id="${product.id}" class="add-to-cart" href="#">AGREGAR AL CARRITO</a>
                        `;

                        contProducts.append(itemCard);
    })  
};




// function openCart() {
//     modal.style.display = 'block';
// }
// function closeCart() {
//     modal.style.display = 'none';
// }
// const cartButton = document.getElementById('cart');
// cartButton.addEventListener('click', openCart())

// const closeButton = document.getElementById('close');
// closeButton.addEventListener('click', closeCart())