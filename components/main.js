import {routing} from './routing.js';
import {product} from './pages/product.js';
import {cart} from './pages/cart.js';

class Main {
    constructor() {
        this.element;
    }

    create() {
        let element = document.createElement('main');
        element.classList.add('main');

        this.element = element;
    }

    page(name) {
        import(`./pages/${name}.js`)
        .then(module => {
            if(name == 'product') {
                let prod = product();
                this.element.innerHTML = '';
                this.element.appendChild(prod);
                return;
            } 
            
            if(name == 'cart') {
                let cartList = cart();
                this.element.innerHTML = '';
                this.element.appendChild(cartList);
            } else {
                this.element.innerHTML = '';
                this.element.appendChild(module.default);
            }
        });
    }

    init() {
        this.create();

        let name = routing();

        if (!name || name == 'home') this.page(name);

        window.addEventListener('hashchange', _ => {
            name = routing();
            if (name) this.page(name);
        });

        return this.element;
    }
    
}

export const updateCart = function() {
    let value = '';
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + 'data'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      value = matches ? decodeURIComponent(matches[1]) : undefined;
      if(value) value = JSON.parse(value);

      let prodList = localStorage.getItem('data');
      prodList = JSON.parse(prodList);

      let sum = 0;
      
      prodList.forEach((prod, index) => {
        
        if(value && value.indexOf(String(prod.id)) != -1) sum += prod.price;
          
      })

      let cartTotal = document.querySelector('.cart_total');
      if(value) cartTotal.innerHTML = `${Math.round(sum)}$ <span class="cart_subtotal">${value.length}</span>`;

}

const main = new Main().init();
export default main;
