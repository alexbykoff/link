const DOM = {};

DOM.dataRepeater = function (args) {
    if (args.length && this._value) {

        if (!Array.isArray(this._value)) {
            return Watchable.invokeError("notEnumerable");
        }
        args.map(element => {
            const child = [...element.childNodes][0];
            element.innerHTML = '';
            this._value.forEach(value => {
                const sibling = document.createElement(child.nodeName);
                // TODO: add .value for inputs
                sibling.innerHTML = value;
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
    return this;
}

export default DOM;