export default function inform(state=false, action) {
    switch (action.type) {
        case "CHANGE_FLAG":
            return action.flag
        default:
            return state
    }

}