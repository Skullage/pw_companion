<template>
	<main class="main">
		<div class="container">
			<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
				<grid-item v-for="(item, index) in items" :key="index" :item="item" />
			</div>
		</div>
	</main>
</template>

<script>
import GridItem from '@/components/GridItem.vue'
export default {
	components: {
		GridItem
	},
	data() {
		return {
			items: [
				{
					title: 'Калькулятор дома',
					desc: '',
					backgroundImage: 'house/GridItemBg.jpg',
					href: 'HouseCalc'
				},
				{
					title: 'Калькулятор домопух',
					desc: '',
					backgroundImage: 'weapon/GridItemBg.png',
					href: 'WeaponCalc'
				},
				{
					title: 'Калькулятор сумеречной брони',
					desc: '',
					backgroundImage: 'armor/GridItemBg.png',
					href: 'ArmorCalc'
				},
				{
					title: 'Калькулятор накидок с императорской битвы',
					desc: '',
					backgroundImage: 'cloak/GridItemBg.png',
					href: 'CloakCalc'
				},
				{
					title: 'Калькулятор колец с арены Авроры',
					desc: '',
					backgroundImage: 'cloak/GridItemBg.png',
					href: 'RingCalc'
				},
				{
					title: 'Калькулятор джина',
					desc: '',
					backgroundImage: 'cloak/GridItemBg.png',
					href: 'GenieCalc'
				}
			]
		}
	}
}
</script>
