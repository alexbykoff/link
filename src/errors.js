const error = (type) => {
    let message;

    switch (type) {

        case ("typeMismatch"):
            message = "value of Watchable should match its type.\
        \nIf you do not want strict typing then omit 'type' argument and it will default to 'any'";
            break;

        case ("noName"):
            message = "watchable's name should be provided as a first argument.\
        \nWatchable's 'name' argument same as variable's name is a good practice.";
            break;

        case ("nameMustBeString"):
            message = "watchable's name should always be a string..\
            \nMay be you forgot to add the name argument.";
            break;

        case ("cantAttach"):
            message = "you can not 'attach' a non-detached watchable. 'detach()' first.";
            break;

        case ("cantBind"):
            message = "watchable is already bound.";
            break;
        
        case("noDocument"):
        message = "you can run this library from the HTML page only. No 'document' object was found";
            break;

        default:
            return;
    }
    console && console.warn("%c Watchable error: %c " + message, "color: white; background-color: navy", "");
    throw new Error("Link syntax error");
};

export default error;