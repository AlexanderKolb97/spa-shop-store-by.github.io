class Footer {
    constructor() {
        this.element;
    }

    create() {
        let element = document.createElement('footer');
        element.classList.add('footer');

        this.element = element;
    }

    init() {
        this.create();

        let logo = document.createElement('img');
        logo.setAttribute('src', './img/girl-logo.png');
        logo.classList.add('logo');

        let info = document.createElement('ul');
        let address = document.createElement('li');
        address.classList.add('footer_address');
        address.innerHTML = 'Belarus, Minsk, Prititskaha 154a';
        let phone = document.createElement('li');
        phone.classList.add('footer_phone');
        phone.innerHTML = '+375 (29) 777-88-99';
        let email = document.createElement('li');
        email.classList.add('footer_email');
        email.innerHTML = 'clothes@mail.com';

        info.appendChild(address);
        info.appendChild(phone);
        info.appendChild(email);
        this.element.appendChild(logo);
        this.element.appendChild(info);

        return this.element;
    }
}

const footer = new Footer().init();
export {footer};
