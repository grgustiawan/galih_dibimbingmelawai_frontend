<template>
    <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Manage Resep</h1>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">

            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Data Resep</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <router-link :to="{ name: 'addresep' }">
                    <button class="btn btn-success align-self-end">
                      <i class="nav-icon fas fa-file-word" id="nav-icon" color="white">
                       Tambah Resep</i>
                    </button>
                </router-link>
                <table id="datatable" class="table table-bordered table-striped mt-2">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama Customer</th>
                      <th>Nama Kasir</th>
                      <th>Nama Obat</th>
                      <th>Jumlah Obat</th>
                      <th width="120px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in resep" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.nama_customer }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.nama_obat }}</td>
                        <td>{{ item.jumlah_obat }}</td>
                        <td>
                          <div class="d-flex justify-content-arround">
                            <button class="btn btn-outline-danger ml-3" @click="deleteResep(item.id, item.nama_customer)">Delete</button>
                          </div>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
export default {
    name: 'ManageResepView',
    data(){
      return{
        resep : [

        ],
        id_cst : null,
        id_ksr : null,
        id_obt : null,
      }
    },
    mounted(){
      const validToken = this.$store.getters.GET_AUTH_TOKEN;
      const config = {
        headers: { Authorization: `Bearer ` + validToken}
      }
      axios.get('http://127.0.0.1:8000/api/v1/resep', config)
      .then((response) => {
          console.log(response.data.data)
          this.resep = response.data.data;
          $("#datatable").DataTable();
      }).catch((err) => {
          console.log(err)
      })
    },
    methods: {
        deleteResep(id, name){
          const validToken = this.$store.getters.GET_AUTH_TOKEN;
          const config = {
            headers: { Authorization: `Bearer ` + validToken}
          }
          const uri = 'http://127.0.0.1:8000/api/v1/prescription/' + id;
          var isDelete = confirm("Are you sure want to delete" + name + "?");
          if (isDelete){
              axios.delete(uri, config)
                .then(() => {
                  location.reload()
                }).catch((error) => {
                  console.log(error)
                });
          }
      }
    }
}
</script>

<style>

</style>