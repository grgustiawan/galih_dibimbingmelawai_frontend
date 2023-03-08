<template>
    <div class="content-wrapper">
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Edit Obat
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
                            <label for="nama">Nama Obat :</label>
                            <input class="form-control" type="text" name="nama_obat" placeholder="Masukan nama obat..." v-model="form.nama">
                            <span class="text-danger" v-if="nm" style="font-size:10pt;position: absolute;">{{ nm[0] }}</span>

                            <label class="mt-4" for="email">Merek :</label>
                            <input class="form-control" type="text" name="merek" placeholder="Masukan merek obat..." v-model="form.merek">
                            <span class="text-danger" v-if="mrk" style="font-size:10pt;position: absolute;">{{ mrk[0] }}</span>

                            <label class="mt-4" for="alamat">Stock :</label>
                            <input class="form-control" type="text" name="stock" placeholder="Masukan stock obat..." v-model="form.stock">
                            <span class="text-danger" v-if="stk" style="font-size:10pt;position: absolute;">{{ stk[0] }}</span>

                            <label class="mt-4" for="alamat">Harga :</label>
                            <input class="form-control" type="text" name="stock" placeholder="Masukan stock obat..." v-model="form.harga">
                            <span class="text-danger" v-if="stk" style="font-size:10pt;position: absolute;">{{ stk[0] }}</span>

                            <label class="mt-4" for="dob">Expired Date :</label>
                            <input class="form-control" type="date" name="expired" v-model="form.expired">
                            <span class="text-danger" v-if="exp" style="font-size:10pt;position: absolute;">{{ exp[0] }}</span>

                            <button type="submit" class="btn btn-block btn-primary mt-4">Simpan</button>
                            <router-link :to="{name: 'manageobat'}">
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
    name: 'EditObatView',
    data(){
        return {
            form: {
                nama: '',
                merek: '',
                stock: '',
                harga: '',
                expired: ''
            },
            nm: null,
            mrk: null,
            stk: null,
            exp: null,
            msg: null,
        }
    },

    mounted(){
        const validToken = this.$store.getters.GET_AUTH_TOKEN;
        const config = {
            headers: { Authorization: `Bearer ` + validToken}
        }
        const uri = 'http://127.0.0.1:8000/api/v1/obat/' + this.$route.params.id;
        axios.get(uri, config)
        .then((response) => {
            this.form.nama  = response.data.data.nama_obat;
            this.form.merek = response.data.data.merek;
            this.form.stock = response.data.data.stock;
            this.form.harga = response.data.data.harga;
            this.form.expired = response.data.data.expired_date; 
        })
        .catch((error) => {
            console.log(error);
        });
        },

    methods: {
        simpanData(){
            const validToken = this.$store.getters.GET_AUTH_TOKEN;
            const config = {
                headers: { Authorization: `Bearer ` + validToken}
            }

            const data = {
                'nama_obat' : this.form.nama,
                'merek' : this.form.merek,
                'stock' : this.form.stock,
                'expired_date' : this.form.expired
            }

            axios.put('http://127.0.0.1:8000/api/v1/obat/' + this.$route.params.id, data, config)
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