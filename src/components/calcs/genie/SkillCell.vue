<template>
    <div @click="click" class="icon position-relative" :class="[getIconClass, {'disabled': disabled, 'selected': selected}]">
        <div class="hint d-none position-absolute p-2 bg-dark text-white rounded" :class="[skill.category < 8 ? 'top-0' : 'bottom-0', itemRowId < 5 ? 'left-0' : 'right-0']">
            <div class="hint__header d-flex justify-content-between align-items-center">
                <h5 class="mb-1">{{skill.title}}</h5>
                <div class="hint__icon" :class="getIconClass"></div>
                {{isElementsPointEnough}}
            </div>
            <p>
                <span class="text-warning" v-if="skill.info.reqElements.MT > 0">MT: {{skill.info.reqElements.MT}}</span>  
                <span class="text-success" v-if="skill.info.reqElements.WD > 0"> WD: {{skill.info.reqElements.WD}}</span> 
                <span class="text-brown" v-if="skill.info.reqElements.ER > 0"> ER: {{skill.info.reqElements.ER}}</span> 
                <span class="text-info" v-if="skill.info.reqElements.WT > 0"> WT: {{skill.info.reqElements.WT}}</span> 
                <span class="text-danger" v-if="skill.info.reqElements.FR > 0"> FR: {{skill.info.reqElements.FR}}</span>   
            </p>
            <div class="info mb-4">
                <p class="mb-1 text-warning">Необходимый уровень: <span class="text-white">{{skill.info.reqLevel}}</span></p>
                <p class="mb-1 text-warning" v-if="skill.info.range > 0">Дальность: <span class="text-white">{{skill.info.range}}</span> м.</p>
                <p class="mb-1 text-warning">Затраты энергии: <span class="text-white">{{skill.info.energy}}</span></p>
                <p class="mb-1 text-warning">Затраты физической силы: <span class="text-white">{{skill.info.stamina}}</span></p>
                <p class="mb-1 text-warning">Перезарядка: <span class="text-white">{{skill.info.cd}}</span> сек.</p>
                <p class="mb-1 text-warning" v-if="skill.info.allowUse != undefined">Ограничения: <span class="text-white">{{skill.info.allowUse}}</span></p>
            </div>
            <div class="desc mb-4">
                <span v-html="skill.descr"></span>
            </div>
            <div class="boosts" v-if="skill.boosts != undefined">
                <p class="mb-1" v-for="(item, index) in skill.boosts" :key="index" :class="{'text-brown': item.title == 'Сила', 'text-success': item.title == 'Ловкость'}">{{`${item.title}: ${item.desc}`}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selected: false,
            }
        },
        props: {
            skill: Object,
            itemRowId: Number,
        },
        methods: {
            click() {
                if(this.selected) {
                    this.$store.commit('genie/removeSkill', this.skill.title);
                    this.selected = !this.selected;
                } else {
                    if(!this.disabled) {
                        this.$store.commit('genie/pushSkill', this.skill);
                        this.selected = !this.selected;
                    }
                }
            }
        },
        computed: {
            getIconClass() {
                return `icon-${this.skill.icon}`;
            },
            isElementsPointEnough() {
                let busyPoints = 0;
                for (let [key, value] of Object.entries(this.$store.state.genie.reqElements)) {
                    if (this.skill.info.reqElements[Object.keys(this.skill.info.reqElements).find(item => item == key)] - value > 0) { 
                        busyPoints += this.skill.info.reqElements[Object.keys(this.skill.info.reqElements).find(item => item == key)] - value;
                    };
                }
                
                return this.$store.getters['genie/getFreeElemetalPoints'] - busyPoints >= 0;
            },
            disabled: {
                get() {
                    return !this.isElementsPointEnough || this.skill.blockedClasses.includes(this.$store.state.genie.selectedClass) || this.skill.blockedTerrain.includes(this.$store.state.genie.selectedTerrain) || this.$store.getters['genie/isSkillSlotsBusy'] && this.selected == false;
                }
            }
        },          
    }
</script>

<style lang="scss" scoped>
.icon {
    cursor: pointer;
}
.hint {
    width: 30vw;
    height: auto;
    z-index: 2;
    pointer-events: none;
}
.icon:hover .hint {
    display: block!important;
}

.disabled::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    position: absolute;
    left: 0;
    top: 0;
}

.selected {
    border: 3px solid red;
}
</style>