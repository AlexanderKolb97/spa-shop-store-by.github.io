import {updateCart} from "../main.js";

class Cart {
    constructor() {
        this.content = document.createElement('div');
        this.content.classList.add('main_content_wrapper');
    }

    create() {
        let element = document.createElement('div');
        element.classList.add('cart');
    }

    init() {
        this.create();

        let section = document.createElement('div');
        section.classList.add('section_cart');
        section.innerHTML = 'Cart';

        this.content.appendChild(section);

        let panel = document.createElement('div');
        panel.classList.add('upper_list_panel');
        panel.innerHTML = `
            <span class="panel_product">Product</span>
            <span class="panel_price">Price</span>
            <span class="panel_quantity">Quantity</span>
            <span class="panel_subtotal">Subtotal</span>
        `

        this.content.appendChild(panel);

        let prodList = JSON.parse(localStorage.getItem('data'));

        let sum = 0;

        // add/reduce quantity of an item

        const priceUp = function() {
            let product = this.closest('li'),
                price = parseInt(product.querySelector('.price').innerHTML),
                quantity = product.querySelector('.quantity_field'),
                totalPrice = product.querySelector('.total_price');

            sum = quantity.innerHTML;
            sum++;

            quantity.innerHTML = `${sum}`;  
            totalPrice.innerHTML = `${sum * price}$`;  
        }

        const priceDown = function() {
            let product = this.closest('li'),
                price = parseInt(product.querySelector('.price').innerHTML),
                quantity = product.querySelector('.quantity_field'),
                totalPrice = product.querySelector('.total_price');

            sum = quantity.innerHTML;
            sum--;

            if(sum < 1) return;

            quantity.innerHTML = `${sum}`;  
            totalPrice.innerHTML = `${sum * price}$`;  
        }

        //

        // remove an item from cart

        const removeProduct = function() {
            let id = this.closest('li').dataset.id;

            let value;

            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + 'data'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                value = matches ? decodeURIComponent(matches[1]) : undefined;
            
            value = JSON.parse(value);
            for(var key in value) {

            if(value[key] == id) {
                let test = document.querySelector(`[data-id="${id}"]`).remove();
                value.splice(key, 1);
                value = JSON.stringify(value);
                
                document.cookie = `data=${value}`;
            }

            }

            updateCart();
        }

        //

        let value;

        // getting items' id from cookie

        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + 'data'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            value = matches ? decodeURIComponent(matches[1]) : undefined;

        // 

        // logic of showing the cart

        if(value) {
            value = JSON.parse(value);

            let cartList = document.createElement('ul');
            cartList.classList.add('cart_list');

            prodList.forEach((prod, index) => {    
                if(value.indexOf(String(prod.id)) != -1) {
                    let li = document.createElement('li');
                    li.classList.add('cart_list_product');
                    li.dataset.id = prod.id;
                    li.innerHTML = `
                        <button class="close_btn">X</button>
                        <img class="image_cart" src="${prod.image}"/>
                        <div class="name">${prod.title}</div>
                        <div class="price">${prod.price}$</div>
                        <div class="quantity"><div class="quantity_field">1</div><div class="quantity_btns"><button class="plus">+</button><button class="minus">-</button></div></div>
                        <div class="total_price">${prod.price}$</div>
                    `;

                    cartList.appendChild(li);
                    
                }
            })

            this.content.appendChild(cartList)

            let btnsPlus = cartList.querySelectorAll('.plus');
            let btnsMinus = cartList.querySelectorAll('.minus');

            btnsPlus.forEach(btn => {
                btn.addEventListener('click', priceUp);
            })
    
            btnsMinus.forEach(btn => {
                btn.addEventListener('click', priceDown);
            })
    
            let closeBtns = cartList.querySelectorAll('.close_btn');

            closeBtns.forEach(btn => {
                btn.addEventListener('click', removeProduct);
            })

        } else {
            let cartEmpty = document.createElement('h3');
            cartEmpty.classList.add('cart_empty');
            cartEmpty.innerHTML = 'Cart is empty so far...';
            this.content.appendChild(cartEmpty)


        }
        
        // end of cart logic

        return this.content;
    }
}

const cart = function() {
    return new Cart().init();
};

export {cart};


