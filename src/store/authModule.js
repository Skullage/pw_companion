import axios from 'axios';

export const authModule = {
    state () {
        return {
            status: '',
            token: localStorage.getItem('token') || '',
            user : {}
        }
    },
    getters: {

    },
    mutations: {
        setErrorText(state, text) {
            state.errorText.push(text);
        },
        clearErrorText(state) {
            state.errorText = [];
        }
    },
    actions: {
        login({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://localhost:5000/login', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token
                    const user = resp.data.user
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token, user)
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        }
    },
    namespaced: true,
}