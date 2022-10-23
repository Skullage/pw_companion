<template>
<div class="container">
    <div class="row">
        <main class="main">
            <offcanvas-button @click.prevent="$store.commit('toggleMenu')" />
            <div class="grid">
                <TransitionGroup name="list">
                    <calc-form @calculate="calculate" @increaseValue="increaseValue" @decreaseValue="decreaseValue" @removeForm="removeForm" @switch="changeSelect" v-for="form in forms" :key="form.id" :id="form.id" :data="form.data" :whitelist="whitelist" :miniResultVisible="forms.length > 1" />
                    <calc-form-empty @addForm="addForm" v-if="forms.length < 8" />
                </TransitionGroup>
            </div>
        </main>
        <aside class="border-start offcanvas offcanvas-end" :class="$store.state.showMenu ? 'show' : ''" :style="{ visibility: $store.state.showMenu ? 'visible' : 'hidden' }" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
                <h4 class="sidebar__title mb-0" id="offcanvasScrollingLabel">
                    Дом
                </h4>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click.prevent="$store.commit('toggleMenu')"></button>
            </div>
            <div class="offcanvas-body">
                <Transition name="title" mode="out-in">
                    <h5 class="sidebar__title text-center" v-if="forms.length > 1">
                        Всего
                    </h5>
                    <h5 class="sidebar__title text-center" v-else>
                        Необходимо
                    </h5>
                </Transition>
                <result-list :resources="resources" />
            </div>
        </aside>
    </div>
</div>
</template>

<script>
import CalcForm from '@/components/calcs/house/CalcForm.vue';
import CalcFormEmpty from '@/components/calcs/house/CalcFormEmpty.vue';
import ResultList from '@/components/calcs/house/ResultList.vue';
import OffcanvasButton from '@/components/UI/OffcanvasButton.vue';

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
            forms: localStorage.getItem('forms') != undefined ? JSON.parse(localStorage.getItem('forms')) 
            : 
            [
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
        },
    },
    mounted() {
        if(localStorage.whitelist) {
            this.whitelist = JSON.parse(localStorage.getItem('whitelist'));
        }
    },
    components: { 
        CalcForm, 
        CalcFormEmpty,
        ResultList,
        OffcanvasButton,
    }
}
</script>
<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
.list-leave-active {
  transition: all 0.5s ease;
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-enter-active {
  transition: opacity 1.5s ease;
}
.list-enter-from {
  opacity: 0;
}

.title-enter-active,
.title-leave-active {
  transition: opacity 0.3s ease;
}
.title-enter-from,
.title-leave-to {
  opacity: 0;
}
</style>