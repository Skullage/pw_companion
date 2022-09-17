<template>
    <div class="icon" :class="getIconClass">
        <div class="hint">
            <div class="hint__header d-flex justify-content-between align-items-center">
                <h5 class="mb-1">{{skill.title}}</h5>
                <div class="hint__icon" :class="getIconClass"></div>
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
                <p class="mb-1 text-warning" v-if="skill.info.range != undefined">Дальность: <span class="text-white">{{skill.info.range}}</span></p>
                <p class="mb-1 text-warning">Затраты энергии: <span class="text-white">{{skill.info.energy}}</span></p>
                <p class="mb-1 text-warning">Затраты физической силы: <span class="text-white">{{skill.info.stamina}}</span></p>
                <p class="mb-1 text-warning">Перезарядка: <span class="text-white">{{skill.info.cd}}</span> сек.</p>
                <p class="mb-1 text-warning" v-if="skill.info.allowUse != undefined">Ограничения: <span class="text-white">{{skill.info.allowUse}}</span></p>
            </div>
            <div class="desc mb-4">
                <!-- <p class="mb-1" v-for="(item, index) in skill.desc" :key="index">{{item}}</p> -->
                <!-- <pre></pre> -->
                <!-- {{}} -->
                <span v-html="skill.desc"></span>
            </div>
            <div class="boosts" v-if="skill.boosts != undefined">
                <p class="mb-1" v-for="(item, index) in skill.boosts" :key="index" :class="{'text-brown': item.title == 'Сила', 'text-success': item.title == 'Ловкость'}">{{`${item.title}: ${item.desc}`}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            skill: Object,
        },
        computed: {
            bgImage () {
                return require('@/assets/images/calcs/genie/skills/' + this.skill.icon)
            },
            inlineStyle () {
                return {
                    background: `url(${this.bgImage}) no-repeat center center`,
                    backgroundSize: 'contain'
                }
            },
            getIconClass() {
                return `icon-${this.skill.icon}`;
            }
        }
    }
</script>

<style lang="scss" scoped>
pre {
    overflow: hidden;
    white-space:pre-wrap;
}
.icon {
    position: relative;
    cursor: pointer;
}
.hint {
    display: none;
    position: absolute;
    left: 100%;
    top: 100%;
    padding: 10px;
    background-color: rgba(0, 0, 0, .9);
    color: #fff;
    width: 600px;
    height: auto;
    z-index: 2;
    border-radius: 10px;
}
.icon:hover .hint {
    display: block!important;
}
</style>