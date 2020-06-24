import { USER_INFO } from './mutations-type'
import { getStore } from "../config/global"
import { getUserInfo } from "../service/api/index"

export default {
    // 1. 同步用户信息
    syncUserInfo({ commit }, userInfo) {
        // console.dir(commit)
        console.dir(userInfo)
        commit(USER_INFO, { userInfo })
    },

    // 2.自动登录
    async reqUserInfo({ commit }) {
        let userInfo = JSON.parse(getStore('userInfo'));
        if (userInfo) {  // 表示localStorage中有用户信息
            commit(USER_INFO, { userInfo })
        } else {   // 表示localStorage中没有用户信息
            let result = await getUserInfo();
            console.dir(result)
            if (result.success_code === 200) {
                commit(USER_INFO, { userInfo: result.data })
            }
        }
    }

}