<template>
  <div>
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Welcome back, {{ usrName }}!</h1>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <!-- Small boxes (Stat box) -->
            <div class="row">
            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                    <span class="info-box-icon bg-info elevation-1"><i class="fas fa-pills"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">Obat</span>
                        <span class="info-box-number">{{ obat }}</span>
                    </div>
                </div>
            </div>
            
            <!-- /.col -->
            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box mb-3">
                <span class="info-box-icon bg-primary elevation-1"><i class="fas fa-file-pdf"></i></span>

                <div class="info-box-content">
                    <span class="info-box-text">Resep</span>
                    <span class="info-box-number">{{ resep }}</span>
                </div>
                <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
            </div>
            <!-- /.col -->

            <!-- fix for small devices only -->
            <div class="clearfix hidden-md-up"></div>

            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box mb-3">
                    <span class="info-box-icon bg-success elevation-1"><i class="fas fa-chart-line"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">Transaksi</span>
                        <span class="info-box-number">{{ transaction }}</span>
                    </div>
                </div>
            </div>
            
            <!-- employee -->
            <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box mb-3">
                    <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-users"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">Customer</span>
                        <span class="info-box-number">{{ customer }}</span>
                    </div>
                </div>
            </div>

            </div>      
          <!-- /.row -->

            <section class="content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-12">

                    <div class="card">
                      <div class="card-header">
                        <h3 class="card-title">DataTable Transaksi Obat</h3>
                      </div>
                      <!-- /.card-header -->
                      <div class="card-body">
                        <router-link :to="{ name: 'addtransaction' }">
                            <button class="btn btn-success align-self-end">
                              <i class="nav-icon fas fa-dollar-sign" id="nav-icon" color="white">
                              Transaksi Baru</i>
                            </button>
                        </router-link>
                        <table id="datatable" class="table table-bordered table-striped mt-4">
                          <thead>
                            <tr>
                              <th>ID Transaksi</th>
                              <th>Nama Customer</th>
                              <th>Kasir</th>
                              <th>ID Resep</th>
                              <th>Jumlah Obat</th>
                              <th>Total</th>
                              <th>Tax</th>
                              <th>Grand Total</th>
                              <th width="120px">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in transactions" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.nama_customer }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.id_resep }}</td>
                                <td>{{ item.jumlah_obat }}</td>
                                <td>{{ item.total }}</td>
                                <td>{{ item.tax }}</td>
                                <td>{{ item.grand }}</td>
                                <td>
                                  <div class="d-flex justify-content-arround">
                                    <button class="btn btn-sm btn-outline-danger ml-3" @click="deleteTransaction(item.id, item.nama_customer)">Delete</button>
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

          <!-- /.row (main row) -->
        </div><!-- /.container-fluid -->
      </section>
      <!-- /.content -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'HomeView',
    data(){
      return{
        obat: 0,
        resep: 0,
        transaction: 0,
        customer: 0,
        transactions: [

        ]
      }
    },
    computed: {
      usrName(){
        return this.$store.getters.GET_AUTH_INFO.name;
      }
    },
    mounted(){
        const validToken = this.$store.getters.GET_AUTH_TOKEN;
        const config = {
          headers: { Authorization: `Bearer ` + validToken}
        }
        axios.get('http://127.0.0.1:8000/api/v1/home', config)
        .then((response) => {
            this.obat        = response.data.obat;
            this.resep       = response.data.resep;
            this.transaction = response.data.transaction;
            this.customer    = response.data.customers;
        }).catch((err) => {
            console.log(err)
        });

        axios.get('http://127.0.0.1:8000/api/v1/readtransaction', config)
        .then((response) => {
            console.log(response.data.data);
            this.transactions = response.data.data;
        }).catch((err) => {
            console.log(err)
        });
    },
    methods: {
      deleteTransaction(id, name){
        const validToken = this.$store.getters.GET_AUTH_TOKEN;
        const config = {
          headers: { Authorization: `Bearer ` + validToken}
        }
        const uri = 'http://127.0.0.1:8000/api/v1/transaction/' + id;
        var isDelete = confirm("Are you sure want to delete " + name + " transaction ?");
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