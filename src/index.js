import error from "./errors";

class Watchable {

    //TODO: name should throw eror as well
    constructor(name = Watchable.invokeError("noName"), {
        value = null,
        type = "any"
    } = {}) {
        if(typeof name !== "string"){
            Watchable.invokeError("nameMustBeString")
        }
        this.name = name;
        this._type = this.setType(type);
        this.value = this.setInitialVal(value);
        this.callbacks = [];
        Watchable.watchables.push(name);
    }

    set(value) {

        if (this.value === value) return;
        // Do nothing, do not fire listeners if value has not changed

        if (typeof value !== typeof this._type){
            return Watchable.invokeError("typeMismatch");
        // Do nothing and throw error if attempting to set wrong type value    
        }

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

    detach(){
        Watchable.watchables.splice(Watchable.watchables.indexOf(this.name), 1);
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
Watchable.error = error;

module.exports = Watchable;
