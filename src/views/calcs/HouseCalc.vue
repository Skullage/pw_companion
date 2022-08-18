<template>
<div class="content-wrap">
    <div class="container">
        <div class="content-wrap__inner">
            <main class="main">
                <div class="grid">
                    <calc-form @calculate="calculate" @increaseValue="increaseValue" @decreaseValue="decreaseValue" @removeForm="removeForm" @switch="changeSelect" v-for="form in forms" :key="form.id" :id="form.id" :data="form.data" :whitelist="whitelist" :miniResultVisible="forms.length > 1" />
                    <calc-form-empty @addForm="addForm" v-if="forms.length < 8" />
                </div>
            </main>
            <aside class="sidebar">
                <result-list :resources="resources" :title="forms.length > 1 ? 'Всего' : 'Необходимо'" />
            </aside>
        </div>
    </div>

</div>
</template>

<script>
import CalcForm from '@/components/calcs/house/CalcForm.vue';
import CalcFormEmpty from '@/components/calcs/house/CalcFormEmpty.vue';
import ResultList from '@/components/calcs/house/ResultList.vue';

export default {
    data() {
        return {
            resources: [
                {title: 'Еда', value: 0, href: 'calcs/house/food.png'},
                {title: 'Камень', value: 0, href: 'calcs/house/stone.png'},
                {title: 'Металл', value: 0, href: 'calcs/house/metal.png'},
                {title: 'Дерево', value: 0, href: 'calcs/house/wood.png'},
                {title: 'Ткань', value: 0, href: 'calcs/house/cloth.png'},
                {title: 'Серебро', value: 0, href: 'calcs/house/silver.png'},
                {title: 'Уровень дома', value: 0},
            ],
            forms: [
                {
                    id: Date.now(), 
                    data: {
                        curLvl: 1, 
                        reqLvl: 2, 
                        selected: {},
                    }, 
                    resources: [
                        {title: 'Еда', value: 0},
                        {title: 'Камень', value: 0},
                        {title: 'Металл', value: 0},
                        {title: 'Дерево', value: 0},
                        {title: 'Ткань', value: 0},
                        {title: 'Серебро', value: 0},
                        {title: 'Уровень дома', value: 0},
                    ],
                },
              ],
            whitelist: [],
        };
    },
    methods: {
        reset() {
            this.resources.forEach(el => {
                el.value = 0;
            });
            this.$store.commit('error/clearErrorText');
        },
        calculate(event) {
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources[0].value = event.resources[0].value;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources[1].value = event.resources[1].value;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources[2].value = event.resources[2].value;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources[3].value = event.resources[3].value;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources[4].value = event.resources[4].value;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources[5].value = event.resources[5].value;
            this.forms[this.forms.findIndex(item => item.id == event.id)].resources[6].value = event.resources[6].value;
            this.sum();
        },
        sum() {
            this.reset();
            this.forms.forEach(el => {
                this.resources[0].value  += el.resources[0].value;
                this.resources[1].value  += el.resources[1].value;
                this.resources[2].value  += el.resources[2].value;
                this.resources[3].value  += el.resources[3].value;
                this.resources[4].value  += el.resources[4].value;
                this.resources[5].value  += el.resources[5].value;
                this.resources[6].value < el.resources[6].value ? this.resources[6].value = el.resources[6].value : this.resources[6].value;
            })
        },
        addForm() {
            this.forms.push(
                {
                    id: Date.now(),
                    data:{curLvl: 1, reqLvl: 2, selected: {},},
                    resources: [
                        {title: 'Еда', value: 0},
                        {title: 'Камень', value: 0},
                        {title: 'Металл', value: 0},
                        {title: 'Дерево', value: 0},
                        {title: 'Ткань', value: 0},
                        {title: 'Серебро', value: 0},
                        {title: 'Уровень дома', value: 0},
                    ],
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
    mounted() {
        if(localStorage.whitelist) {
            this.whitelist = JSON.parse(localStorage.getItem('whitelist'));
        }
        if(localStorage.forms) {
            this.forms = JSON.parse(localStorage.getItem('forms'));
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
    flex: 1 1 auto;
    color: #000;

    &__inner {
        display: flex;
        gap: 50px;

        @media (max-width: 830px) {
            flex-wrap: wrap;
        }
    }
}

.main {
    flex: 1 1 75%;
    padding: 40px 20px
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
    padding: 10px 20px;
    border-left: 1px solid #000;
    flex-grow: 1;

    @media (max-width: 830px) {
        width: 100%;
    }
}
</style>