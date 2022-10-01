<template>
    <div>
        <form @submit.prevent="auth">
            <h1>Авторизация</h1>
            <label>Логин</label>
            <input required v-model="login" type="text" placeholder="Логин"/>
            <label>Пароль</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <hr/>
            <button type="submit">Войти</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data(){
            return {
                login : '',
                password : '',
            }
        },
        methods: {
            async auth() {
                if (this.password.length > 0) {
                    let data = {
                        login: this.login,
                        password: this.password
                    }
                    let request = {
                        url: `${this.$store.state.baseServerUrl}login`,
                        method: 'post',
                        headers: {
                            "Content-type": "application/json"
                        },
                        data: JSON.stringify(data)
                    }
                    const response = await axios(request);
                    localStorage.setItem('jwt', response.data.token);
                    this.$router.push('/');
                }
            }
        }
    }
</script>