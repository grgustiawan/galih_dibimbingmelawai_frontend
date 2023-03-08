<template>
  <nav>
    <div class="wrapper">

    <!-- Navbar -->
    <Navbar v-if="isLoggedInStatus" />

    <!-- Main Sidebar Container -->
    <Sidebar v-if="isLoggedInStatus" />

    <!-- Content Wrapper. Contains page content -->
    <router-view></router-view>
    <!-- /.content-wrapper -->
    
    <footer v-if="isLoggedInStatus" class="main-footer" style="position: relative; bottom: 0">
      <strong>Copyright &copy; 2023 <a href="https://www.optikmelawai.com/">Optik Melawai</a>.</strong>
      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0.0
      </div>
    </footer>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
    </div>
  </nav>
  <!---<router-view/>-->
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar
  },

  computed:{
    isLoggedInStatus(){
      return this.$store.getters.GET_AUTH_STATUS;
    }
  }
}
</script>