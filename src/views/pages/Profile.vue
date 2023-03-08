<template>
    <div>
        <div class="content-wrapper">
            <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Profile</h1>
                </div>
                </div>
            </div><!-- /.container-fluid -->
            </section>

            <!-- Main content -->
            <section class="content">
            <div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <!-- Profile Image -->
                    <div class="card card-info card-outline">
                    <div class="card-body box-profile">
                        <div class="text-center">
                        <img class="profile-user-img img-fluid img-circle"
                            v-bind:src="'/admin-lte/dist/img/' + usrImg"
                            alt="User profile picture"
                            style="width: 150px; height: 150px; object-fit: cover;">
                        </div>

                        <h3 class="profile-username text-center">{{ usrName }}</h3>

                        <p class="text-muted text-center">{{ usrNip }}</p>

                        <a href="#" class="btn btn-info btn-block"><b>Change Photos</b></a>
                    </div>
                    </div>

                    <!-- About Me Box -->
                    <div class="card card-info">
                    <div class="card-header">
                        <h3 class="card-title">About Me</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <strong><i class="fas fa-building mr-1"></i> Division</strong>
                        <p class="text-muted">
                        Sarana Kesehatan
                        </p>

                        <strong><i class="fas fa-briefcase mr-1"></i> Subdivision</strong>
                        <p class="text-muted">
                        Apotik
                        </p>

                        <strong><i class="fas fa-desktop mr-1"></i> Department</strong>
                        <p class="text-muted">
                        Non Department
                        </p>

                        <hr>

                        <strong><i class="fas fa-map-marker-alt mr-1"></i> Address</strong>

                        <p class="text-muted">Kota Serang, Banten</p>

                        <hr>

                        <strong><i class="fas fa-phone mr-1"></i> Phone</strong>

                        <p class="text-muted">6283812640683</p>
                    
                    </div>
                    <!-- /.card-body -->
                    </div>
                </div>

                <!-- /.col -->
                <div class="col-md-9">
                    <div class="card">
                    <div class="card-header p-2">
                        <ul class="nav nav-pills">
                            <li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                        </ul>
                    </div><!-- /.card-header -->

                    <div class="card-body">
                        <div class="tab-content">
                            <div class="tab-pane" id="settings">
                            <form class="form-horizontal">
                            <div class="form-group row">
                                <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" id="name" :value="usrName">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputName" class="col-sm-2 col-form-label">NIP</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" id="nip" :value="usrNip">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                <input type="email" class="form-control" id="email" :value="usrEmail">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputName2" class="col-sm-2 col-form-label">Phone</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" id="phone" :value="usrPhone">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputExperience" class="col-sm-2 col-form-label">Address</label>
                                <div class="col-sm-10">
                                <textarea class="form-control" id="alamat" :value="usrAddress"></textarea>
                                </div>
                            </div>         
                            <div class="form-group row">
                                <div class="offset-sm-2 col-sm-10">
                                <button type="submit" class="btn btn-warning">Save</button>
                                </div>
                            </div>
                            </form>
                            </div>
                        </div>
                        <!-- /.tab-content -->
                    </div><!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
                <!-- /.col -->
                </div>
                <!-- /.row -->
            </div><!-- /.container-fluid -->
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileView',
    computed: {
        usrName(){
            return this.$store.getters.GET_AUTH_INFO.name;
        },
        usrNip(){
            return this.$store.getters.GET_AUTH_INFO.nip;
        },
        usrImg(){
            return this.$store.getters.GET_AUTH_INFO.image;
        },
        usrEmail(){
            return this.$store.getters.GET_AUTH_INFO.email;
        },
        usrPhone(){
            return this.$store.getters.GET_AUTH_INFO.phone;
        },
        usrAddress(){
            return this.$store.getters.GET_AUTH_INFO.alamat;
        }
    }
} 
</script>

<style>

</style>