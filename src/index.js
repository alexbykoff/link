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
        this.tracking = false; // checks if watchable is tracking input
        this.trackElement = ''; // attribute of tracked element
        
        this.event = (e) => this.set(e.target.value); // this is the tracking event stored as 'this' bound fucntion 

        Watchable.watchables.add(name); // add this watchable to the global Set

        this.render();
    }

    set(value) {

        if (this._value === value) return;
        // Do nothing, do not fire listeners if value has not changed, do not rerender

        if (this._type !== "any" && typeof value !== typeof this._type) {
            return Watchable.invokeError("typeMismatch");
            // Do nothing and throw error if attempting to set wrong type value
            // Ignore type checking if type either "any" or omitted     
        }

        this._value = value; // TODO: not the best way

        if (this.callbacks.length) {
            this.callbacks.forEach(callback => callback());
        }

        this.render();
    }

    value() {

        return this._value;

    }

    type() {

        return this._type;

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

    subscribe(callback) {

        // Adds callbacks that are invoked when value is changed
        // Callbacks are not fired when watchable is detached

        if (typeof callback !== "function") return; // only functions can subscribe to changes

        if (this.callbacks.indexOf(callback) == -1) {
            this.callbacks.push(callback);
        }
    }

    track(name) {

        // Starts tracking any input text and binds to it. Can only tarck one input a time.

        if(this.tracking) return Watchable.invokeError("cantTrack");

        const element = document.querySelectorAll(`[trackable=${name}]`)[0];

        if (element) {
            this.tracking = true;
            this.trackElement = element;
            element.addEventListener('input', this.event);
        }
    }

    untrack() {

        // Removes tracking listener from the element. Does not affect any other listeners attached.

        if (!this.tracking) return Watchable.invokeError("cantUntrack");
        this.tracking = false;
        this.trackElement.removeEventListener('input', this.event);

    }

    detach() {

        // Detach watchable from DOM updates. Note - value changes are still recorded

        Watchable.watchables.has(this.name) && Watchable.watchables.delete(this.name);
        return this.isDetached = true;

    }

    attach() {

        // Attaches watchable to DOM updates. Last set value is rendered (Even the values set in detached mode)

        if (Watchable.watchables.has(this.name)) {
            return Watchable.invokeError("cantAttach");
        }

        Watchable.watchables.add(this.name);
    }

    unsubscribe() {

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

    static invokeError(errorcode) {

        throw new Error(Watchable.error(errorcode));

    }

    render() {

        if (!Watchable.watchables.has(this.name)) return;

        [...document.querySelectorAll(`[watchable=${this.name}]`)]
        .map(element => element.innerHTML = this._value);

    }

}

Watchable.watchables = new Set();
Watchable.error = error;

module.exports = Watchable;