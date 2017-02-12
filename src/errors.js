export const error = (type) => {
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

        case ("nameMustBeString"):
            message = "watchable's name should always be a string.\
            \nMay be you forgot to add the name argument.";
            break;

        default:
            break;
    }
    console && console.warn("%c Watchable error: %c " + message, "color: white; background-color: navy", "");
    throw new Error();
};