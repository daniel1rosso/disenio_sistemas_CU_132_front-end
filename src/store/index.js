import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false
    },
    mutations: {
        loggedIn: (state) => {
            state.loggedIn = true
        },
        loggedOut: (state) => {
            state.loggedIn = false
        }
    },
    actions: {
        mockLogin(context) {
            setTimeout(function() {
                context.commit('loggedIn')
            }, 500)
        },
        mockLogOut(context) {
            setTimeout(function() {
                context.commit('loggedOut')
            }, 500)
        }
    }
})