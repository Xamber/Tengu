import {PICK_NEW} from './actions';
import Dictionary from './english_words.json';

const shuffleArray = function (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

let keys = Object.keys(Dictionary);
keys = keys.filter(word => Dictionary[word].usage.length > 0)
shuffleArray(keys);


export let initialState = {
    dict: Dictionary,
    keys: keys,
    id: -1,
    rus: ["Привет!"],
    eng: "Hello!",
    usage: "Fast English words",
    next: 0,
}

export let Reducer = function (state = {}, action) {
    switch (action.type) {
        case PICK_NEW:
            let word = state.dict[state.keys[state.next]];
            return Object.assign({}, state, {
                id: word.id,
                rus: word.rus,
                eng:  word.eng,
                usage: word.usage ? word.usage[0] : "",
                next: state.next + 1
            });
        default:
            return state;
    }
};