import error from "./errors";
import DOM from './dom';

class Watchable {
    constructor(name = Watchable.invokeError("noName"), {
        value = null,
        type = "any"
    } = {}) {

        typeof name !== "string" && Watchable.invokeError("nameMustBeString");

        this.watch = DOM.dataWatcher.bind(this);
        this.repeat = DOM.dataRepeater.bind(this);
        this.link = DOM.dataLinker.bind(this);

        this.name = name; // used for attaching and detaching
        this._type = this.setType(type);
        this._value = this.setInitialVal(value);
        this.callbacks = []; // stores callbacks for this instance
        this.isDetached = false; // initially watchable is attached to DOM
        this.tracking = false; // checks if watchable is tracking input
        this.trackElement = ''; // attribute of tracked element

        this.sub = new Map();

        this.event = (event) => this.set(event.target.value); // this is the tracking event stored as 'this' bound function

        Watchable.watchables.add(name); // add this watchable to the global Set

        this.render();
    }

    set(value) {
        if (this._value === value) return;
        // Do nothing, do not fire listeners if value has not changed, do not rerende
        if (this._type !== "any" && typeof value !== typeof this._type) {
            return Watchable.invokeError("typeMismatch");
        }

        this._value = value; // TODO: not the best way

        if (this.sub.entries()) [...this.sub.values()].forEach(cb => cb());

        return this.render();
    }

    value() {
        return this._value;
    }

    type() {
        return this._type;
    }

    setInitialVal(value) {
        return this._type === "any" || typeof this._type === typeof value ?
            value :
            Watchable.invokeError("typeMismatch");
    }

    subscribe(name, callback) {
        // Adds callbacks that are invoked when value is changed
        // Callbacks are not fired when watchable is detached
        return typeof name !== "string" ? Watchable.invokeError("subMustHaveName") :
            this.sub.set(name, callback);
    }

    binds(id) {
        // Binds watchable to the input. Can only bind to one input a time.
        if (!id && this.tracking) {
            this.tracking = false;
            return this.trackElement.removeEventListener('input', this.event);
        }

        if (id && this.tracking) return Watchable.invokeError("cantBind");
        if (!id) return;

        const element = document.getElementById(id);

        if (element) {
            this.tracking = true;
            this.trackElement = element;
            return element.addEventListener('input', this.event);
        }
    }

    detach() {
        // Detach watchable from DOM updates. Note - value changes are still recorded
        Watchable.watchables.has(this.name) && Watchable.watchables.delete(this.name);
        return this.isDetached = true;
    }

    attach() {
        // Attaches watchable to DOM updates. Last set value is rendered (Even the values set in detached mode)
        return Watchable.watchables.has(this.name) ?
            Watchable.invokeError("cantAttach") :
            Watchable.watchables.add(this.name);
    }

    unsubscribe(name) {
        if (!name) return this.sub.clear();
        if (!this.sub.has(name)) return Watchable.invokeError("cantUnsub");
        return this.sub.delete(name);
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
        if (!document) return Watchable.invokeError("noDocument");
        if (!Watchable.watchables.has(this.name)) return;

        const dataWatchableArray = [...document.querySelectorAll(`[data-watchable=${this.name}]`)];
        const dataLinkArray = [...document.querySelectorAll(`[data-link=${this.name}]`)];
        const dataRepeatArray = [...document.querySelectorAll(`[data-repeat=${this.name}]`)];

        this.watch(dataWatchableArray).repeat(dataRepeatArray).link(dataLinkArray);
    }
}

Watchable.watchables = new Set();
Watchable.error = error;

module.exports = Watchable;