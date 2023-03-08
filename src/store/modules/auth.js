import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';

export const auth = {
    state: {
        auth_status: false,
        auth_token: null,
        auth_info: {
            id: null,
            name: null,
            nip: null,
            email: null,
            phone: null,
            alamat: null,
            division: null,
            subdivison: null,
            department: null,
            image: null,
            role: false,
            joindate: null
        },
        auth_reset: false
    },
    
    getters: {
        GET_AUTH_STATUS(state){
            return state.auth_status;
        },

        GET_AUTH_TOKEN(state){
            return state.auth_token;
        },

        GET_AUTH_INFO(state){
            return state.auth_info;
        },

        GET_AUTH_RESET(state){
            return state.auth_reset;
        }
    },
    
    actions: {
        LOGIN(context, loginData){
            return new Promise ((resolve, reject) => {
                axios.post('/login', loginData)
                     .then((response) => {
                        context.commit('SET_AUTH_TOKEN', response.data.data.token);
                        context.commit('SET_AUTH_STATUS', response.data.success);
                        context.commit('SET_AUTH_INFO', response.data.data.user);
                        resolve(response);
                     }).catch((error) => {
                        reject(error);
                     })
            });
        },

        FORGOT(context, forgotData){
            return new Promise ((resolve, reject) => {
                axios.post('/forgot', forgotData)
                     .then((response) => {
                        context.commit('SET_AUTH_RESET');
                        resolve(response);
                     }).catch((error) => {
                        reject(error);
                     })
            });
        },
        
        RESET(context, payload){
            return new Promise ((resolve, reject) => {
                axios.post('/reset', payload)
                     .then((response) => {
                        context.commit('SET_AUTH_RESET');
                        resolve(response);
                     }).catch((error) => {
                        reject(error);
                     })
            });
        },
        LOGOUT(context){
            axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.auth_token;
            return new Promise ((resolve, reject) => {
                axios.post('/logout')
                     .then((response) => {
                        context.commit('SET_AUTH_LOGOUT')
                        resolve(response);
                     }).catch((error) => {
                        reject(error);
                     })
            });
        }
    },

    mutations: {
        SET_AUTH_TOKEN(state, token){
            state.auth_token = token;
        },

        SET_AUTH_STATUS(state, success){
            state.auth_status = success;
        },

        SET_AUTH_INFO(state, info){
            state.auth_info.id = info.id;
            state.auth_info.name = info.name;
            state.auth_info.nip = info.nip;
            state.auth_info.email = info.email;
            state.auth_info.phone = info.phone;
            state.auth_info.alamat = info.alamat;
            state.auth_info.division = info.division;
            state.auth_info.subdivison = info.subdivison;
            state.auth_info.department = info.department;
            state.auth_info.image = info.image;
            if(info.role == 1){
                state.auth_info.role = true;
            }
            state.auth_info.joindate = info.joindate
        },

        SET_AUTH_RESET(state){
            state.auth_reset = true;
        },

        SET_AUTH_LOGOUT(state){
            state.auth_token = null;           
            state.auth_status = false;
            state.auth_info = {
                    id: null,
                    name: null,
                    nip: null,
                    email: null,
                    phone: null,
                    alamat: null,
                    division: null,
                    subdivison: null,
                    department: null,
                    image: null,
                    role: false,
                    joindate: null
            }
        }
    }
}