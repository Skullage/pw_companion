<template>
    <div class="container">
        <div class="content-wrap">
            <main class="main">
                <button class="btn btn_icon btn-primary position-fixed top-50 end-0"  @click.prevent="showOffcanvasMenu()" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                <div class="grid">
                    <calc-form @calculate="calculate" @increaseValue="increaseValue" @decreaseValue="decreaseValue" @removeForm="removeForm" @switch="changeSelect" v-for="form in forms" :key="form.id" :id="form.id" :data="form.data" :whitelist="whitelist" :miniResultVisible="forms.length > 1" />
                    <calc-form-empty @addForm="addForm" v-if="forms.length < 8" />
                </div>
            </main>
            <aside class="border-start offcanvas offcanvas-end" :class="showMenu ? 'show' : ''" :style="{ visibility: showMenu ? 'visible' : 'hidden' }" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
                <h4 class="sidebar__title mb-0" id="offcanvasScrollingLabel">
                    Дом
                </h4>
                <button type="button" class="btn-close" @click="isShowSidebar = false" data-bs-dismiss="offcanvas" aria-label="Close" @click.prevent="showOffcanvasMenu()"></button>
            </div>
            <div class="offcanvas-body">
                <h5 class="sidebar__title text-center">
                    {{forms.length > 1 ? 'Всего' : 'Необходимо'}}
                </h5>
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
            showMenu: true
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
        showOffcanvasMenu(){
            this.showMenu ? this.showMenu = false : this.showMenu = true;
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
.btn_icon {
    width: 50px;
    height: 50px;
    border-radius: 0.375rem 0 0 0.375rem;
    z-index: 1000;
}
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
</style>