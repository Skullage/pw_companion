<template>
	<div class="container">
		<main class="main">
			<div class="row row-cols-md-2 mb-3">
				<div class="form-floating">
					<select
						name="terrain"
						id="terrain"
						class="form-select mb-2 mb-md-0"
						v-model="$store.state.genie.selectedTerrain"
					>
						<option value="">Любая</option>
						<option value="Земля">Земля</option>
						<option value="Вода">Вода</option>
						<option value="Воздух">Воздух</option>
					</select>
					<label for="terrain" class="ps-4">Поверхность</label>
				</div>
				<div class="form-floating">
					<select
						name="class"
						id="class"
						class="form-select"
						v-model="$store.state.genie.selectedClass"
					>
						<option value="">Любой</option>
						<option
							v-for="item in $store.state.classes"
							:key="item.id"
							:value="item.title"
						>
							{{ item.title }}
						</option>
					</select>
					<label for="class" class="ps-4">Класс</label>
				</div>
			</div>
			<offcanvas-button
				class="offcanvas-btn"
				@click.prevent="$store.commit('toggleMenu')"
			/>
			<genie-category-group
				v-for="item in 14"
				:key="item"
				:category="item"
				:skills="data.filter(el => el.category == item)"
			/>
		</main>
		<aside
			class="border-start offcanvas offcanvas-end"
			:class="$store.state.showMenu ? 'show' : ''"
			:style="{ visibility: $store.state.showMenu ? 'visible' : 'hidden' }"
			data-bs-scroll="true"
			data-bs-backdrop="false"
			tabindex="-1"
			id="offcanvasScrolling"
			aria-labelledby="offcanvasScrollingLabel"
		>
			<div class="offcanvas-header">
				<h4 class="sidebar__title mb-0" id="offcanvasScrollingLabel">Джинн</h4>
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="offcanvas"
					aria-label="Close"
					@click.prevent="$store.commit('toggleMenu')"
				></button>
			</div>
			<div class="offcanvas-body">
				<div class="form-floating mb-3">
					<pattern-input
						class="form-control"
						:regExp="/^[\D]*|\D*/g"
						:replacement="''"
						:max="105"
						v-model.number="$store.state.genie.genieLvl"
						placeholder="0"
					></pattern-input>
					<label for="GenieLevel">Уровень джинна</label>
				</div>
				<div class="form-floating mb-3">
					<pattern-input
						class="form-control"
						:regExp="/^[\D]*|\D*/g"
						:replacement="''"
						:max="
							$store.state.genie.luckyPoints < 100
								? $store.state.genie.genieLvl
								: 100
						"
						v-model.number="$store.state.genie.luckyPoints"
						placeholder="0"
					></pattern-input>
					<label for="GenieLuckyPoints">Очки удачи</label>
				</div>
				<div class="mb-3">
					Требования: <span>ур. {{ $store.state.genie.genieLvl }}</span>
					<span>Очков удачи: {{ $store.state.genie.luckyPoints }}</span>
				</div>
				<div class="mb-3">
					Очки стихий:
					{{ $store.getters['genie/getElemetalPoints'] }} Свободные очки стихий:
					{{ $store.getters['genie/getFreeElemetalPoints'] }}
				</div>
				<p class="text-center mb-3">
					<span class="text-warning"
						>MT: {{ $store.state.genie.reqElements.MT }}</span
					>
					<span class="text-success">
						WD: {{ $store.state.genie.reqElements.WD }}</span
					>
					<span class="text-brown">
						ER: {{ $store.state.genie.reqElements.ER }}</span
					>
					<span class="text-info">
						WT: {{ $store.state.genie.reqElements.WT }}</span
					>
					<span class="text-danger">
						FR: {{ $store.state.genie.reqElements.FR }}</span
					>
				</p>
				<div>
					<h5 class="mb-1">
						Скиллы: {{ $store.state.genie.selectedSkills.length }}
					</h5>
					<div
						v-for="(item, index) in $store.state.genie.selectedSkills"
						:key="index"
					>
						{{ item.title }}
					</div>
				</div>
			</div>
		</aside>
	</div>
</template>

<script>
import OffcanvasButton from '@/components/UI/OffcanvasButton.vue'
import GenieCategoryGroup from '@/components/calcs/genie/GenieCategoryGroup.vue'
import PatternInput from '@/components/UI/PatternInput.vue'
import axios from 'axios'

export default {
	components: {
		OffcanvasButton,
		GenieCategoryGroup,
		PatternInput
	},
	data() {
		return {
			data: []
		}
	},
	methods: {
		async getSkills() {
			try {
				const response = await axios.get(
					`${this.$store.state.baseServerUrl}genie_skills`
				)
				this.data = response.data
			} catch (err) {
				console.log(err)
				this.$store.commit(
					'error/setErrorText',
					`Не удалось получить список умений джинна`
				)
			}
		}
	},
	mounted() {
		this.getSkills()
	}
}
</script>
