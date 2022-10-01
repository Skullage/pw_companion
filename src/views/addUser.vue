<template>
    <div class="container d-flex justify-content-center align-items-center">
        <form @submit.prevent> 
            <div class="input-group mb-3">
                <label class="input-group-text">Логин</label>
                <input class="form-control" type="text" placeholder="Логин" v-model="login" />
            </div>
            <div class="input-group mb-3">
                <label class="input-group-text">Пароль</label>
                <input class="form-control" type="password" placeholder="Пароль" v-model="password" />
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
                <input class="btn btn-primary" type="submit" @click="createUser" value="Создать">
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'AddUser',
        data() {
            return {
                login: '',
                password: '',
                email: '',
                isAdmin: false,
            };
        },
        methods: {
            async createUser() {
                try {
                    await axios.post(this.$store.state.baseServerUrl + 'register', {
                        login: this.login,
                        password: this.password,
                        email: this.email,
                        isAdmin: this.isAdmin,
                    });
                    window.location.reload();
                } catch (err) {
                    console.log(err);
                }
            },
        },
    }
</script>