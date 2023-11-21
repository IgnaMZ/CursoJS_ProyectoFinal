const contProducts = document.getElementById('container');

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

renderProducts();