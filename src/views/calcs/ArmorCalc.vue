<template>
<div class="container">
    <div class="content-wrap row">
        <main class="main">
            <button class="btn btn_icon btn-primary position-fixed top-50 end-0"  @click.prevent="showOffcanvasMenu()" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button>
            <armor-card v-for="(item, index) in items" @selectGrade="selectGrade" :items="items" :resources="resources" :key="index" :id="index" :grade="grade" :type="type" />
        </main>
        <aside class="border-start offcanvas offcanvas-end" :class="showMenu ? 'show' : ''" :style="{ visibility: showMenu ? 'visible' : 'hidden' }" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
                <h4 class="sidebar__title mb-0" id="offcanvasScrollingLabel">
                    Сумеречная экипировка
                </h4>
                <button type="button" class="btn-close" @click="isShowSidebar = false" data-bs-dismiss="offcanvas" aria-label="Close" @click.prevent="showOffcanvasMenu()"></button>
            </div>
            <div class="offcanvas-body">
                <h5 class="sidebar__title text-center mb-2">
                    Тип брони
                </h5>
                <div class="btns-wrapper mb-3 d-flex gap-2 justify-content-center">
                    <button class="btn btn_type p-0" :class="{btn_active: type == 0}" @click="type = 0"><img src="@/assets/images/calcs/armor/chest.png" class="img-fluid" alt="Нагрудник"></button>
                    <button class="btn btn_type p-0" :class="{btn_active: type == 1}" @click="type = 1"><img src="@/assets/images/calcs/armor/pants.png" class="img-fluid" alt="Поножи"></button>
                    <button class="btn btn_type p-0" :class="{btn_active: type == 2}" @click="type = 2"><img src="@/assets/images/calcs/armor/boots.png" class="img-fluid" alt="Ботинки"></button>
                    <button class="btn btn_type p-0" :class="{btn_active: type == 3}" @click="type = 3"><img src="@/assets/images/calcs/armor/gloves.png" class="img-fluid" alt="Перчатки"></button>
                </div>
                <h5 class="sidebar__title text-center">
                    Ресурсы в наличии
                </h5>
                <sidebar-input v-for="(res, index) in getSidebarRes" @remember="remember" :resource="res" :key="index" />
            </div>
        </aside>
    </div>
</div>
</template>

<script>
import ArmorCard from '@/components/calcs/armor/ArmorCard.vue';
import SidebarInput from '@/components/UI/SidebarInput.vue';

