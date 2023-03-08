<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Manage Customer</h1>
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
                <h3 class="card-title">Data Customer</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <router-link :to="{ name: 'addcustomer' }">
                    <button class="btn btn-success align-self-end">
                      <i class="nav-icon fas fa-user-plus" id="nav-icon" color="white">
                      Tambah Customer</i>
                    </button>
                </router-link>
                <table id="datatable" class="table table-bordered table-striped mt-2">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama Customer</th>
                      <th>Tanggal Lahir</th>
                      <th>Email</th>
                      <th>Alamat</th>
                      <th width="120px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in customer" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.nama_customer }}</td>
                        <td>{{ item.dob }}</td>
                        <td><small>{{ item.email }}</small></td>
                        <td>{{ item.alamat }}</td>
                        <td>
                          <div class="d-flex justify-content-arround">
                            <router-link :to="{ name: 'editcustomer', params: { id : item.id }}">
                                  <button class="btn btn-sm btn-outline-success">Edit</button>
                            </router-link>
                            <button class="btn btn-sm btn-outline-danger ml-3" @click="deleteCustomer(item.id, item.name)">Delete</button>
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

<script lang="js">
// import jquery from 'jquery'
// import dataTablesBootstrap4 from 'public/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4';
// import jqueryDataTables from 'public/admin-lte/plugins/datatables/jquery.dataTables';
import axios from 'axios';
import $ from 'jquery';

export default {
    name: 'ManageCustomerView',
    data(){
      return{
        customer : [

        ]
      }
    },
    mounted(){
      const validToken = this.$store.getters.GET_AUTH_TOKEN;
      const config = {
        headers: { Authorization: `Bearer ` + validToken}
      }
      axios.get('http://127.0.0.1:8000/api/v1/customers', config)
      .then((response) => {
          console.log(response.data.data.data)
          this.customer = response.data.data.data;
          $("#datatable").DataTable();
      }).catch((err) => {
          console.log(err)
      })
    },
    methods: {
      deleteCustomer(id, name){
          const validToken = this.$store.getters.GET_AUTH_TOKEN;
          const config = {
            headers: { Authorization: `Bearer ` + validToken}
          }
          const uri = 'http://127.0.0.1:8000/api/v1/customers/' + id;
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