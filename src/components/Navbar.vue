<template>
    <div>
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
        </ul>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <li class="nav-item logout-btn">
                <a class="nav-link" href="/" @click.prevent="adminLogout">
                    <i class="fas fa-power-off text-danger"></i><br />
                </a>
            </li>
        </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavbarItem',
    methods: {
        adminLogout(){
            this.$store.dispatch("LOGOUT")
            .then((response) => {
                console.log(response.data.data);
                this.$router.push({ path : '/'});
            }).catch(() => {

            })
        }
    }
}
</script>

<style>
.logout-btn{
    color: gray;
    transition: transform 0.3 ease;
}

.logout-btn:hover{
    color: #b22a2e;
}

.logout-btn:active{
    transform: scale(0.80);
}
</style>