class Contacts {
    constructor() {
        this.content = document.createElement('div');
        this.content.classList.add('main_content_wrapper');
    }

    init() {
        let header = document.createElement('h1');
        header.innerHTML = 'Feel free to reach us out!';
        header.classList.add('header_contacts');

        let additional = document.createElement('p');
        additional.innerHTML = `We're working around the clock so you can get help whenever you want!`;
        additional.classList.add('header_contacts_down');

        this.content.appendChild(header);
        this.content.appendChild(additional);

        return this.content;
    }
}

const contacts = new Contacts().init();

export default contacts;