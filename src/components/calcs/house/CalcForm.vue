<template>
    <form class="form" @submit.prevent>
        <button class="form__close" @click="removeForm">&#10006;</button>
        <div class="form__select-wrapper">
            <select class="form__select" v-model="selected" required>
            <option class="form__option" :value={} disabled>Выберите строение</option>
            <option class="form__option" v-for="(house, index) in filterSelect" :key="index" :value="house">
                {{house.name}}
            </option>
        </select>
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
import MyButton from '@/components/UI/MyButton.vue';
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
                    money: [0, 0.4, 1.2, 1.8, 4.2, 8.8, 12, 16.2, 21.8, 27.6],
                    houseLvl: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27]
                },
                {
                    name: "Пастбище",
                    food: [0, 3300, 4400, 5300, 6600, 8100, 9800, 11700, 13800, 16100],
                    stone: [0, 15400, 23000, 28800, 36700, 44900, 55200, 64800, 79200, 91200],
                    metal: [0, 15400, 23000, 28800, 36700, 44900, 55200, 64800, 79200, 91200],
                    wood: [0, 15400, 23000, 28800, 36700, 44900, 55200, 64800, 79200, 91200],
                    cloth: [0, 15400, 23000, 28800, 36700, 44900, 55200, 64800, 79200, 91200],
                    money: [0, 6, 8.8, 10.6, 13.2, 16.2, 19.6, 23.4, 27.6, 32.2],
                    houseLvl: [0, 13, 15, 17, 19, 21, 23, 25, 27, 29]
                },
                {
                    name: "Ткацкая мастерская",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    metal: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    wood: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    cloth: [0, 4300, 8170, 12470, 20640, 33110, 49450, 70090, 95030, 123840],
                    money: [0, 0.8, 1.4, 2.2, 6, 9.8, 12.2, 18.2, 23.4, 30.2],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
                {
                    name: "Каменная мастерская",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 4300, 8170, 12470, 20640, 33110, 49450, 70090, 95030, 123840],
                    metal: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    wood: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    cloth: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    money: [0, 0.8, 1.4, 2.2, 6, 9.8, 12.2, 18.2, 23.4, 30.2],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
                {
                    name: "Плотницкая мастерская",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    metal: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    wood: [0, 4300, 8170, 12470, 20640, 33110, 49450, 70090, 95030, 123840],
                    cloth: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    money: [0, 0.8, 1.4, 2.2, 6, 9.8, 12.2, 18.2, 23.4, 30.2],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
                {
                    name: "Нефритовая мастерская",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    metal: [0, 4300, 8170, 12470, 20640, 33110, 49450, 70090, 95030, 123840],
                    wood: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    cloth: [0, 1900, 3610, 5510, 9120, 14630, 21850, 30970, 41990, 54720],
                    money: [0, 0.8, 1.4, 2.2, 6, 9.8, 12.2, 18.2, 23.4, 30.2],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
                {
                    name: "Ремесленная мастерская",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    metal: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    wood: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    cloth: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    money: [0, 0.8, 1.4, 2.2, 6, 9.8, 13.2, 18.2, 23.4, 30.2],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
                {
                    name: "Ярмарка редкостей",
                    food: [0, 400, 700, 1100, 3000, 4900, 6600, 9100, 11700, 15100],
                    stone: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    metal: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    wood: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    cloth: [0, 4800, 7200, 12000, 19200, 28800, 40800, 55200, 72000, 91200],
                    money: [0, 0.8, 1.4, 2.2, 6, 9.8, 13.2, 18.2, 23.4, 30.2],
                    houseLvl: [0, 4, 7, 10, 13, 16, 19, 22, 25, 28]
                },
            ],
            resources: {
                food: 0,
                stone: 0,
                metal: 0,
                wood: 0,
                cloth: 0,
                money: 0,
                houseLvl: 0,
            },
            selected: this.data.selected,
            errorText: [],
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
            this.resources.food = 0;
            this.resources.stone = 0;
            this.resources.metal = 0;
            this.resources.wood = 0;
            this.resources.cloth = 0;
            this.resources.money = 0;
            this.errorText = [];
        },
        calculate() {
            if(!this.isEmpty(this.selected)) {
                this.reset();
                for (let i = this.data.curLvl - 1; i <= this.data.reqLvl - 1; i++) {
                    this.resources.food += this.selected.food[i];
                    this.resources.stone += this.selected.stone[i];
                    this.resources.metal += this.selected.metal[i];
                    this.resources.wood += this.selected.wood[i];
                    this.resources.cloth += this.selected.cloth[i];
                    this.resources.money += this.selected.money[i];
                };
                this.resources.houseLvl = +this.selected.houseLvl[this.data.reqLvl - 1];
                this.$emit('error', {isVisible: false});
                this.$emit('calculate', {id: this.id, food: this.resources.food, stone: this.resources.stone, metal: this.resources.metal, wood: this.resources.wood, cloth: this.resources.cloth, money: this.resources.money, houseLvl: this.resources.houseLvl,});
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
        MyButton,
        ResultList, 
    }
}
</script>
<style lang="scss" scoped>
.form {
    background-color: rgba(0, 0, 0, .7);
    padding: 40px 20px 20px;
    border-radius: 15px;
    position: relative;

    &__close {
        position: absolute;
        right: 0;
        top: 0;
        background-color: transparent;
        color: #fff;
        font-size: 25px;
        padding-top: 5px;
        padding-right: 10px;
        cursor: pointer;
    }

    &__select {
        appearance: none;
        margin-bottom: 10px;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #fff;
        color: #fff;
        padding: 5px;
        outline: none;
        cursor: pointer;
        font-size: 20px;
        width: 100%;
        
        
        &-wrapper {
            position: relative;

            &::after {
                content: "";
                width: 12px;
                height: 8px;
                background-color: #fff;
                clip-path: polygon(100% 0%, 0 0%, 50% 100%);
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -6px;
                pointer-events: none;
            }
        }
    }

    &__option {
        color: #fff;
        background-color: #000;
    }

    &__btn {
        width: 100%;
        height: 30px;
        text-transform: uppercase;
    }
}
</style>