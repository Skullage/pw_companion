<template>
    <div class="card">
        <div class="card__header">
            <h2 class="card__title">
                {{cloaks[id].title}}
            </h2>
            <my-button class="card__btn" :class="{card__btn__active: cloaks[id].isActive}" @click="selectGrade" v-if="id != cloaks.length - 1">У меня этот грейд</my-button>
        </div>
        <div class="card__content" v-if="id > grade">
            <div class="card__col">
                <h3 class="card__col-title">Необходимые ресурсы</h3>
                <ul class="card__resList">
                    <li class="card__resList-item" v-for="(res, index) in cloaks[id].reqResources" :key="index">
                        <div class="card__resList-item__icon">
                            <img :src="require(`@/assets/images/` + resources[resources.findIndex(item => item.title == res.title)].href)" :alt="res.title">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">{{res.title}}</h3>
                            <p class="card__resList-item__value">{{res.value.toLocaleString()}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card__col" v-if="id - grade == 1">
                <h3 class="card__col-title">Осталось нафармить</h3>
                <ul class="card__resList">
                    <li class="card__resList-item" v-for="(res, index) in cloaks[id].reqResources" :key="index">
                        <div class="card__resList-item__icon">
                            <img :src="require(`@/assets/images/` + resources[resources.findIndex(item => item.title == res.title)].href)" :alt="res.title">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">{{res.title}}</h3>
                            <p class="card__resList-item__value">{{leftResources[leftResources.findIndex(item => item.title == res.title)].value.toLocaleString()}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card__col" v-if="id - grade == 1">
                <h3 class="card__col-title">Осталось нафармить часов</h3>
                <ul class="card__resList">
                    <li class="card__resList-item">
                        <div class="card__resList-item__icon">
                            <img src="@/assets/images/calcs/cloak/sand.png" alt="Песочные часы">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">Песочные часы</h3> 
                            <p class="card__resList-item__value">{{leftResources[0].value.toLocaleString()}}</p>
                        </div>
                    </li>
                    <li class="card__resList-item">
                        <div class="card__resList-item__icon">
                            <img src="@/assets/images/calcs/cloak/sunClock.png" alt="Солнечные часы">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">Солнечные часы</h3> 
                            <p class="card__resList-item__value">{{leftResources[1].value.toLocaleString()}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card__col" v-if="id - grade != 1">
                <h3 class="card__col-title">Осталось нафармить с вашего грейда</h3>
                <ul class="card__resList">
                    <li class="card__resList-item" v-for="(res, index) in cloaks[id].reqResources" :key="index">
                        <div class="card__resList-item__icon">
                            <img :src="require(`@/assets/images/` + resources[resources.findIndex(item => item.title == res.title)].href)" :alt="res.title">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">{{res.title}}</h3> 
                            <p class="card__resList-item__value">
                                {{
                                    totalResources[totalResources.findIndex(item => item.title == res.title)].value.toLocaleString()
                                }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card__col" v-if="id - grade != 1">
                <h3 class="card__col-title">Осталось нафармить часов с вашего грейда</h3>
                <ul class="card__resList">
                    <li class="card__resList-item">
                        <div class="card__resList-item__icon">
                            <img src="@/assets/images/calcs/cloak/sand.png" alt="Песочные часы">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">Песочные часы</h3> 
                            <p class="card__resList-item__value">{{totalResources[0].value.toLocaleString()}}</p>
                        </div>
                    </li>
                    <li class="card__resList-item">
                        <div class="card__resList-item__icon">
                            <img src="@/assets/images/calcs/cloak/sunClock.png" alt="Солнечные часы">
                        </div>
                        <div class="card__resList-item__info">
                            <h3 class="card__resList-item__title">Солнечные часы</h3> 
                            <p class="card__resList-item__value">{{totalResources[1].value.toLocaleString()}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';

    export default {
        props: {
            id: Number,
            cloaks: Object,
            resources: Object,
            grade: Number,
        },
        components: {
            MyButton,
        },
        methods: {
            selectGrade() {
                this.$emit('selectGrade', this.id);
            },
        },
        computed: {
            totalResources: function() {
                this.totalReqRes = [
                    {title: 'Песочные часы', value: 0},
                    {title: 'Солнечные часы', value: 0},
                    {title: 'Облачная пряжа', value: 0},
                    {title: 'Небесная пряжа', value: 0},
                    {title: 'Солнечная пряжа', value: 0},
                    {title: 'Лунная пряжа', value: 0},
                    {title: 'Звездная пряжа', value: 0},
                    {title: 'Серебро', value: 0},
                ];
                for(this.counter = this.grade + 1; this.counter <= this.id; this.counter++) {
                    this.cloaks[this.counter].reqResources.forEach(el => {
                        if(this.resources[this.resources.findIndex(item => item.title == el.title)].price != undefined) {
                            this.totalReqRes[0].value += (el.value - this.resources[this.resources.findIndex(item => item.title == el.title)].value) * this.resources[this.resources.findIndex(item => item.title == el.title)].price.sandClock;
                            this.totalReqRes[1].value += (el.value - this.resources[this.resources.findIndex(item => item.title == el.title)].value) * this.resources[this.resources.findIndex(item => item.title == el.title)].price.sunClock;
                        }
                        this.totalReqRes[this.totalReqRes.findIndex(item => item.title == el.title)].value += el.value;
                    })
                }
                this.totalReqRes.forEach(el => {
                    el.value -= this.resources[this.resources.findIndex(item => item.title == el.title)].value;
                    if (el.value < 0) {
                        el.value = 0;
                    }
                })
                return this.totalReqRes;
            },
            leftResources: function() {
                this.leftReqRes = [
                    {title: 'Песочные часы', value: 0},
                    {title: 'Солнечные часы', value: 0},
                    {title: 'Облачная пряжа', value: 0},
                    {title: 'Небесная пряжа', value: 0},
                    {title: 'Солнечная пряжа', value: 0},
                    {title: 'Лунная пряжа', value: 0},
                    {title: 'Звездная пряжа', value: 0},
                    {title: 'Серебро', value: 0},
                ];
                this.cloaks[this.id].reqResources.forEach(el => {
                    if(this.resources[this.resources.findIndex(item => item.title == el.title)].price != undefined) {
                        this.leftReqRes[0].value += (el.value - this.resources[this.resources.findIndex(item => item.title == el.title)].value) * this.resources[this.resources.findIndex(item => item.title == el.title)].price.sandClock;
                        this.leftReqRes[1].value += (el.value - this.resources[this.resources.findIndex(item => item.title == el.title)].value) * this.resources[this.resources.findIndex(item => item.title == el.title)].price.sunClock;
                    }
                    this.leftReqRes[this.leftReqRes.findIndex(item => item.title == el.title)].value = el.value - this.resources[this.resources.findIndex(item => item.title == el.title)].value;
                })
                this.leftReqRes.forEach(el => {
                    if (el.value < 0) {
                        el.value = 0;
                    }
                })
                return this.leftReqRes;
            }
        },
        watch: {

        },
    }
</script>

<style lang="scss" scoped>
.card {
    padding: 20px 10px;
    border-top: 1px solid #000;
    width: 100%;

    &__header {
        display: flex;
        gap: 5px;
        margin-bottom: 20px;
    }

    &__btn {
        color: #000;
        font-size: 12px;
        border: 1px solid #000;
        border-radius: 5px;
        padding: 5px;

        &__active {
            background-color: #000!important;
            color: #fff!important;
        }
    }

    &__col-title {
        margin-bottom: 10px;
        height: 40px;
    }

    &__content {
        display: flex;
        gap: 20px;
        align-items:flex-start;
    }

    &__resList {
        list-style: none;

        &-item {
            border: 1px solid #000;
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
            display: flex;
            gap: 10px;
            align-items: center;

            &__info {
                text-align: left;
            }
            &__title {
                font-size: 16px;
                font-weight: 400;
            }
            &__value {
                font-size: 14px;
                font-weight: 400;
            }
        }
    }
}
</style>