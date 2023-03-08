<template>
    <div>
        <aside class="main-sidebar sidebar-dark-info elevation-4">
        <!-- Brand Logo -->
        <a href="/" class="brand-link">
            <img src="/admin-lte/dist/img/melawai-bg.png" 
                alt="AdminLTE Logo" 
                class="brand-image img-circle elevation-3" 
                style="opacity: .8">
            <span class="brand-text font-weight-light">Optik Melawai</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex" :class="{active: $route.name==='profile'}">
                <div class="image">
                    <img v-bind:src="'/admin-lte/dist/img/' + usrImg" id="profile-pic"
                         class="img-circle elevation-2" alt="User Image" 
                         style="width: 30px; height: 30px; object-fit: cover;">
                </div>
                <div class="info">
                    <router-link class="d-block" :to="{ name: 'profile' }">{{ usrName }}</router-link>
                </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library -->
                <div class="user-panel">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'dashboard' }" :class="{active: $route.name==='dashboard'}" >
                            <i class="nav-icon fas fa-home" id="nav-icon"
                               color="white"></i>
                            <p>Dashboard</p>
                        </router-link>
                    </li>
                </div>

                <div class="user-panel" v-if="isAdmin">
                    <li class="nav-header" style="letter-spacing: 2pt;">REVIEWS</li>
                    <li class="nav-item">
                    <router-link class="nav-link" :to="{name : 'manageobat'}" :class="{active: $route.name==='manageobat'}">
                        <i class="nav-icon fas fa-capsules"></i>
                        <p> Obat</p>
                    </router-link>
                    </li>
                    
                    

                    <li class="nav-item">
                    <router-link class="nav-link" :to="{name : 'manageresep'}" :class="{active: $route.name==='manageresep'}">
                        <i class="nav-icon fas fa-file-word"></i>
                        <p> Resep</p>
                    </router-link>
                    </li>

                    <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'manageuser' }" :class="{active: $route.name==='manageuser'}" >
                        <i class="nav-icon fas fa-users"></i>
                        <p> Customer</p>
                    </router-link>
                    </li>

                    <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-file-pdf"></i>
                        <p> Reports</p>
                    </a>
                    </li>   
                </div>

            </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
        </aside>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    computed: {
        isAdmin(){
            let role = this.$store.getters.GET_AUTH_INFO.role;
            if(role == 1){
                return true;
            } else {
                return false;
            }
        },
        usrName(){
            return this.$store.getters.GET_AUTH_INFO.name;
        },
        usrImg(){
            return this.$store.getters.GET_AUTH_INFO.image;
        }
    }
}
</script>

<style>

</style>