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
                                        <div class="text-center">
                                            <img src="/admin-lte/dist/img/melawai-bg.png" style="width: 60px;" alt="logo">
                                            <h4 class="mt-1 mb-3 pb-1"><b>Optik Melawai</b></h4>
                                        </div>
                                        <form @submit.prevent="adminLogin">
                                            <p>Please login to start your session</p>

                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="email">Email</label>
                                                <span class="text-danger">*</span>
                                                <input type="email" id="email" class="form-control"
                                                placeholder="email address" style="margin-top: -7px;" v-model="form.email" />
                                                <span class="text-danger" v-if="eml" 
                                                      style="font-size:10pt;position: absolute;">{{ eml[0] }}</span>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="password">Password</label>  
                                                <span class="text-danger">*</span>
                                                <input type="password" id="password" class="form-control" 
                                                placeholder="password" style="margin-top: -7px;" v-model="form.password" />
                                                <input type="checkbox" id="togglePassword" @click="showPassword"/>
                                                <span style="font-size: 11pt;">Show Password</span><br />
                                                <span class="text-danger" v-if="pass" 
                                                      style="font-size:10pt;position: absolute; bottom: 140px">{{ pass[0] }}</span>
                                            </div>

                                            <div class="text-center pt-1 mb-1 pb-1">
                                                <button class="btn-login btn-block fa-lg mb-3" 
                                                        type="submit" >Log in
                                                </button>
                                            </div>

                                            <div class="d-flex align-items-center justify-content-between pb-2">
                                                <p class="mb-0 me-2">Forgot Password?</p>
                                                <router-link to="/forgot" class="btn btn-outline-danger">Reset</router-link>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-6 d-flex align-items-center gradient-custom-2" >
                                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <img src="/admin-lte/dist/img/kinerja-2.png" 
                                             style="margin-left: -15px;width: 280px; height: auto; object-fit: contain;" />
                                        <h4 class="mb-4">Galih Raka Gustiawan</h4>
                                        <p class="small mb-0">Tugas bootcamp fullstack web developer dibimbing x melawai. Backend laravel, Frontend vue Js, 
                                        Database PostgreSQL.</p><br>

                                        <span>User : admin@gmail.com</span><br>
                                        <p>Pass : admin123</p>
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
    name: 'LoginView',
    data(){
        return {
            form: {
                email: '',
                password: ''
            },
            eml: null,
            pass: null
        }
    },

    methods: {
        adminLogin(){
            this.$store.dispatch("LOGIN", this.form)
            .then(() => {
                this.$router.push({ name : 'dashboard'});
            }).catch((error) => {
                this.eml = error.response.data.message.email;
                this.pass = error.response.data.message.password;
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