<template>
	<div
		class="error w-100 position-absolute top-0 right-0 d-flex text-dark bg-danger px-1 py-2 gap-1"
	>
		<div class="flex-fill">
			<error-item
				v-for="(text, index) in $store.state.error.errorText"
				:key="index"
				:text="text"
				:id="index"
			></error-item>
		</div>
		<button
			type="button"
			@click="close"
			class="btn-close"
			aria-label="Close"
		></button>
	</div>
</template>

<script>
import ErrorItem from '@/components/ErrorItem.vue'
export default {
	components: { ErrorItem },
	name: 'ErrorMessage',
	methods: {
		close() {
			this.$store.commit('error/clearErrorText')
		}
	}
}
</script>

<style lang="scss" scoped>
.error {
	min-height: 50px;
	z-index: 99999;
}
</style>
