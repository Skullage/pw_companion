<template>
	<header class="header">
		<nav class="navbar navbar-dark bg-dark navbar-expand-lg bg-light mb-3">
			<div class="container">
				<router-link class="navbar-brand" :to="{ name: 'home' }"
					>PW Companion</router-link
				>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<router-link
								class="nav-link"
								aria-current="page"
								:to="{ name: 'calc' }"
								>Калькуляторы</router-link
							>
						</li>
						<li class="nav-item" v-if="$store.state.isLogged">
							<router-link
								class="nav-link"
								aria-current="page"
								:to="{ name: 'AdminPanel' }"
								>Админка</router-link
							>
						</li>
						<li class="nav-item">
							<a
								href="#"
								class="nav-link"
								@click="logout"
								v-if="$store.state.isLogged"
								>Выйти</a
							>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'BaseHeader',
	methods: {
		logout() {
			localStorage.removeItem('jwt')
			this.$store.commit('toggleLogged')
			this.$router.push('/')
		}
	}
}
</script>
