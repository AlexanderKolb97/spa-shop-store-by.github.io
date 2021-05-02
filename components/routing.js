const routing = function() {
    let name = 'home';

    let matches = location.hash.match(/#([a-z]+)/);
        
    if (matches && matches.length > 0) {
        name = matches[1];
    }
    return name;
};

export {routing};