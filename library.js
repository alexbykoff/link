class Watchable {

    constructor({
        initial = null,
        type = "any"
    } = {}) {
        this._type = this.setType(type);
        this.value = this.setInitial(initial);
    }

    set(value) {
        let object = Object.assign(this, {
            value
        });
        this.link();
        return object;
    }

    setInitial(initial) {

        if (this._type === "any") {
            return initial;
        }

        if (typeof this._type !== typeof initial) {
            throw new Error(Watchable.error("typeMismatch"));
        }

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

    static error(type) {
        let message;

        switch (type) {

            case ("typeMismatch"):
                message = "value of Watchable should match its type.\
            \nIf you do not want strict typing then omit 'type' argument";
                break;

            default:
                break;
        }
        console.warn("%c Watchable error: %c " + message, "color: white; background-color: navy", "");
    }

    link() {
        const list = [...document.querySelectorAll('[watchable]')];

        list.forEach(w => {
            w.innerHTML = w.innerHTML
                .replace(/\{{(.+?)\}}/g, (m, val) => eval(val + ".value"));
        });
    }

}