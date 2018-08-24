import * as types from './mutation-types'

const mutations = {
    [types.LOGIN](state, user){
        state.user = user
        sessionStorage.setItem('username', user.username)
        sessionStorage.setItem('token', user.token)
    },
    [types.LOGOUT](state) {
        state.user = ''
        sessionStorage.clear()
    }
}

export default mutations