<template>
    <div class="container d-flex justify-content-center align-items-center">
        <form @submit.prevent> 
            <div class="input-group mb-3">
                <label class="input-group-text">Логин</label>
                <input class="form-control" autocomplete="off" type="text" placeholder="Логин" v-model="login" />
            </div>
            <div class="input-group mb-3">
                <label class="input-group-text">Пароль</label>
                <input class="form-control" autocomplete="off" type="password" placeholder="Пароль" v-model="password" />
            </div>
            <div class="input-group mb-3">
                <label class="input-group-text">E-mail</label>
                <input class="form-control" type="email" placeholder="E-mail" v-model="email" />
            </div>
            <div class="text-center mb-3">
                <label for="isAdmin" class="me-3">Админ?</label>
                <input id="isAdmin" type="checkbox" class="form-check-input mt-0" v-model="isAdmin" />
            </div>
            <div class="text-center">
                <input class="btn btn-primary" type="submit" @click="updateUser" value="Изменить">
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'UpdateUser',
        data() {
            return {
                login: '',
                password: '',
                email: '',
                isAdmin: false,
            };
        },
        created() {
            this.getUserById(this.$route.params.id);
        },
        methods: {
            async getUserById(id) {
                try {
                    const response = await axios.get(`${this.$store.state.baseServerUrl}users/id=${id}`);
                    this.login = response.data.login;
                    this.email = response.data.email;
                    this.isAdmin = response.data.isAdmin == 1 ? true : false;
                } catch (err) {
                    console.log(err);
                }
            },
            async updateUser() {
                try {
                    await axios.put(`${this.$store.state.baseServerUrl}users/${this.$route.params.id}`, {
                        login: this.login,
                        password: this.password,
                        email: this.email,
                        isAdmin: this.isAdmin,
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                        }
                    }
                    );
                    this.$router.push('/admin')
                } catch (err) {
                    console.log(err);
                }
            },
        },
    }
</script>