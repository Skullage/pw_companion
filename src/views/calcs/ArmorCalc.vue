<template>
<div class="content-wrap">
    <div class="container">
        <div class="content-wrap__inner">
            <main class="main">
                <armor-card v-for="(armor, index) in armors" @selectGrade="selectGrade" :armors="armors" :resources="resources" :key="index" :id="index" :grade="grade" :type="type" />
            </main>
            <aside class="sidebar">
                <h2 class="sidebar__title">
                    Тип брони
                </h2>
                <div class="btns-wrapper">
                    <button class="btn" :class="{btn_active: type == 0}" @click="type = 0"><img src="@/assets/images/calcs/armor/chest.png" alt="Нагрудник"></button>
                    <button class="btn" :class="{btn_active: type == 1}" @click="type = 1"><img src="@/assets/images/calcs/armor/pants.png" alt="Поножи"></button>
                    <button class="btn" :class="{btn_active: type == 2}" @click="type = 2"><img src="@/assets/images/calcs/armor/boots.png" alt="Ботинки"></button>
                    <button class="btn" :class="{btn_active: type == 3}" @click="type = 3"><img src="@/assets/images/calcs/armor/gloves.png" alt="Перчатки"></button>
                </div>
                <h2 class="sidebar__title">
                    Ресурсы в наличии
                </h2>
                <label class="sidebar__input-block" v-for="(res, index) in armors[type][3].reqResources" :key="index">
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
import ArmorCard from '@/components/calcs/armor/ArmorCard.vue';

export default {
    data() {
        return {
            resources: localStorage.getItem('armorResources') != undefined ? 
            JSON.parse(localStorage.getItem('armorResources'))
            :
            [
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
            armors: [
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
        };
    },
    methods: {
        error(event) {
            this.$emit('error', event);
        },
        remember() {
            localStorage.setItem('armorResources', JSON.stringify(this.resources));
        },
        selectGrade(event) {
            this.grade = event;
            if(event == 0 && this.armors[this.type][0].isActive) {
                this.armors[this.type].forEach(el => {
                    el.isActive = false;
                })
            } else {
                this.armors[this.type].forEach(el => {
                    el.isActive = false;
                })
                this.armors[this.type][event].isActive = true;
            }
        }
    },
    components: {
        ArmorCard,
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
    width: 48px;
    height: 48px;
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