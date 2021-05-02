import {header} from './header.js';
import {footer} from './footer.js';
import {updateCart} from './main.js';
class App {
    constructor() {
        this.element;
    }

    create() {
        let app = document.createElement('div');
        app.classList.add('app');

        this.element = app;
    }

    render() {
        if(!this.element) return;
        document.body.appendChild(this.element);
    }

    init() {
        this.getData().then((data) => {
            localStorage.setItem('data', data);

            document.head.innerHTML = `
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>shop-store.by</title>
            <link rel="stylesheet" href="./css/style.css">
            <link rel="stylesheet" href="./css/media.css">
            <link rel="stylesheet" href="./css/header.css">
            <link rel="stylesheet" href="./css/nav.css">
            <link rel="stylesheet" href="./css/main.css">
            <link rel="stylesheet" href="./css/footer.css">
            <link rel="stylesheet" href="./css/footer.css">
            <link rel="stylesheet" href="./css/product.css">
            <link rel="stylesheet" href="./css/cart.css">
            `;
            
            this.create();



            import('./main.js')
            .then(module => {
                this.element.appendChild(header);
                this.element.appendChild(module.default);
                this.element.appendChild(footer);
                updateCart()
            }) 


            this.render();

        })

    }

    getData() {
        return fetch('https://fakestoreapi.com/products')
        .then(response => response.text());
    }
}

export default new App().init();

