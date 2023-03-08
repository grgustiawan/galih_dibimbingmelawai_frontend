<template>
    <div class="content-wrapper">
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Tambah Customer
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
                            <label for="nama">Nama :</label>
                            <input class="form-control" type="text" name="nama" placeholder="Masukan nama..." v-model="form.nama">
                            <span class="text-danger" v-if="nm" style="font-size:10pt;position: absolute;">{{ nm[0] }}</span>
                            
                            <label class="mt-4" for="dob">Tanggal Lahir :</label>
                            <input class="form-control" type="date" name="dob" v-model="form.dob">
                            <span class="text-danger" v-if="db" style="font-size:10pt;position: absolute;">{{ db[0] }}</span>

                            <label class="mt-4" for="email">Email :</label>
                            <input class="form-control" type="email" name="email" placeholder="Masukan email..." v-model="form.email">
                            <span class="text-danger" v-if="eml" style="font-size:10pt;position: absolute;">{{ eml[0] }}</span>

                            <label class="mt-4" for="alamat">Alamat :</label>
                            <textarea class="form-control" name="alamat" rows="3" v-model="form.alamat"></textarea>
                            <span class="text-danger" v-if="almt" style="font-size:10pt;position: absolute;">{{ almt[0] }}</span>

                            <button type="submit" class="btn btn-block btn-primary mt-4">Simpan</button>
                            <router-link :to="{name: 'manageuser'}">
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
    name: 'AddCustomerView',
    data(){
        return {
            form: {
                nama: '',
                dob: '',
                email: '',
                alamat: ''
            },
            nm: null,
            db: null,
            eml: null,
            almt: null,
            msg: null,
        }
    },

    methods: {
        simpanData(){
            const validToken = this.$store.getters.GET_AUTH_TOKEN;
            const config = {
                headers: { Authorization: `Bearer ` + validToken}
            }

            const data = {
                'nama_customer' : this.form.nama,
                'dob' : this.form.dob,
                'email' : this.form.email,
                'alamat' : this.form.alamat
            }

            axios.post('http://127.0.0.1:8000/api/v1/customers', data, config)
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