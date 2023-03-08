<template>
    <div class="content-wrapper">
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Tambah Obat
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

                            <label class="mt-4" for="alamat">Pilih Obat :</label>
                            <select class="form-control" v-model="selectedObat" name="obat">
                                <option v-for="(item, index) in obats" :value="item.id" :key="index">{{ item.nama_obat }}</option>
                            </select>
                            <span class="text-danger" v-if="stk" style="font-size:10pt;position: absolute;">{{ stk[0] }}</span>

                            <label class="mt-4" for="dob">Jumlah Obat :</label>
                            <input class="form-control" type="number" name="expired" v-model="form.jumlah_obat">
                            <span class="text-danger" v-if="exp" style="font-size:10pt;position: absolute;">{{ exp[0] }}</span>

                            <button type="submit" class="btn btn-block btn-primary mt-4">Simpan</button>
                            <router-link :to="{name: 'manageresep'}">
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
    name: 'AddResepView',
    data(){
        return {
            form: {
                id_cust: '',
                id_usr: '',
                id_obt: '',
                jumlah_obat: ''
            },
            nm: null,
            mrk: null,
            stk: null,
            exp: null,
            msg: null,
            customers: [],
            selectedCustomers: null,
            obats: [],
            selectedObat: null,
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

        axios.get('http://127.0.0.1:8000/api/v1/obat', config)
        .then((response) => {
            console.log(response.data.data.data)
            this.obats = response.data.data.data;
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
                'id_user' : this.form.id_usr,
                'id_obat' : this.selectedObat,
                'jumlah_obat' : this.form.jumlah_obat
            }

            axios.post('http://127.0.0.1:8000/api/v1/prescription', data, config)
            .then((response) => {
                this.msg = response.data.message
            }).catch((err) => {
                console.log(err)
            })
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