<template>
	<div class="d-flex justify-content-center align-items-center">
		<form @submit.prevent="auth">
			<h1>Авторизация</h1>
			<div class="form-floating mb-3">
				<input
					type="text"
					class="form-control"
					id="login"
					placeholder="Логин"
					required
					v-model="login"
				/>
				<label for="login">Логин</label>
			</div>
			<div class="form-floating mb-3">
				<input
					type="password"
					class="form-control"
					id="password"
					placeholder="Пароль"
					v-model="password"
					required
				/>
				<label for="password">Пароль</label>
			</div>
			<div class="text-center">
				<button type="submit" class="btn btn-outline-secondary">Войти</button>
			</div>
		</form>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			login: '',
			password: ''
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
						'Content-type': 'application/json'
					},
					data: JSON.stringify(data)
				}
				const response = await axios(request)
				localStorage.setItem('jwt', response.data.token)
				this.$store.commit('toggleLogged')
				this.$router.push('/')
			}
		}
	}
}
</script>
