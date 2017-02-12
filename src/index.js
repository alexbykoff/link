import error from "./errors";

class Watchable {

    constructor(name = Watchable.invokeError("noName"), {
        value = null,
        type = "any"
    } = {}) {

        typeof name !== "string" && Watchable.invokeError("nameMustBeString");

        this.name = name; // used for attaching and detaching
        this._type = this.setType(type);
        this._value = this.setInitialVal(value);
        this.callbacks = []; // stores callbacks for this instance
        this.isDetached = false; // initially watchable is attached to DOM

        Watchable.watchables.push(name); // add this watchable to global list
    }

    set(value) {

        if (this._value === value) return;
        // Do nothing, do not fire listeners if value has not changed, do not rerender

        if (this._type !== "any" && typeof value !== typeof this._type){
            return Watchable.invokeError("typeMismatch");
        // Do nothing and throw error if attempting to set wrong type value
        // Ignore type checking if type either "any" or omitted     
        }

        this._value = value; // TODO: not the ebst way

        if (this.callbacks.length) {
            this.callbacks.forEach( callback => callback());
        }

        this.link(); // Render watchables
    }

    value() {
        return this._value;
    }

    setInitialVal(value) {

        if (this._type === "any") {
            return value;
        }

        if (typeof this._type !== typeof value) {
            return Watchable.invokeError("typeMismatch");
        }

        return value;

    }

    subscribe(callback){
        // Adds callbacks that are invoked when value is changed
        // Callbacks are not fired when watchable is detached

        if(typeof callback !== "function") return; // only functions can subscribe to changes

        if(this.callbacks.indexOf(callback) == -1){
            this.callbacks.push(callback);
        }

    }

    detach(){
        // Detach watchable from DOM. Note - value changes are still recorded

        Watchable.watchables.splice(Watchable.watchables.indexOf(this.name), 1);
        return this.isDetached = true;
    }

    attach(){
        // Attaches watchable to DOM. Last set value is rendered (Even values set in detached mode)

        if (!this.isDetached) return Watchable.invokeError("cantAttach");
        Watchable.watchables.push(this.name);
        this.link();
    }

    unsubscribe(){
        // Removes all the subscriptions
        // TODO: Handpick subscribers

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
        return el.innerHTML = eval(el.getAttribute('watchable') + '._value');
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
