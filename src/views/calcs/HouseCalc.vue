<template>
<div class="content-wrap">
    <main class="main">
        <div class="grid">
            <calc-form @calculate="calculate" @increaseValue="increaseValue" @decreaseValue="decreaseValue" @removeForm="removeForm" @switch="changeSelect" @error="error" v-for="form in forms" :key="form.id" :id="form.id" :data="form.data" :whitelist="whitelist" :miniResultVisible="forms.length > 1" />
            <calc-form-empty @addForm="addForm" v-if="forms.length < 8" />
        </div>
    </main>
    <aside class="sidebar">
        <result-list :resources="resources" :title="forms.length > 1 ? 'Всего' : 'Необходимо'" />
    </aside>
</div>
</template>

<script>
import CalcForm from '@/components/calcs/house/CalcForm.vue';
import CalcFormEmpty from '@/components/calcs/house/CalcFormEmpty.vue';
import ResultList from '@/components/calcs/house/ResultList.vue';

export default {
    data() {
        return {
            resources: {
                food: 0,
                stone: 0,
                metal: 0,
                wood: 0,
                cloth: 0,
                money: 0,
                houseLvl: 0,
            },
            forms: localStorage.getItem('forms') != undefined ? JSON.parse(localStorage.getItem('forms')) : [{id: Date.now(), data:{curLvl: 1, reqLvl: 2, selected: {},}, resources:{food: 0, stone: 0, metal: 0, wood: 0, cloth: 0, money: 0, houseLvl: 0,},},],
            whitelist: localStorage.getItem('whitelist') != undefined ? JSON.parse(localStorage.getItem('whitelist')) : [],
        };
    },
    methods: {
        reset() {
            this.resources.food = 0;
            this.resources.stone = 0;
            this.resources.metal = 0;
            this.resources.wood = 0;
            this.resources.cloth = 0;
            this.resources.money = 0;
            this.resources.houseLvl = 0;
            this.errorText = [];
        },
        calculate(event) {
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources.food = event.food;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources.stone = event.stone;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources.metal = event.metal;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources.wood = event.wood;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources.cloth = event.cloth;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources.money = event.money;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources.houseLvl = event.houseLvl;

            this.sum();
        },
        sum() {
            this.reset();
            this.forms.forEach(el => {
                this.resources.food  += el.resources.food;
                this.resources.stone  += el.resources.stone;
                this.resources.metal  += el.resources.metal;
                this.resources.wood  += el.resources.wood;
                this.resources.cloth  += el.resources.cloth;
                this.resources.money  += el.resources.money;
                this.resources.houseLvl < el.resources.houseLvl ? this.resources.houseLvl = el.resources.houseLvl : this.resources.houseLvl;
            })
        },
        error(event) {
            this.$emit('error', event);
        },
        addForm() {
            this.forms.push(
                {
                    id: Date.now(),
                    data:{curLvl: 1, reqLvl: 2, selected: {},},
                    resources:{food: 0, stone: 0, metal: 0, wood: 0, cloth: 0, money: 0, houseLvl: 0,},
                }
            )
            this.remember();
        },
        removeForm(event) {
            this.whitelist.splice(this.whitelist.indexOf(event.name), 1)
            this.forms = this.forms.filter(x => x.id !== event.id);
            this.sum();
            this.remember();
        },
        changeSelect(event) {
            if(this.whitelist.includes(event.old.name)) {
                this.whitelist.splice(this.whitelist.indexOf(event.old.name), 1)
            }
            this.whitelist.push(event.new.name);
            this.forms[this.forms.findIndex(item => item.id == event.id)].data.selected = event.new;
            this.remember();
        },
        remember() {
            localStorage.setItem('forms', JSON.stringify(this.forms));
            localStorage.setItem('whitelist', JSON.stringify(this.whitelist));
        },
        increaseValue(event) {
            this.forms[this.forms.findIndex(item => item.id == event.id)].data[event.param] += 1;
            localStorage.setItem('forms', JSON.stringify(this.forms));
        },
        decreaseValue(event) {
            this.forms[this.forms.findIndex(item => item.id == event.id)].data[event.param] -= 1;
            localStorage.setItem('forms', JSON.stringify(this.forms));
        }
    },
    components: { 
        CalcForm, 
        CalcFormEmpty,
        ResultList,
    }
}
</script>
<style lang="scss" scoped>
.content-wrap {
    display: flex;
    flex: 1 1 auto;

    @media (max-width: 830px) {
        flex-wrap: wrap;
    }
}

.main {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    @media (max-width: 1400px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1125px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 630px) {
        grid-template-columns: 1fr;
    }
}

.sidebar {
    background-color: rgba(0, 0, 0, .9);
    padding: 10px 20px;

    @media (max-width: 830px) {
        width: 100%;
    }
}
</style>