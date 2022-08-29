<template>
    <div class="card mb-1 p-3">
        <div class="card__header d-flex mb-2 gap-2 align-items-center">
            <h2 class="card__title">
                {{items[id].title}}
            </h2>
            <grade-button :class="{grade__btn_active: items[id].isActive}" @click="selectGrade" v-if="id != items.length - 1" />
        </div>
        <div class="card__content row align-items-end" v-if="id > grade">
            <card-col :resources="resources" :object="{'blockName': 'Необходимые ресурсы', 'list': items[id].reqResources, 'value': items[id].reqResources}" />
            <card-col v-if="id - grade == 1" :resources="resources" :object="{'blockName': 'Осталось нафармить', 'list': leftResources, 'value': leftResources}" />
            <card-col v-if="id - grade != 1" :resources="resources" :object="{'blockName': 'Осталось нафармить с вашего грейда', 'list': totalResources, 'value': totalResources}" />
        </div>
    </div>
</template>

<script>
import CardCol from '@/components/CardCol.vue';
import GradeButton from '@/components/UI/GradeButton.vue';

    export default {
        props: {
            id: Number,
            items: Object,
            resources: Object,
            grade: Number,
        },
        components: {
            CardCol,
            GradeButton,
        },
        methods: {
            selectGrade() {
                this.$emit('selectGrade', this.id);
            },
        },
        computed: {
            totalResources() {
                this.totalReqRes = [
                    {title: 'Облачная пряжа', value: 0},
                    {title: 'Небесная пряжа', value: 0},
                    {title: 'Солнечная пряжа', value: 0},
                    {title: 'Лунная пряжа', value: 0},
                    {title: 'Звездная пряжа', value: 0},
                    {title: 'Серебро', value: 0},
                ];
                this.money = [
                    {title: 'Песочные часы', value: 0},
                    {title: 'Солнечные часы', value: 0},
                    {title: 'Серебро', value: 0}
                ]
                for(this.counter = this.grade + 1; this.counter <= this.id; this.counter++) {
                    this.items[this.counter].reqResources.forEach(el => {
                        this.totalReqRes.find(item => item.title == el.title).value += el.value;
                    })
                }
                this.totalReqRes.forEach(el => {
                    if(this.resources.find(item => item.title == el.title).price != undefined) {
                        this.money[0].value += (el.value - this.resources.find(item => item.title == el.title).value) * this.resources.find(item => item.title == el.title).price.sandClock;
                        this.money[1].value += (el.value - this.resources.find(item => item.title == el.title).value) * this.resources.find(item => item.title == el.title).price.sunClock;
                    } else {
                        this.money[2].value += el.value;
                    }
                })
                this.money.forEach(el => {
                    el.value -= this.resources.find(item => item.title == el.title).value;
                    if (el.value < 0) {
                        el.value = 0;
                    }
                })
                return this.money;
            },
            leftResources() {
                this.leftReqRes = [
                    {title: 'Песочные часы', value: 0},
                    {title: 'Солнечные часы', value: 0},
                    {title: 'Серебро', value: 0}
                ];
                this.items[this.id].reqResources.forEach(el => {
                    if(this.resources.find(item => item.title == el.title).price != undefined) {
                        this.leftReqRes[0].value += (el.value - this.resources.find(item => item.title == el.title).value) * this.resources.find(item => item.title == el.title).price.sandClock;
                        this.leftReqRes[1].value += (el.value - this.resources.find(item => item.title == el.title).value) * this.resources.find(item => item.title == el.title).price.sunClock;
                    } else {
                        this.leftReqRes[2].value += el.value;
                    }
                })
                this.leftReqRes.forEach(el => {
                    el.value -= this.resources.find(item => item.title == el.title).value;
                    if (el.value < 0) {
                        el.value = 0;
                    }
                })
                return this.leftReqRes;
            }
        },
    }
</script>