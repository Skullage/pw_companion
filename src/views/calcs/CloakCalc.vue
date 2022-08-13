<template>
<div class="content-wrap">
    <div class="container">
        <div class="content-wrap__inner">
            <main class="main">
                <cloak-card v-for="(cloak, index) in cloaks" @selectGrade="selectGrade" :cloaks="cloaks" :resources="resources" :key="index" :id="index" :grade="grade" />
            </main>
            <aside class="sidebar">
                <h2 class="sidebar__title">
                    Ресурсы в наличии
                </h2>
                <label class="sidebar__input-block" v-for="(res, index) in resources" :key="index">
                    <div class="sidebar__input-block-icon">
                        <img :src="require(`@/assets/images/` + resources[resources.findIndex(function getId(item) { return item.title == res.title})].href)" :alt="res.title">
                    </div>
                    <div class="sidebar__input-block-info">
                        <h3 class="sidebar__input-block-title">{{res.title}}</h3>
                        <input class="sidebar__input" type="number" @input="remember" v-model="resources[resources.findIndex(function getId(item) { return item.title == res.title})].value" placeholder="0">
                    </div>
                </label>
            </aside>
        </div>
    </div>
</div>
</template>

<script>
import CloakCard from '@/components/calcs/cloak/CloakCard.vue';

export default {
    data() {
        return {
            resources: localStorage.getItem('cloakResources') != undefined ? 
            JSON.parse(localStorage.getItem('cloakResources'))
            :
            [
                {title: 'Облачная пряжа', value: '', price: {sandClock: 1, sunClock: 0}, href: 'calcs/cloak/cloud.png'},
                {title: 'Небесная пряжа', value: '', price: {sandClock: 10, sunClock: 0}, href: 'calcs/cloak/sky.png'},
                {title: 'Солнечная пряжа', value: '', price: {sandClock: 75, sunClock: 0}, href: 'calcs/cloak/sun.png'},
                {title: 'Лунная пряжа', value: '', price: {sandClock: 500, sunClock: 5}, href: 'calcs/cloak/moon.png'},
                {title: 'Звездная пряжа', value: '', price: {sandClock: 2500, sunClock: 20}, href: 'calcs/cloak/star.png'},
                {title: 'Песочные часы', value: '', href: 'calcs/cloak/sand.png'},
                {title: 'Солнечные часы', value: '', href: 'calcs/cloak/sunClock.png'},
                {title: 'Серебро', value: '', href: 'calcs/house/silver.png'},
            ],
            grade: -1,
            cloaks: [
                {
                    title: 'Базовый',
                    reqResources: [
                        {title: 'Облачная пряжа', value: 100},
                        {title: 'Серебро', value: 5000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Первый грейд (ПЗ)',
                    reqResources: [
                        {title: 'Облачная пряжа', value: 500},
                        {title: 'Небесная пряжа', value: 150},
                        {title: 'Серебро', value: 10000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Второй грейд (ПА&ПЗ)',
                    reqResources: [
                        {title: 'Облачная пряжа', value: 1000},
                        {title: 'Небесная пряжа', value: 275},
                        {title: 'Солнечная пряжа', value: 50},
                        {title: 'Серебро', value: 20000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Третий грейд (Аспид/Пение)',
                    reqResources: [
                        {title: 'Облачная пряжа', value: 2000},
                        {title: 'Небесная пряжа', value: 450},
                        {title: 'Солнечная пряжа', value: 80},
                        {title: 'Лунная пряжа', value: 15},
                        {title: 'Серебро', value: 50000000},
                    ],
                    isActive: false,
                },
                {
                    title: 'Третий грейд (БД)',
                    reqResources: [
                        {title: 'Облачная пряжа', value: 4500},
                        {title: 'Небесная пряжа', value: 675},
                        {title: 'Солнечная пряжа', value: 150},
                        {title: 'Лунная пряжа', value: 25},
                        {title: 'Звездная пряжа', value: 6},
                        {title: 'Серебро', value: 80000000},
                    ],
                    isActive: false,
                },
            ],
        };
    },
    methods: {
        error(event) {
            this.$emit('error', event);
        },
        remember() {
            localStorage.setItem('cloakResources', JSON.stringify(this.resources));
        },
        selectGrade(event) {
            if(this.cloaks[event].isActive) {
                this.cloaks.forEach(el => {
                    el.isActive = false;
                })
                this.grade = -1;
            } else {
                this.cloaks.forEach(el => {
                    el.isActive = false;
                })
                this.cloaks[event].isActive = true;
                this.grade = event;
            }
        }
    },
    components: {
        CloakCard,
    }
}
</script>
<style lang="scss" scoped>
.content-wrap {
    flex: 1 1 auto;

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
    padding: 40px 20px;
    color: #000;
}

.sidebar {
    padding: 10px 20px;
    border-left: 1px solid #000;

    &__input-block {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        gap: 10px;
        background-color: #fff;
        align-items: center;
        height: 50px;
        border: 1px solid black;
        border-radius: 5px;

        &:focus-within {
            border: 1px solid red!important;
        }

        &-icon {
            width: 50px;
            height: 100%;
            flex-shrink: 0;
            display: block;

            img {
                width: 50px;
                height: 100%;
            }
        }

        &-info {
            text-align: left;
        }

        &-title {
            font-size: 14px;
            font-weight: 400;
            color: #000;
            margin-left: 5px;
        }
    }

    &__title {
        color: #000;
        margin-bottom: 10px;
    }

    &__input {
        padding: 5px;
        margin-right: 10px;
        appearance: none;
        -moz-appearance: textfield;
        outline: none;

        &:hover, &:focus {
            appearance: none;
            -moz-appearance: number-input;
        }
        
        

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }

    @media (max-width: 830px) {
        width: 100%;
    }
}

.btns-wrapper {
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 10px;
    margin-bottom: 10px;
}

.btn {
    width: 32px;
    height: 32px;
    border: 1px solid transparent;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    &_active {
        border: 1px solid red;
    }
}
</style>