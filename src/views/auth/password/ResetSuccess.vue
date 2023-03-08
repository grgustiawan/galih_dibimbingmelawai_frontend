<template>
    <div v-if="hasctkn" class="hold-transition login-page">
        <div class="card text-center">
            <div class="card-body text-center align-items-center">
                <div class="checkmark-circle mb-5 mt-5">
                    <div class="background"></div>
                    <div class="checkmark draw"></div>
                </div>
                <h3 class="mt-2">Password Changed!</h3>
                <p class="mb-5">Your password has been changed successfully.</p>
                <router-link :to="{name: 'login'}" 
                              class="btn-back-login">Back To Login
                </router-link>
            </div>
            <div class="card-footer text-muted mt-3">
                {{ getNow }}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ResetSuccessView',
    data(){
      return{
        scstkn: null,
        hasctkn: false,
        sclen: null
      }
    },

    computed: {
        getNow() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            return dateTime;
        }
    },

    mounted: function(){
      this.scstkn = this.$route.query.tkn;
      if(!this.scstkn){
        this.$router.push({ name: 'login'});
      } else {
        this.hasctkn = true;
      }

      this.sclen = this.scstkn.length;
      console.log(this.sclen);
    },

    methods: {
        adminSuccess(){
            this.$router.push({ name: 'login'});
        }
    }
}
</script>

<style>

/* Checkmark */
.checkmark-circle {
  width: 150px;
  height: 150px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin-left: auto;
  margin-right: auto;
}
.checkmark-circle .background {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #00C09D;
  position: absolute;
}
.checkmark-circle .checkmark {
  border-radius: 5px;
}
.checkmark-circle .checkmark.draw:after {
  -webkit-animation-delay: 100ms;
  -moz-animation-delay: 100ms;
  animation-delay: 100ms;
  -webkit-animation-duration: 3s;
  -moz-animation-duration: 3s;
  animation-duration: 3s;
  -webkit-animation-timing-function: ease;
  -moz-animation-timing-function: ease;
  animation-timing-function: ease;
  -webkit-animation-name: checkmark;
  -moz-animation-name: checkmark;
  animation-name: checkmark;
  -webkit-transform: scaleX(-1) rotate(135deg);
  -moz-transform: scaleX(-1) rotate(135deg);
  -ms-transform: scaleX(-1) rotate(135deg);
  -o-transform: scaleX(-1) rotate(135deg);
  transform: scaleX(-1) rotate(135deg);
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
.checkmark-circle .checkmark:after {
  opacity: 1;
  height: 75px;
  width: 37.5px;
  -webkit-transform-origin: left top;
  -moz-transform-origin: left top;
  -ms-transform-origin: left top;
  -o-transform-origin: left top;
  transform-origin: left top;
  border-right: 15px solid white;
  border-top: 15px solid white;
  border-radius: 2.5px !important;
  content: '';
  left: 37px;
  top: 78px;
  position: absolute;
}

@-webkit-keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 37.5px;
    opacity: 1;
  }
  40% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
  100% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
}
@-moz-keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 37.5px;
    opacity: 1;
  }
  40% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
  100% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
}
@keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 37.5px;
    opacity: 1;
  }
  40% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
  100% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
}

.btn-back-login {
    text-decoration: none;
    border: none;
    padding: 12px 40px;
    font-size: 16px;
    background-color: #00c09d;
    border: 1px solid #00ab8c;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    cursor: pointer;
    transition: all 2s ease-out;
    transition: all .2s ease-out;
}

.btn-back-login:hover{
    text-decoration: none;
    border: none;
    padding: 12px 40px;
    font-size: 16px;
    background-color: #2ca893;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
}

.btn-back-login:active {
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