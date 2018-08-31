export const PICK_NEW = "PICK_NEW"

export function pickNew(payload) {
    return {
        type: PICK_NEW,
        payload: payload
    };
}