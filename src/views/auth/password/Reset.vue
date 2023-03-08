<template>
    <div v-if="hastkn" class="hold-transition login-page" >
        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-xl-9">
                        <div class="card rounded-3 text-black" 
                             style="box-shadow: 12px 8px 11px #B5B5B5;">
                            <div class="row g-0">
                                <div class="col-lg-6">
                                    <div class="card-body mx-md-4">
                                        <form @submit.prevent="adminForgotPassword">
                                            <p>Enter your new password</p>
                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="email">Password</label>
                                                <span class="text-danger">*</span>
                                                <input type="password" id="password" class="form-control"
                                                placeholder="new password" style="margin-top: -7px;" v-model="form.password" />
                                                <span class="text-danger" v-if="pass" 
                                                      style="font-size:10pt;position: absolute;">{{ pass[0] }}</span>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="confirm_password">Confirm Password</label>
                                                <span class="text-danger">*</span>
                                                <input type="password" id="confirm_password" class="form-control"
                                                placeholder="re-enter new password" style="margin-top: -7px;" v-model="form.confirm_password" />
                                                <input type="checkbox" id="togglePassword" @click="showPassword"/>
                                                <span style="font-size: 11pt;">Show Password</span><br />
                                                <span class="text-danger" v-if="cpass" 
                                                      style="font-size:10pt;position: absolute; bottom: 90px">{{ cpass[0] }}</span>
                                            </div>

                                            <div class="text-center pt-1 mb-1 pb-1">
                                                <button class="btn-login btn-block fa-lg mb-3" 
                                                        type="submit" id="submitButton" >Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-6 d-flex align-items-center gradient-custom-2" >
                                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 class="mb-4">Reset Password</h4>
                                        <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ResetView',
    data(){
        return {
            form: {
                password: '',
                confirm_password: '',
                token: ''
            },
            errors: {},
            msg: null,
            pass: null,
            cpass: null,
            tknurl: null,
            scstkn: null,
            hastkn: false
        }
    },

    created(){
        this.form.token = this.$route.query.token;
    },

    mounted: function(){
        this.scstkn = this.makeid;
        this.tknurl = this.$route.query.token;
        if(!this.tknurl){
            this.$router.push({ name: 'forbidden'});
        }

        const body = { token: this.tknurl}
        axios.post('/checktoken', body)
        .then((response) => {
            this.hastkn = response.data.success;
        })
        .catch(() => {
            this.$router.push({ name: 'forbidden'})
        })
    },

    computed: {
        makeid() {
            var length = 89;
            let result = '';
            const secrets = 'aIJ92v47HS7l8jDhFa28BDJ8qH9dh83hJSS0280D873r47G238jihxFA0O9g';
            const charactersLength = secrets.length;
            let counter = 0;
            while (counter < length) {
                result += secrets.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }
    },

    methods: {
        adminForgotPassword(){
            this.$store.dispatch("RESET", this.form)
            .then(() => {
                this.$router.push({ name: 'reset_success', query: { tkn: this.scstkn}});
            }).catch((error) => {
                this.pass = error.response.data.message.password;
                this.cpass = error.response.data.message.confirm_password;
            })
        },
        showPassword() {
            var checkBox = document.getElementById("togglePassword");
            var x = document.getElementById("password");
            var y = document.getElementById("confirm_password");

            if (checkBox.checked == true){
                x.type = "text";
                y.type = "text";
            } else {
                x.type = "password";
                y.type = "password";
            }
        }
    }
}
</script>

<style>
.btn-login {
    text-decoration: none;
    border: none;
    padding: 12px 40px;
    font-size: 16px;
    background-color: #b22a2e;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
}

.btn-login:hover{
    text-decoration: none;
    border: none;
    padding: 12px 40px;
    font-size: 16px;
    background: linear-gradient(to right, #ee7724, #e7353b, #d8363a, #b22a2e);
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
}

.btn-login:active {
    transform: scale(0.90);
}

.btn:active {
    transform: scale(0.95);
}


.gradient-custom-2 {
/* fallback for old browsers */
background: #b22a2e;

transition: all 5s ease;
}

.gradient-custom-2:hover {
/* fallback for old browsers */
background: #ee7724;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b22a2e);

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, #ee7724, #e7353b, #d8363a, #b22a2e);

}

@media (min-width: 768px) {
.gradient-form {
height: 100vh !important;
}
}
@media (min-width: 769px) {
.gradient-custom-2 {
border-top-right-radius: .3rem;
border-bottom-right-radius: .3rem;
}
}
</style>