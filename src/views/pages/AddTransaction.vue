<template>
    <div class="content-wrapper">
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Transaksi Baru
                </div>
                <div class="card-body">
                    <div v-if="msg">
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                <span class="sr-only">Close</span>
                            </button>
                            <span style="font-size: 11pt">{{ msg }}</span>
                        </div>
                    </div>

                    <Form @submit.prevent="simpanData">
                            <label for="nama">Nama Customer :</label>
                            <select class="form-control" v-model="selectedCustomers" name="customers">
                                <option v-for="(item, index) in customers" :value="item.id" :key="index">{{ item.nama_customer }}</option>
                            </select>
                            <span class="text-danger" v-if="nm" style="font-size:10pt;position: absolute;">{{ nm[0] }}</span>

                            <label class="mt-4" for="email">Kasir :</label>
                            <input class="form-control" type="text" name="merek" v-model="usrName" readonly> 
                            <span class="text-danger" v-if="mrk" style="font-size:10pt;position: absolute;">{{ mrk[0] }}</span>

                            <label class="mt-4" for="alamat">Pilih Resep :</label>
                            <select class="form-control" v-model="selectedResep" name="obat">
                                <option v-for="(item, index) in reseps" :value="item.id_resep" :key="index">{{ item.nama_customer }} - {{ item.id_resep }}</option>
                            </select>
                            <span class="text-danger" v-if="stk" style="font-size:10pt;position: absolute;">{{ stk[0] }}</span>

                            <label class="mt-4" for="dob">Total :</label>
                            <input v-for="item in hitung" :key="item.id" class="form-control" type="text" id="total" :value="item.harga * item.jumlah_obat" readonly>
                            <span class="text-danger" v-if="exp" style="font-size:10pt;position: absolute;">{{ exp[0] }}</span>

                            <label class="mt-4" for="dob">Tax :</label>
                            <input v-for="item in hitung" :key="item.id" class="form-control" type="text" id="tax" :value="(item.harga * item.jumlah_obat) * 0.10" readonly>
                            <span class="text-danger" v-if="exp" style="font-size:10pt;position: absolute;">{{ exp[0] }}</span>

                            <label class="mt-4" for="dob">Grand Total :</label> 
                            <input v-for="item in hitung" :key="item.id" class="form-control" type="text" id="grand" :value="(item.harga * item.jumlah_obat) + ((item.harga * item.jumlah_obat) * 0.10)" readonly>
                            <span class="text-danger" v-if="exp" style="font-size:10pt;position: absolute;">{{ exp[0] }}</span>

                            <input type="hidden" v-for="item in hitung" :key="item.id" :value="item.id" id="id_prescription">

                            <button class="btn btn-block btn-warning mt-4" @click="getTransaction">PROSES</button>
                            <button type="submit" class="btn btn-block btn-primary mt-4">Simpan</button>
                            <router-link :to="{name: 'dashboard'}">
                                <button type="submit" class="btn btn-block btn-secondary mt-1">Back</button>
                            </router-link>
                    </Form>
                </div>
                <div class="card-footer text-center">
                    {{ currentDate() }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'AddTransactionView',
    data(){
        return {
            form: {
                id_cust: '',
                id_usr: '',
                id_presc: '',
                total: '',
                tax: '',
                grand: ''
            },
            nm: null,
            mrk: null,
            stk: null,
            exp: null,
            msg: null,
            customers: [],
            selectedCustomers: null,
            reseps: [],
            selectedResep: null,
            id_prescription: null,
            hitung: []
        }
    },

    mounted(){
        this.form.id_usr = this.usrID;
        const validToken = this.$store.getters.GET_AUTH_TOKEN;
        const config = {
            headers: { Authorization: `Bearer ` + validToken}
        }
       
        axios.get('http://127.0.0.1:8000/api/v1/customers', config)
        .then((response) => {
            console.log(response.data.data.data)
            this.customers = response.data.data.data;
        }).catch((err) => {
            console.log(err)
        });

        axios.get('http://127.0.0.1:8000/api/v1/resep', config)
        .then((response) => {
            console.log(response.data.data)
            this.reseps = response.data.data;
            this.id_prescription = response.data.data.id;
        }).catch((err) => {
            console.log(err)
        });
    },

    computed: {
        usrName(){
            return this.$store.getters.GET_AUTH_INFO.name;
        },

        usrID(){
            return this.$store.getters.GET_AUTH_INFO.id;
        },
    },

    methods: {

        simpanData(){
            const validToken = this.$store.getters.GET_AUTH_TOKEN;
            const config = {
                headers: { Authorization: `Bearer ` + validToken}
            }

            const data = {
                'id_customer' : this.selectedCustomers,
                'id_user' : this.usrID,
                'id_prescription' : document.getElementById('id_prescription').value,
                "total" : document.getElementById('total').value,
                "tax": document.getElementById('tax').value,
                "grand" : document.getElementById('grand').value,
            }
            
            axios.post('http://127.0.0.1:8000/api/v1/transaction', data, config)
            .then((response) => {
                this.msg = response.data.message
            }).catch((err) => {
                console.log(err)
            })
        },

        getTransaction(){
            const validToken = this.$store.getters.GET_AUTH_TOKEN;
            const config = {
                headers: { Authorization: `Bearer ` + validToken}
            }

            const data = {
                'id_prescription' : this.selectedResep
            }

            axios.post('http://127.0.0.1:8000/api/v1/readtransaction', data, config)
            .then((response) => {
                // console.log(response.data.data)
                this.hitung = response.data.data;
            }).catch((err) => {
                console.log(err)
            });
        },

        currentDate() {
            const current = new Date();
            return current;
        }
    }

}
</script>

<style>

</style>