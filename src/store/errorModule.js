
export const errorModule = {
    state () {
        return {
            errorText: [],
        }
    },
    getters: {
        errorIsVisible(state) {
            return state.errorText.length > 0;
        }
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
        showError({state, commit}) {
            commit('setErrorText', state.errorText);
        },
        closeError({commit}) {
            commit('clearErrorText');
        }
    },
    namespaced: true,
}