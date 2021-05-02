class Home {
    constructor() {
        this.content = document.createElement('div');
        this.content.classList.add('main_content_wrapper');
    }

    init() {
        console.log(location)
        let header = document.createElement('h1');
        header.innerHTML = 'Welcome to our service!';
        header.classList.add('header_main')

        let additional = document.createElement('p');
        additional.innerHTML = `We're so flattered to see you at our web-site, it's a massive honor for us!`;
        additional.classList.add('header_down')

        this.content.appendChild(header);
        this.content.appendChild(additional);

        return this.content;
    }
}

const home = new Home().init();

export default home;