const contProducts = document.getElementById('container');
const modal = document.getElementById('modal');
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