
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
        },
        removeError(state, id) {
            state.errorText.splice(id, 1);
        }
    },
    namespaced: true,
}