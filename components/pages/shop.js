import main, {updateCart} from "../main.js";
import { product } from "./product.js";

class Shop {
    constructor() {
        this.content = document.createElement('div');
        this.content.classList.add('main_content_wrapper');
    }

    init() {
        let products = document.createElement('ul');
        products.classList.add('products_list');
        
        let data = localStorage.getItem('data');
        let dataArray = JSON.parse(data);

        dataArray.forEach((elem, index) => {
            let li = document.createElement('li');
            li.id = index + 1;

            let img = document.createElement('img');
            img.setAttribute('src', `${elem.image}`);
            
            let name = document.createElement('div');
            name.classList.add('name');
            name.innerHTML = `${elem.title}`;

            let price = document.createElement('div');
            price.classList.add('price');
            price.innerHTML = `${elem.price}$`;

            let description = document.createElement('div');
            description.style.display = 'none';
            description.classList.add('description');
            description.innerHTML = `${elem.description}`;

            let btnWrapper = document.createElement('div');
            btnWrapper.classList.add('btn_wrapper');

            let btnCart = document.createElement('button');
            btnCart.classList.add('cart_btn');
            btnCart.classList.add('hide');
            btnCart.innerHTML = 'ADD TO CART';

            let content = document.createElement('div');
            content.classList.add('prod_content');

            content.appendChild(img);
            content.appendChild(name);
            content.appendChild(price);
            content.appendChild(description);
            btnWrapper.appendChild(btnCart);

            li.appendChild(content);
            li.appendChild(btnWrapper);

            products.appendChild(li);
        });

        this.content.appendChild(products);

        let section = document.createElement('div');
        section.classList.add('section_clothes');
        section.innerHTML = 'Clothes';

        this.content.insertBefore(section, products);

        let prodList = products.querySelectorAll('li');

        const showBtnCart = function() {
            let btnCart = this.querySelector('.cart_btn');
            if(btnCart.classList.contains('hide')) {
                btnCart.classList.remove('hide');
                btnCart.classList.add('show');
            }
        }

        const hideBtnCart = function() {
            let btnCart = this.querySelector('.cart_btn');
            if(btnCart.classList.contains('show')) {
                btnCart.classList.remove('show');
                btnCart.classList.add('hide');
            }
        }

        prodList.forEach(function(li, index) {
            li.addEventListener('mouseenter', showBtnCart);
            li.addEventListener('mouseleave', hideBtnCart); 
        })

        prodList.forEach((product, index) => {
            product = product.querySelector('.prod_content');
            product.addEventListener('click', function() {
                location.hash = `product/${this.closest('li').id}`;
            })
        })

        let cartProducts = [];
        
        let cartBtns = products.querySelectorAll('.cart_btn');
        cartBtns.forEach(btn => {
            btn.addEventListener('click', function() {

                let value;

                let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + 'data'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                value = matches ? decodeURIComponent(matches[1]) : undefined;

                if(value && value.length > 0) {
                    value = JSON.parse(value);
                    console.log(value)
                    cartProducts = cartProducts.concat(value);
                }
                
                console.log(cartProducts)

                let li = this.closest('li');

                let id = li.id;

                cartProducts.push(id);

                console.log(cartProducts)

                let cart = JSON.stringify(cartProducts);
                document.cookie = `data=${cart}`;
                cartProducts = [];
                updateCart()
                
            })
        })
        
        return this.content;
    }

}

const shop = new Shop().init();
export default shop;


