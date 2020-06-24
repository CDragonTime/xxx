export default function inform(state=[], action) {
    switch (action.type) {
        case "SET_INFORMS":
            return action.inform
        default:
            return state
    }

}