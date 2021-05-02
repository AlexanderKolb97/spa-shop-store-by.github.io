import {nav} from './nav.js';
import {updateCart} from './main.js';

class Header {
    constructor() {
        this.element;
    }

    create() {
        let element = document.createElement('header');
        element.classList.add('header');

        this.element = element;
    }

    init() {
        this.create();

        this.element.appendChild(nav);

        const showMenu = function() {
            document.querySelector('.nav .menu').style.cssText = `
                display: flex;
                flex-direction: column;
                color: red;
            `
        }

        let logo = document.createElement('img');
        logo.setAttribute('src', './img/girl-logo.png');
        logo.classList.add('logo');

        let logoLink = document.createElement('a');
        logoLink.setAttribute('href', '/spa-shop-store-by.github.io/');
        logoLink.classList.add('logo_link');

        let cart = document.createElement('a');
        cart.innerHTML = `
            <img src="../img/cart.png">
        `
        cart.setAttribute('href', "/spa-shop-store-by.github.io/#cart");
        cart.classList.add('cart');

        let cartTotal = document.createElement('span');
        cartTotal.classList.add('cart_total')
        cartTotal.innerHTML = '0.00$';

        this.element.appendChild(cartTotal);
        this.element.appendChild(cart);
        logoLink.appendChild(logo);
        this.element.insertBefore(logoLink, nav);

        

        return this.element;
    }
}

const header = new Header().init();
export {header};
