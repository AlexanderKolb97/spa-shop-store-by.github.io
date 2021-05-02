class Nav {
    constructor() {
        this.element;
    }

    create() {
        let element = document.createElement('nav');
        element.classList.add('nav');

        this.element = element;
    }

    init() {
        this.create();

        let burger = document.createElement('span');
        burger.classList.add('burger');
        burger.innerHTML = `
            <i class="icon"></i>
            <label for="checkbox"></label>
        `;

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'checkbox');
        checkbox.setAttribute('checked', 'checked');

        let menu = document.createElement('ul');
        menu.classList.add('menu');

        let menuHome = document.createElement('li');
        menuHome.innerHTML = `
            <a href="/">Home</label>
        `;
        let menuShop = document.createElement('li');
        menuShop.innerHTML = `
            <a href="/#shop">Shop</>
        `;
        let menuContacts = document.createElement('li');
        menuContacts.innerHTML = `
            <a href="/#contacts">Contacts</>
        `;

        menu.appendChild(menuHome);
        menu.appendChild(menuShop);
        menu.appendChild(menuContacts);

        this.element.appendChild(burger);
        this.element.appendChild(checkbox);
        this.element.appendChild(menu);

        return this.element;
    }
}

const nav = new Nav().init();
export {nav};
