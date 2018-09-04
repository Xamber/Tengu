export const initialize = function (dict) {

    let keys = Object.keys(dict);
    keys = keys.filter(word => dict[word].usage.length > 0)

    for (let i = keys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [keys[i], keys[j]] = [keys[j], keys[i]];
    }

    return { dict, keys }
}