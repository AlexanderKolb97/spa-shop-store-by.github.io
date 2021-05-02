import main, {updateCart} from "../main.js";
class Product {
    constructor() {
        this.content = document.createElement('div');
        this.content.classList.add('main_content_wrapper');
    }

    init() {
        let main = document.querySelector('.main');
        let prodList = main.querySelectorAll('li');

        let matches = location.hash.match(/[0-9]+$/);
        let id = matches[0];

        let product = document.getElementById(id);
        console.log(product)
        
        let productImg = product.querySelector('img').src,
            productName = product.querySelector('.name').innerHTML,
            productPrice = product.querySelector('.price').innerHTML,
            productDescription = product.querySelector('.description').innerHTML;

        let productShow = document.createElement('div');
        productShow.classList.add('product');
        productShow.innerHTML = `
            <img src="${productImg}">
            <div class="name">${productName}</div>
            <button class="to_cart">Add to cart</button>
            <div class="price">${productPrice}</div>
            <div class="description">${productDescription}</div>
        `;

        this.content.appendChild(productShow);

        let addToCart = function() {
            let value = [];

            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + 'data'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
            value = matches ? decodeURIComponent(matches[1]) : undefined;
            
            if(value) {
                value = JSON.parse(value);
                let id = product.id;
                value.push(id);
                value = JSON.stringify(value);
                document.cookie = `data=${value}`;
                updateCart()
            } else {
                let id = product.id;
                console.log(id);
                value.push(id);
                value = JSON.stringify(value);
                document.cookie = `data=${value}`;
                updateCart()
            }
                    
        }

        productShow.querySelector('.to_cart').addEventListener('click', addToCart)
        
        return this.content;
    }
}

const product = function() {
    return new Product().init();
};

export {product};
