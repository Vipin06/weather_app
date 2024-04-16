import moment from 'moment';

const Email = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); 
const Dateformat= new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i);

export const removeExtraSpaces = (string) => {
    return string.replace(/\s{2,}/g, ' ').trim()
}

export const notValid = string => {
    return [null, undefined, 'null', 'undefined', ''].includes(removeExtraSpaces(string))
}

export const emailValidation = email => Email.test(email);
