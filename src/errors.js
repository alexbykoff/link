const error = (type) => {
    let message;

    switch (type) {

        case ("typeMismatch"):
            message = "value of Watchable should match its type.\
        \nIf you do not want strict typing then omit 'type' argument";
            break;

        case ("noName"):
            message = "watchable's name should be provided as a first argument.\
        \nWatchable 'name' argument must be the same as variable name.";
            break;

        case ("nameMustBeString"):
            message = "watchable's name should always be a string and be the same as varaibale name.\
            \nMay be you forgot to add the name argument.";
            break;
        
        case("cantAttach"):
            message = "you can not 'attach' a non-detached watchable. 'detach()' first.";
            break;

        default:
            return;
    }
    console && console.warn("%c Watchable error: %c " + message, "color: white; background-color: navy", "");
    throw new Error();
};

export default error;