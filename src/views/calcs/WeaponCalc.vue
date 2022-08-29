<template>
<div class="container">
    <div class="row">
        <main class="main">
            <button class="btn btn_icon btn-primary position-fixed top-50 end-0"  @click.prevent="showOffcanvasMenu()" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button>
            <weapon-card v-for="(item, index) in items" @selectGrade="selectGrade" :items="items" :resources="resources" :key="index" :id="index" :grade="grade" />
        </main>
        <aside class="border-start offcanvas offcanvas-end" :class="showMenu ? 'show' : ''" :style="{ visibility: showMenu ? 'visible' : 'hidden' }" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
                <h4 class="sidebar__title mb-0" id="offcanvasScrollingLabel">
                    Домопуха
                </h4>
                <button type="button" class="btn-close" @click="isShowSidebar = false" data-bs-dismiss="offcanvas" aria-label="Close" @click.prevent="showOffcanvasMenu()"></button>
            </div>
            <div class="offcanvas-body">
                <h5 class="sidebar__title text-center">
                    Ресурсы в наличии
                </h5>
                    <sidebar-input v-for="(res, index) in resources" @remember="remember" :resource="res" :key="index" />
            </div>
        </aside>
    </div>
</div>
</template>

<script>
import WeaponCard from '@/components/calcs/weapon/WeaponCard.vue';
import SidebarInput from '@/components/UI/SidebarInput.vue';

export default {
    data() {
        return {
            resources: [
                {title: 'Кровавый камень', value: '', href: 'calcs/weapon/bloodstone.png'},
                {title: 'Огненный камень', value: '', href: 'calcs/weapon/firestone.png'},
                {title: 'Небесная яшма', value: '', href: 'calcs/weapon/jasper.png'},
                {title: 'Темные кости Линсю', value: '', href: 'calcs/weapon/bone.png'},
                {title: 'Эссенция власти Линсю', value: '', href: 'calcs/weapon/essence.png'},
                {title: 'Дерево еретика Линсю', value: '', href: 'calcs/weapon/wood.png'},
                {title: 'Серебро', value: '', href: 'calcs/house/silver.png'},
            ],
            grade: 0,
            items: [
                {
                    id: 0,
                    title: 'Базовый',
                    isActive: true,
                },
                {
                    id: 1,
                    title: 'Первый грейд (30 па)',
                    reqResources: [
                        {title: 'Кровавый камень', value: 400},
                        {title: 'Огненный камень', value: 240},
                        {title: 'Небесная яшма', value: 120},
                        {title: 'Серебро', value: 20000000},
                    ],
                    isActive: false,
                },
                {
                    id: 2,
                    title: 'Второй грейд (40 па)',
                    reqResources: [
                        {title: 'Кровавый камень', value: 1600},
                        {title: 'Огненный камень', value: 960},
                        {title: 'Небесная яшма', value: 200},
                        {title: 'Дерево еретика Линсю', value: 70},
                        {title: 'Серебро', value: 50000000},
                    ],
                    isActive: false,
                },
                {
                    id: 3,
                    title: 'Третий грейд (70 па)',
                    reqResources: [
                        {title: 'Кровавый камень', value: 1800},
                        {title: 'Огненный камень', value: 1080},
                        {title: 'Небесная яшма', value: 333},
                        {title: 'Дерево еретика Линсю', value: 108},
                        {title: 'Темные кости Линсю', value: 25},
                        {title: 'Серебро', value: 90000000},
                    ],
                    isActive: false,
                },
                {
                    id: 4,
                    title: 'Четвертый грейд (80 па)',
                    reqResources: [
                        {title: 'Кровавый камень', value: 2200},
                        {title: 'Огненный камень', value: 1320},
                        {title: 'Небесная яшма', value: 392},
                        {title: 'Дерево еретика Линсю', value: 122},
                        {title: 'Темные кости Линсю', value: 36},
                        {title: 'Эссенция власти Линсю', value: 13},
                        {title: 'Серебро', value: 160000000},
                    ],
                    isActive: false,
                },
            ],
            showMenu: true
        };
    },
    methods: {
        remember() {
            localStorage.setItem('weaponResources', JSON.stringify(this.resources));
        },
        selectGrade(event) {
            this.grade = event;
            this.items.forEach(el => {
                el.isActive = false;
            })
            this.items[event].isActive = true;
        },
        showOffcanvasMenu(){
            this.showMenu ? this.showMenu = false : this.showMenu = true;
        }
    },
    mounted() {
        if(localStorage.weaponResources) {
            this.resources = JSON.parse(localStorage.getItem('weaponResources'));
        }
    },
    components: {
        WeaponCard,
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
</style>