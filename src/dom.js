const DOM = {};

/*Method is used to create a list of elements which
then are filled with watchable's iterbale data.
Method takes a child element of the data-repeat element
and mimics its type and all the classes if any*/

DOM.dataRepeater = function (args) {
    if (args.length && this._value) {

        if (!Array.isArray(this._value)) {
            return Watchable.invokeError("notEnumerable");
        }

        args.map(element => {
            let type, classes;
            if (element.children) {
                if (element.children[0].id) return Watchable.invokeError("cantHaveIdRepeat");
                type = element.children[0].nodeName;
                classes = [...element.children[0].classList];          
            } else {
                type = 'DIV';
                classes = '';
            }
            element.innerHTML = '';

            this._value.forEach(value => { 
                const sibling = document.createElement(type);
                sibling.nodeName === "INPUT" ?
                    sibling.value = value :
                    sibling.innerHTML = value;
                if (classes) {
                    classes.forEach(c => sibling.classList.add(c));
                }
                element.appendChild(sibling);
            });
        });
    }
    return this;
}

DOM.dataLinker = function (args) {
    if (!args.length) return this;
    args.map(link =>
        link.nodeName === "INPUT" ?
        link.value = this._value :
        link.innerHTML = this._value);
    return this;
}

DOM.dataWatcher = function (args) {
    args.map(element => element.innerHTML = this._value);
    Watchable.watchables.set(this.name, this._value);
    return this;
}

export default DOM;