export default {
    data() {
        return {
            resources: [
                {title: 'Печатка сумерек', value: '', href: 'calcs/armor/signet.png'},
                {title: 'Зола мира грез', value: '', href: 'calcs/armor/ash.png'},
                {title: 'Лезвие демона', value: '', href: 'calcs/armor/blade.png'},
                {title: 'Коварство министра', value: '', href: 'calcs/armor/cunning.png'},
                {title: 'Королевская слава', value: '', href: 'calcs/armor/glory.png'},
                {title: 'Поцелуй владычицы', value: '', href: 'calcs/armor/kiss.png'},
                {title: 'Смерть древнего демона', value: '', href: 'calcs/armor/death.png'},
                {title: 'Хрономатериал', value: '', href: 'calcs/armor/chrono.png'},
                {title: 'Фрагмент Колеса Судьбы', value: '', href: 'calcs/armor/wheel.png'},
                {title: 'Плащ "Королевские крылья"', value: '', href: 'calcs/armor/cloak.png'},
                {title: 'Верное сердце Элмсли', value: '', href: 'calcs/armor/heart.png'},
                {title: 'Ложь Владычицы Грез', value: '', href: 'calcs/armor/lie.png'},
                {title: 'Маска Цзи Чжунь', value: '', href: 'calcs/armor/mask.png'},
                {title: 'Горе династии', value: '', href: 'calcs/armor/grief.png'},
                {title: 'Боевой дух Элмсли', value: '', href: 'calcs/armor/spirit.png'},
                {title: 'Королевский лук', value: '', href: 'calcs/armor/bow.png'},
                {title: 'Королевский посох', value: '', href: 'calcs/armor/staff.png'},
                {title: 'Свет Хуанлинь', value: '', href: 'calcs/armor/light.png'},
                {title: 'Фрагмент опала', value: '', href: 'calcs/armor/opal.png'},
                {title: 'Золото', value: '', href: 'calcs/house/silver.png'},
            ],
            grade: 0,
            items: [
                [
                    {
                        id: 0,
                        title: 'Р8р2',
                        isActive: false,
                    },
                    {
                        id: 1,
                        title: 'Первый грейд',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 320},
                            {title: 'Зола мира грез', value: 180},
                            {title: 'Смерть древнего демона', value: 20},
                            {title: 'Хрономатериал', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        altReqResources: [
                            {title: 'Печатка сумерек', value: 48},
                            {title: 'Зола мира грез', value: 27},
                            {title: 'Смерть древнего демона', value: 3},
                            {title: 'Хрономатериал', value: 50},
                            {title: 'Золото', value: 1000000},   
                        ],
                        isActive: false,
                    },
                    {
                        id: 2,
                        title: 'Второй грейд/р9р3',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 400},
                            {title: 'Зола мира грез', value: 200},
                            {title: 'Смерть древнего демона', value: 20},
                            {title: 'Хрономатериал', value: 200},
                            {title: 'Фрагмент Колеса Судьбы', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        isActive: false,
                    },
                    {
                        id: 3,
                        title: 'Третий грейд',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 800},
                            {title: 'Зола мира грез', value: 400},
                            {title: 'Смерть древнего демона', value: 40},
                            {title: 'Хрономатериал', value: 1200},
                            {title: 'Фрагмент Колеса Судьбы', value: 100},
                            {title: 'Плащ "Королевские крылья"', value: 320},
                            {title: 'Верное сердце Элмсли', value: 35},
                            {title: 'Фрагмент опала', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        isActive: false,
                    },
                ],
                [
                    {
                        id: 0,
                        title: 'Р8р2',
                        isActive: false,
                    },
                    {
                        id: 1,
                        title: 'Первый грейд',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 320},
                            {title: 'Лезвие демона', value: 180},
                            {title: 'Ложь Владычицы Грез', value: 20},
                            {title: 'Хрономатериал', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        altReqResources: [
                            {title: 'Печатка сумерек', value: 48},
                            {title: 'Лезвие демона', value: 27},
                            {title: 'Ложь Владычицы Грез', value: 3},
                            {title: 'Хрономатериал', value: 50},
                            {title: 'Золото', value: 1000000},   
                        ],
                        isActive: false,
                    },
                    {
                        id: 2,
                        title: 'Второй грейд/р9р3',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 400},
                            {title: 'Лезвие демона', value: 200},
                            {title: 'Ложь Владычицы Грез', value: 20},
                            {title: 'Хрономатериал', value: 200},
                            {title: 'Фрагмент Колеса Судьбы', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        isActive: false,
                    },
                    {
                        id: 3,
                        title: 'Третий грейд',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 800},
                            {title: 'Лезвие демона', value: 400},
                            {title: 'Ложь Владычицы Грез', value: 40},
                            {title: 'Хрономатериал', value: 1200},
                            {title: 'Фрагмент Колеса Судьбы', value: 100},
                            {title: 'Боевой дух Элмсли', value: 320},
                            {title: 'Королевский лук', value: 35},
                            {title: 'Фрагмент опала', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        isActive: false,
                    },
                ],
                [
                    {
                        id: 0,
                        title: 'Р8р2',
                        isActive: false,
                    },
                    {
                        id: 1,
                        title: 'Первый грейд',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 320},
                            {title: 'Королевская слава', value: 180},
                            {title: 'Маска Цзи Чжунь', value: 20},
                            {title: 'Хрономатериал', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        altReqResources: [
                            {title: 'Печатка сумерек', value: 48},
                            {title: 'Королевская слава', value: 27},
                            {title: 'Маска Цзи Чжунь', value: 3},
                            {title: 'Хрономатериал', value: 50},
                            {title: 'Золото', value: 1000000},   
                        ],
                        isActive: false,
                    },
                    {
                        id: 2,
                        title: 'Второй грейд/р9р3',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 400},
                            {title: 'Королевская слава', value: 200},
                            {title: 'Маска Цзи Чжунь', value: 20},
                            {title: 'Хрономатериал', value: 200},
                            {title: 'Фрагмент Колеса Судьбы', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        isActive: false,
                    },
                    {
                        id: 3,
                        title: 'Третий грейд',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 800},
                            {title: 'Королевская слава', value: 400},
                            {title: 'Маска Цзи Чжунь', value: 40},
                            {title: 'Хрономатериал', value: 1200},
                            {title: 'Фрагмент Колеса Судьбы', value: 100},
                            {title: 'Поцелуй владычицы', value: 320},
                            {title: 'Королевский посох', value: 35},
                            {title: 'Фрагмент опала', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        isActive: false,
                    },
                ],
                [
                    {
                        id: 0,
                        title: 'Р8р2',
                        isActive: false,
                    },
                    {
                        id: 1,
                        title: 'Первый грейд',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 320},
                            {title: 'Коварство министра', value: 180},
                            {title: 'Горе династии', value: 20},
                            {title: 'Хрономатериал', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        altReqResources: [
                            {title: 'Печатка сумерек', value: 48},
                            {title: 'Коварство министра', value: 27},
                            {title: 'Горе династии', value: 3},
                            {title: 'Хрономатериал', value: 50},
                            {title: 'Золото', value: 1000000},   
                        ],
                        isActive: false,
                    },
                    {
                        id: 2,
                        title: 'Второй грейд/р9р3',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 400},
                            {title: 'Коварство министра', value: 200},
                            {title: 'Горе династии', value: 20},
                            {title: 'Хрономатериал', value: 200},
                            {title: 'Фрагмент Колеса Судьбы', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        isActive: false,
                    },
                    {
                        id: 3,
                        title: 'Третий грейд',
                        reqResources: [
                            {title: 'Печатка сумерек', value: 800},
                            {title: 'Коварство министра', value: 400},
                            {title: 'Горе династии', value: 40},
                            {title: 'Хрономатериал', value: 1200},
                            {title: 'Фрагмент Колеса Судьбы', value: 100},
                            {title: 'Плащ "Королевские крылья"', value: 320},
                            {title: 'Свет Хуанлинь', value: 35},
                            {title: 'Фрагмент опала', value: 100},
                            {title: 'Золото', value: 1000000},
                        ],
                        isActive: false,
                    },
                ],
            ],
            type: 0,
            showMenu: true
        };
    },
    methods: {
        remember() {
            localStorage.setItem('armorResources', JSON.stringify(this.resources));
        },
        selectGrade(event) {
            if(this.items[this.type][event].isActive) {
                this.items[this.type].forEach(el => {
                    el.isActive = false;
                })
                this.grade = 0;
            } else {
                this.items[this.type].forEach(el => {
                    el.isActive = false;
                })
                this.items[this.type][event].isActive = true;
                this.grade = event;
            }
        },
        showOffcanvasMenu(){
            this.showMenu ? this.showMenu = false : this.showMenu = true;
        }
    },
    mounted() {
        if(localStorage.armorResources) {
            this.resources = JSON.parse(localStorage.getItem('armorResources'));
        };

    },
    computed: {
        getSidebarRes() {
            let sidebarRes = [];
            this.items[this.type][3].reqResources.forEach(el => {
                sidebarRes.push(this.resources.find(item => item.title == el.title));
            })
            return sidebarRes;
        },
    },
    components: {
        ArmorCard,
        SidebarInput,
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

.btn_type {
    width: 50px;
    height: 50px;
    border: 2px solid transparent;
}

.btn_active {
    border: 2px solid red;
}
</style>