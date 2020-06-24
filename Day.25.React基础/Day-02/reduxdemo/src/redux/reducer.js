// 引入常量
import { INCREMENT, DECREMENT } from "./action-type.js"

let initNumber = {
    number: 0
}

export default function reducer(changeNumber = initNumber, action) {
    const { type, data } = action;
    switch (type) {
        case INCREMENT:
            changeNumber.number += data;
            console.log(changeNumber)
            return changeNumber;
        case DECREMENT:
            changeNumber.number -= data;
            console.log(changeNumber)
            return changeNumber;
        default:
            return changeNumber;
    }

}