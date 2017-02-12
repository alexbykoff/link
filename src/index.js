class Watchable {

    //TODO: name should throw eror as well
    constructor(name = Watchable.invokeError("noName"), {
        value = null,
        type = "any"
    } = {}) {
        if(typeof name !== "string"){
            Watchable.invokeError("nameMustBeString")
        }
        this._type = this.setType(type);
        this.value = this.setInitialVal(value);
        this.callbacks = [];
        Watchable.watchables.push(name);
    }

    set(value) {
        // TODO: type checking
        if (this.value === value) return;
        // Do nothing, do not fire listeners if value has not changed

        this.value = value;

        if (this.callbacks.length) {
            this.callbacks.forEach( callback => callback());
        }
        this.link();
        return this;
    }

    setInitialVal(value) {

        if (this._type === "any") {
            return value;
        }

        if (typeof this._type !== typeof value) {
            Watchable.invokeError("typeMismatch");
        }

    }

    subscribe(callback){
        if(typeof callback !== "function"){
            return;
        }

        if(this.callbacks.indexOf(callback) == -1){
            this.callbacks.push(callback);
        }

    }

    unsubscribe(){
        this.callbacks = [];
    }

    setType(type) {

        switch (type) {

            case "string":
                type = "string";
                break;

            case "number":
                type = 1;
                break;

            case "boolean":
                type = true;
                break;

            default:
                break;
        }

        return type;
    }
    static invokeError(errorcode){
        throw new Error(Watchable.error(errorcode));
    }
    static error(type) {
        let message;

        switch (type) {

            case ("typeMismatch"):
                message = "value of Watchable should match its type.\
            \nIf you do not want strict typing then omit 'type' argument";
                break;

            case ("noName"):
                message = "watchable's name should be provided as a first argument.\
            \nUsing watchable 'name' argument same as variable name is a good practice.";
                break;

            case("nameMustBeString"):
                message = "watchable's name should always be a string.\
                \nMay be you forgot to add the name argument.";
                break;


            default:
                break;
        }
        console && console.warn("%c Watchable error: %c " + message, "color: white; background-color: navy", "");
throw new Error();    
}

    static render(el) {
        return el.innerHTML = eval(el.getAttribute('watchable') + '.value');
    }

    link() {
        Watchable.watchables.map(watchable => {
            const list = [...document.querySelectorAll(`[watchable=${watchable}]`)];
            list.forEach(el => Watchable.render(el))
        })
    }
}

Watchable.watchables = [];