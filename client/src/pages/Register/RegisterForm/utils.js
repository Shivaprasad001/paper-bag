import { SPECIAL_CHARACTERS } from "./constants"

export const checkValueHasSpecialCharacter = (value) => {
    for(let i=0; i<value.length; i++) {
        if(SPECIAL_CHARACTERS.includes(value[i])) {
            return true;
        }
    }

    return false;
}

export const checkValueHasUpperCaseCharacter = (value) => {
    for(let i=0; i<value.length; i++) {
        if(/^[a-zA-Z]+$/.test(value[i]) && value[i] === value[i].toUpperCase()) {
            return true
        }
    }

    return false;
}

export const checkValueHasLowerCaseCharacter = (value) => {
    for(let i=0; i<value.length; i++) {
        if(/^[a-zA-Z]+$/.test(value[i]) && value[i] === value[i].toLowerCase()) {
            return true
        }
    }

    return false;
}