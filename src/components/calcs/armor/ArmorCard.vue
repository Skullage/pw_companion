<template>
    <div class="card mb-2 p-3">
        <div class="card__header d-flex mb-2 gap-2 align-items-center">
            <h2 class="card__title">
                {{items[type][id].title}}
            </h2>
            <grade-button :class="{grade__btn_active: items[type][id].isActive}" @click="selectGrade" v-if="id != items[type].length - 1" />
        </div>
        <div class="card__content row align-items-start" v-if="id > grade">
            <card-col :resources="resources" :object="{'blockName': 'Необходимые ресурсы', 'list': items[type][id].altReqResources, 'value': items[type][id].altReqResources}" v-if="id == 1 && items[type][0].isActive" />
            <card-col :resources="resources" :object="{'blockName': 'Необходимые ресурсы', 'list': items[type][id].reqResources, 'value': items[type][id].reqResources}" v-else />
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
            type: Number,
        },
        components: {
            GradeButton,
            CardCol,
        },
        methods: {
            selectGrade() {
                this.$emit('selectGrade', this.id);
            },
        },
        computed: {
            totalResources: function() {
                this.totalReqRes = [];
                for(this.counter = this.grade + 1; this.counter <= this.id; this.counter++) {
                    this.counter == 1 && this.items[this.type][0].isActive ?
                    this.items[this.type][this.counter].altReqResources.forEach(el => {
                        if(!this.$store.state.blacklist.includes(el.title)) {
                            if(this.totalReqRes.find(item => item.title == el.title) == undefined) {
                                this.totalReqRes.push({title: el.title, value: el.value});
                            } else {
                                this.totalReqRes.find(item => item.title == el.title).value += el.value;
                            }
                        }
                    })
                    :
                    this.items[this.type][this.counter].reqResources.forEach(el => {
                        if(!this.$store.state.blacklist.includes(el.title)) {
                            if(this.totalReqRes.find(item => item.title == el.title) == undefined) {
                                this.totalReqRes.push({title: el.title, value: el.value});
                            } else {
                                this.totalReqRes.find(item => item.title == el.title).value += el.value;
                            }
                        }
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
                this.leftReqRes = [];
                if(this.items[this.type][0].isActive && this.id == 1) {
                    this.items[this.type][this.id].altReqResources.forEach(el => {
                        if(!this.$store.state.blacklist.includes(el.title)) {
                            this.leftReqRes.push({title: el.title, value: el.value - this.resources.find(item => item.title == el.title).value})
                        }
                    })
                } else {
                    this.items[this.type][this.id].reqResources.forEach(el => {
                        if(!this.$store.state.blacklist.includes(el.title)) {
                            this.leftReqRes.push({title: el.title, value: el.value - this.resources.find(item => item.title == el.title).value})
                        }
                    })
                }
                this.leftReqRes.forEach(el => {
                    if (el.value < 0) {
                        el.value = 0;
                    }
                })
                return this.leftReqRes;
            },
        },
    }
</script>