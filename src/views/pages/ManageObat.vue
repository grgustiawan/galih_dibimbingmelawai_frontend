<template>
    <div class="content-wrapper">
        <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Manage Obat</h1>
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
                    <h3 class="card-title">Data Obat</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <router-link :to="{ name: 'addobat' }">
                        <button class="btn btn-success align-self-end">
                        <i class="nav-icon fas fa-pills" id="nav-icon" color="white">
                        Tambah Obat</i>
                        </button>
                    </router-link>
                    <table id="datatable" class="table table-bordered table-striped mt-2">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nama Obat</th>
                        <th>Merek</th>
                        <th>Stock</th>
                        <th>Expired Date</th>
                        <th width="120px">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in obat" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.nama_obat }}</td>
                            <td>{{ item.merek }}</td>
                            <td><small>{{ item.stock }}</small></td>
                            <td>{{ item.expired_date }}</td>
                            <td>
                            <div class="d-flex justify-content-arround">
                                <router-link :to="{ name: 'editobat', params: { id : item.id }}">
                                    <button class="btn btn-sm btn-outline-success">Edit</button>
                                </router-link>
                                <button class="btn btn-sm btn-outline-danger ml-3" @click="deleteObat(item.id, item.nama_obat)">Delete</button>
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
    name: 'ManageObatView',
    data(){
      return{
        obat : [

        ],
      }
    },
    mounted(){
      const validToken = this.$store.getters.GET_AUTH_TOKEN;
      const config = {
        headers: { Authorization: `Bearer ` + validToken}
      }
      axios.get('http://127.0.0.1:8000/api/v1/obat', config)
      .then((response) => {
          this.obat = response.data.data.data;
          $("#datatable").DataTable();
      }).catch((err) => {
          console.log(err)
      })
    },
    methods: {
        deleteObat(id, name){
          const validToken = this.$store.getters.GET_AUTH_TOKEN;
          const config = {
            headers: { Authorization: `Bearer ` + validToken}
          }
          const uri = 'http://127.0.0.1:8000/api/v1/obat/' + id;
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