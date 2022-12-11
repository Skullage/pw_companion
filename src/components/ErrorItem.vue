<template>
	<div class="d-flex align-items-center justify-content-center">
		<p class="m-0">
			<span class="text-uppercase fw-bold">Ошибка!</span>
			{{ text }}
		</p>
		<button
			type="button"
			@click="close"
			class="btn-close"
			aria-label="Close"
		></button>
	</div>
</template>

<script>
export default {
	name: 'ErrorItem',
	props: {
		id: Number,
		text: String
	},
	methods: {
		close() {
			this.$store.commit('error/removeError', this.id)
		}
	}
}
</script>
