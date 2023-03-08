<template>
    <div class="hold-transition login-page">
        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-xl-9">
                        <div class="card rounded-3 text-black" 
                             style="box-shadow: 12px 8px 11px #B5B5B5;">
                            <div class="row g-0">
                                <div class="col-lg-6">
                                    <div class="card-body mx-md-4">
                                       
                                        <router-link class="nav-link" :to="{name: 'login'}">
                                            <i class="fas fa-arrow-left back-btn"></i>
                                        </router-link>
                                        
                                        <div class="text-center">
                                            <img src="/admin-lte/dist/img/melawai-bg.png" style="width: 60px;" alt="logo">
                                            <h4 class="mt-1 mb-3 pb-1"><b>Optik Melawai</b></h4>
                                        </div>

                                        <div v-if="msg">
                                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    <span class="sr-only">Close</span>
                                                </button>
                                                <span style="font-size: 11pt">{{ msg.email[0] }}</span>
                                            </div>
                                        </div>

                                        <form @submit.prevent="adminForgotPassword">
                                            <p>Enter email to reset your password</p>
                                            <div class="form-outline mb-3">
                                                <label class="form-label" for="email">Email</label>
                                                <span class="text-danger">*</span>
                                                <input type="email" id="email" class="form-control"
                                                placeholder="email address" style="margin-top: -7px;" v-model="form.email" />
                                                <span class="text-danger" id="errorEmail" style="font-size:10pt"></span><br />
                                            </div>

                                            <div class="text-center pt-1 mb-1 pb-1">
                                                <button class="btn-login btn-block fa-lg mb-3" 
                                                        type="submit" id="submitButton" >Reset
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-6 d-flex align-items-center gradient-custom-2" >
                                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 class="mb-4">Forgot Password</h4>
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
//import { useRouter } from 'vue-router'
//const router = useRouter();

export default {
    name: 'ForgotView',
    data(){
        return {
            form: {
                email: ''
            },
            errors:{},
            msg: null
        }
    },

    methods: {
        adminForgotPassword(){
            var errM = document.getElementById("errorEmail");
            errM.innerText = '';

            this.$store.dispatch("FORGOT", this.form)
            .then((response) => {
                this.msg = response.data.message;
                this.form.email = null;
            }).catch((error) => {
                if( error.response.data.message.email ){
                    errM.innerText = error.response.data.message.email;
                }
            })
        },
        showPassword() {
            var checkBox = document.getElementById("togglePassword");
            var x = document.getElementById("password");

            if (checkBox.checked == true){
                x.type = "text";
            } else {
                x.type = "password";
            }
        }   
    }
}
</script>

<style>
.back-btn{
    color: gray;
    position: relative;
    margin-left: -3vw; 
    top: -10px;
    font-size: 20px;
    font-weight:bold;
    transition: all 0.8s ease;
}

.back-btn:hover {
    color: #b22a2e;
    font-weight:bold;
    animation: shake 2s;
    animation-iteration-count: infinite;
}

.back-btn:active {
    transform: scale(0.80);
    font-weight:bold;
}

@keyframes shake {
  0% { transform: translate(3px, 0px) rotate(0deg); }
  10% { transform: translate(0px, 0px) rotate(0deg); }
  20% { transform: translate(-3px, 0px) rotate(0deg); }
  30% { transform: translate(0px, 0px) rotate(0deg); }
  40% { transform: translate(3px, 0px) rotate(0deg); }
  50% { transform: translate(0px, 0px) rotate(0deg); }
  60% { transform: translate(-3px, 0px) rotate(0deg); }
  70% { transform: translate(0px, 0px) rotate(0deg); }
  80% { transform: translate(3px, 0px) rotate(0deg); }
  90% { transform: translate(0px, 0px) rotate(0deg); }
  100% { transform: translate(3px, 0px) rotate(0deg); }
}

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