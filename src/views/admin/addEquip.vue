<template>
	<div class="container">
		<div class="row pb-3">
			<div class="text-center col-12 col-lg-6">
				<div class="mb-3">
					<label class="label mb-2">Название</label>
					<input
						class="form-control"
						type="text"
						placeholder="Название"
						v-model="title"
					/>
				</div>
				<div class="mb-3">
					<label class="label mb-1">Описание</label>
					<ckeditor
						class="form-control"
						:editor="editor"
						v-model="desc"
						:config="editorConfig"
					></ckeditor>
				</div>
				<div class="mb-3">
					<label class="label mb-1">Иконка</label>
					<input
						class="form-control"
						type="text"
						placeholder="Иконка"
						v-model.number="icon"
					/>
				</div>
				<div class="mb-3">
					<h3 class="label mb-1">Базовые статы</h3>
					<stat-field
						class="mb-2"
						v-for="(item, index) in baseStats"
						:key="index"
						v-model="baseStats[index]"
						:id="index"
						@remove="baseStats.splice($event, 1)"
					/>
					<button
						class="btn btn-outline-secondary"
						@click="baseStats.push({ stat: 'Сила', value: '' })"
					>
						Добавить
					</button>
				</div>
				<div class="mb-3">
					<h3 class="label mb-1">Дополнительные статы</h3>
					<stat-field
						class="mb-2"
						v-for="(item, index) in additionalStats"
						:key="index"
						v-model="additionalStats[index]"
						:id="index"
						@remove="additionalStats.splice($event, 1)"
					/>
					<button
						class="btn btn-outline-secondary"
						@click="additionalStats.push({ stat: 'Сила', value: '' })"
					>
						Добавить
					</button>
				</div>
				<div>
					<h3 class="label mb-1">Требования</h3>
					<stat-field
						class="mb-2"
						v-for="(item, index) in requirements"
						:key="index"
						v-model="requirements[index]"
						:id="index"
						@remove="requirements.splice($event, 1)"
					/>
					<button
						class="btn btn-outline-secondary"
						@click="requirements.push({ stat: 'Сила', value: '' })"
					>
						Добавить
					</button>
				</div>
			</div>
			<div class="col-12 col-lg-6">
				<div class="mb-3 text-center">
					<label class="label mb-1">Разрешенные классы</label>
					<v-select
						label="title"
						class="h-100 select"
						v-model="allowedClasses"
						:reduce="item => item.title"
						:options="$store.state.classes"
						multiple
					>
						<template #no-options="{ search }">
							Класс {{ search }} не найден!
						</template>
					</v-select>
				</div>
				<div class="mb-3 text-center">
					<h3 class="label mb-1">Крафты</h3>
					<craft-card
						v-for="(item, index) in crafts"
						v-model="crafts[index]"
						:key="index"
						:id="index"
						@removeCard="crafts.splice($event, 1)"
						@removeItem="crafts[$event.cardId].splice($event.itemId, 1)"
					/>
					<button
						class="btn btn-outline-secondary"
						@click="crafts.push([{ resource: '', value: '' }])"
					>
						Добавить
					</button>
				</div>
				<div class="mb-3">
					<label class="label mb-2">Тип</label>
					<select v-model="type" class="form-select">
						<option value="Оружие">Оружие</option>
						<option value="Броня">Броня</option>
					</select>
				</div>
				<div class="mb-3">
					<label class="label mb-2">Подтип</label>
					<select v-model="selectedSubtype" class="form-select">
						<option
							v-for="(item, index) in subtypes"
							:value="item"
							:key="index"
						>
							{{ item }}
						</option>
					</select>
				</div>
				<div class="mb-3">
					<label class="label mb-2">Уровень экипировки</label>
					<input
						class="form-control"
						type="text"
						placeholder="Уровень экипировки"
						v-model="equipLevel"
					/>
				</div>
				<div class="mb-3">
					<label class="label mb-2">Требуемый уровень</label>
					<input
						class="form-control"
						type="text"
						placeholder="Уровень экипировки"
						v-model="reqLevel"
					/>
				</div>
				<div class="text-center">
					<button class="btn btn-success" @click="save">Создать</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import StatField from '@/components/dev/StatField.vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import CraftCard from '@/components/dev/CraftCard.vue'
import vSelect from 'vue-select'

export default {
	components: {
		StatField,
		ckeditor: CKEditor.component,
		CraftCard,
		vSelect
	},
	name: 'AddEquip',
	data() {
		return {
			title: '',
			desc: '',
			icon: '',
			baseStats: [{ stat: 'Сила', value: '' }],
			additionalStats: [{ stat: 'Сила', value: '' }],
			allowedClasses: [],
			requirements: [],
			crafts: [[{ resource: '', value: '' }]],
			editor: Editor,
			type: 'Броня',
			subtypes: [
				'Нагрудник',
				'Поножи',
				'Сапоги',
				'Шлем',
				'Накидка',
				'Ожерелье',
				'Перевязь',
				'Наручи',
				'Металлическое кольцо',
				'Драгоценное кольцо',
				'Книга',
				'Меч',
				'Копье',
				'Топоры',
				'Лук',
				'Кастеты',
				'Магический жезл',
				'Кинжалы',
				'Магическая сфера',
				'Сабля',
				'Коса',
				'Щит и меч',
				'Ручная пушка',
				'Боевой шест',
				'Парные мечи',
				'Чакрам',
				'Булава',
				'Магический меч',
				'Посох',
				'Парные секиры'
			],
			selectedSubtype: 'Нагрудник',
			equipLevel: 0,
			reqLevel: 0,
			editorConfig: {
				placeholder: 'Введите описание скилла'
			}
		}
	},
	methods: {
		async save() {
			try {
				await axios.post(
					this.$store.state.baseServerUrl + 'equips',
					{
						title: this.title,
						desc: this.desc,
						baseStats: this.baseStats,
						additionalStats: this.additionalStats,
						icon: this.icon,
						blockedClasses:
							this.allowedClasses.length > 0
								? JSON.stringify(this.getBlockedClasses)
								: JSON.stringify([])
					},
					{
						headers: {
							Authorization: 'Bearer ' + localStorage.getItem('jwt')
						}
					}
				)
				window.location.reload()
			} catch (err) {
				console.log(err)
			}
		}
	},
	computed: {
		getBlockedClasses() {
			const blockedClasses = []
			this.$store.state.classes.forEach(el => {
				if (!this.allowedClasses.includes(el.title)) {
					blockedClasses.push(el.title)
				}
			})
			return blockedClasses
		}
	}
}
</script>
<style lang="scss" scoped></style>
