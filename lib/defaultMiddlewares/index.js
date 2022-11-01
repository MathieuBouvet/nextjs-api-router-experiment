import handleHttpErrors from "./handleHttpErrors";
import handleErrors from "./handleErrors";
import sendReturned from "./sendReturned";

const defaultMiddlewares = [handleHttpErrors, handleErrors, sendReturned];

export default defaultMiddlewares;
