export default function changeNumber(state=0, action) {
    switch (action.type) {
        case "addNum":
            return state + 1
        case "subNum":
            // return state -= action.thatNum
            return state - 1
        default:
            return state
    }

}