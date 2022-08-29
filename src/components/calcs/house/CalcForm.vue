<template>
    <form class="form p-4 pt-5 rounded position-relative" @submit.prevent>
        <button class="form__close pt-2 pe-2 text-white border-0 bg-transparent position-absolute top-0 end-0" @click="removeForm">&#10006;</button>
        <div class="form-floating mb-2">
            <select class="form-select" id="floatingSelect" v-model="selected" required>
                <option class="form__option" :value={} disabled>Выберите строение</option>
                <option class="form__option" v-for="(house, index) in filterSelect" :key="index" :value="house">
                    {{house.name}}
                </option>
            </select>
            <label for="floatingSelect">Строение</label>
        </div>
        <level-chooser :min=1 :max=9 :value=data.curLvl name="curLvl" @increaseValue="increaseValue('curLvl')" @decreaseValue="decreaseValue('curLvl')" label="Текущий уровень постройки"/>
        <level-chooser :min=2 :max=10 :value=data.reqLvl name="reqLvl" @increaseValue="increaseValue('reqLvl')" @decreaseValue="decreaseValue('reqLvl')" label="Необходимый уровень постройки"/>
        <div v-if="miniResultVisible">
            <result-list :resources="resources" />
        </div>
    </form>
</template>

<script>
import LevelChooser from '@/components/UI/LevelChooser.vue';
import ResultList from '@/components/calcs/house/ResultList.vue';

export default {
    data() {
        return {
            houses: [
                {
                    name: "Садовый участок",
                    food: [0, 200, 600, 900, 2100, 4400, 6000, 8100, 10900, 13800],
                    stone: [0, 2400, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000],
                    metal: [0, 2400, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000],
                    wood: [0, 2400, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000],
                    cloth: [0, 2400, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000],
                    money: [0, 400000, 1200000, 1800000, 4200000, 8800000, 12000000, 16200000, 21800000, 27600000],
                    houseLvl: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27]
                },
                {
                    name: "Пастбище",
                    food: [0, 3300, 4400, 5300, 6600, 8100, 9800, 11700, 13800, 16100],
                    stone: [0, 15400, 23000, 28800, 36700, 44900, 55200, 64800, 79200, 91200],
                    metal: [0, 15400, 23000, 28800, 36700, 44900, 55200, 64800, 79200, 91200],
                    wood: [0, 15400, 23000, 28800, 36700, 44900, 55200, 64800, 79200, 91200],
                    cloth: [0, 15400, 23000, 28800, 36700, 44900, 55200, 64800, 79200, 91200],
                    money: [0, 6000000, 8800000, 10600000, 13200000, 16200000, 19600000, 23400000, 27600000, 32200000],
                    houseLvl: [0, 13, 15, 17, 19, 21, 23, 25, 27, 29]
                },
                {
                    name: "Ткацкая мастерская",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    metal: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    wood: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    cloth: [0, 4300, 8170, 12470, 20640, 33110, 49450, 70090, 95030, 123840],
                    money: [0, 800000, 1400000, 2200000, 6000000, 9800000, 12200000, 18200000, 23400000, 30200000],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
                {
                    name: "Каменная мастерская",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 4300, 8170, 12470, 20640, 33110, 49450, 70090, 95030, 123840],
                    metal: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    wood: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    cloth: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    money: [0, 800000, 1400000, 2200000, 6000000, 9800000, 12200000, 18200000, 23400000, 30200000],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
                {
                    name: "Плотницкая мастерская",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    metal: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    wood: [0, 4300, 8170, 12470, 20640, 33110, 49450, 70090, 95030, 123840],
                    cloth: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    money: [0, 800000, 1400000, 2200000, 6000000, 9800000, 12200000, 18200000, 23400000, 30200000],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
                {
                    name: "Нефритовая мастерская",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    metal: [0, 4300, 8170, 12470, 20640, 33110, 49450, 70090, 95030, 123840],
                    wood: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    cloth: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    money: [0, 800000, 1400000, 2200000, 6000000, 9800000, 12200000, 18200000, 23400000, 30200000],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
                {
                    name: "Ремесленная мастерская",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    metal: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    wood: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    cloth: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    money: [0, 800000, 1400000, 2200000, 6000000, 9800000, 12200000, 18200000, 23400000, 30200000],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
                {
                    name: "Ярмарка редкостей",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    metal: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    wood: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    cloth: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    money: [0, 800000, 1400000, 2200000, 6000000, 9800000, 12200000, 18200000, 23400000, 30200000],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
            ],
            resources: [
                {title: 'Еда', value: 0, href: 'calcs/house/food.png'},
                {title: 'Камень', value: 0, href: 'calcs/house/stone.png'},
                {title: 'Металл', value: 0, href: 'calcs/house/metal.png'},
                {title: 'Дерево', value: 0, href: 'calcs/house/wood.png'},
                {title: 'Ткань', value: 0, href: 'calcs/house/cloth.png'},
                {title: 'Серебро', value: 0, href: 'calcs/house/silver.png'},
                {title: 'Уровень дома', value: 0},
            ],
            selected: this.data.selected,
        };
    },
    props: {
        id: Number,
        data: Object,
        whitelist: Array,
        miniResultVisible: Boolean,
    },
    methods: {
        reset() {
            this.resources.forEach(el => {
                el.value = 0;
            });
        },
        calculate() {
            if(!this.isEmpty(this.selected)) {
                this.reset();
                for (let i = this.data.curLvl - 1; i <= this.data.reqLvl - 1; i++) {
                    this.resources[0].value += this.selected.food[i];
                    this.resources[1].value += this.selected.stone[i];
                    this.resources[2].value += this.selected.metal[i];
                    this.resources[3].value += this.selected.wood[i];
                    this.resources[4].value += this.selected.cloth[i];
                    this.resources[5].value += this.selected.money[i];
                };
                this.resources[6].value = +this.selected.houseLvl[this.data.reqLvl - 1];
                this.$emit('calculate', {id: this.id, resources: this.resources});
            }
        },
        removeForm() {
             this.$emit('removeForm', {id: this.id, name: this.selected.name});
        },
        increaseValue(name) {
            if(name == 'curLvl' && this.data.reqLvl - this.data.curLvl == 1) {
                this.$emit('increaseValue', {id: this.id, param: 'curLvl'});
                this.$emit('increaseValue', {id: this.id, param: 'reqLvl'});
            } else {
                this.$emit('increaseValue', {id: this.id, param: name});
            }
            this.calculate();
        },
        decreaseValue(name) {
            if(name == 'reqLvl' && this.data.reqLvl - this.data.curLvl == 1) {
                this.$emit('decreaseValue', {id: this.id, param: 'curLvl'});
                this.$emit('decreaseValue', {id: this.id, param: 'reqLvl'});
            } else {
                this.$emit('decreaseValue', {id: this.id, param: name});
            }
            this.calculate();
        },
        isEmpty(obj) { 
            for (let x in obj) { return false; }
            return true;
        },
    },
    computed: {
        filterSelect: function () {
            return this.houses.filter(x => !this.whitelist.includes(x.name) || x.name == this.selected.name);
        }
    },
    mounted() {
        this.calculate();
    },
    watch: {
        selected: function(newValue, oldValue) {
            this.$emit('switch', {id: this.id, new: newValue, old: oldValue});
            this.calculate();
        },
    },
    components: { 
        LevelChooser, 
        ResultList, 
    }
}
</script>
<style lang="scss" scoped>
.form {
    background-color: rgba(0, 0, 0, .7);

    &__close {
        font-size: 25px;
        cursor: pointer;
    }
}
</style>