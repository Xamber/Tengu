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

function CreateStore(store = {}) {
    let proxed = new Proxy(store, {
        get(target, prop) {
            console.log("Get");
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            console.log("Set");
            return Reflect.set(target, prop, value);
        }
    })
    return proxed
}

export function ConnectStore(componentClass, store, fields) {
    class Stored extends componentClass {
        constructor(props) {
            super(props)
            let nextState = {}
            if (fields === undefined) {
                fields = Object.keys(store) 
            }
            for (let f of fields) {
                nextState[f] = store[f]
            }      
            this.state = Object.assign({}, nextState)
        }
    }
    return Stored
}

export var store = CreateStore({
    id: -1,
    rus: ["Привет!"],
    eng: "Hello!",
    usage: "Fast English words",
    next: 1,
    pickNew() {
        let word = Dictionary[keys[this.next]];
        this.id = word.id
        this.rus = word.rus
        this.eng =  word.eng
        this.usage = word.usage ? word.usage[0] : ""
        this.next = this.next + 1
        console.log(this);
    }
})