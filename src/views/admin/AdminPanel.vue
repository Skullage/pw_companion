<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-center gap-3 mb-3">
            <button class="btn btn-dark" @click="currentTab = 'Users'">Пользователи</button>
            <button class="btn btn-dark" @click="currentTab = 'Genie'">Джин</button>
            <button class="btn btn-dark" @click="currentTab = 'Equip'">Экипировка</button>
        </div>
        <component :is="currentTabComponent" class=""></component>
    </div>
</template>

<script>
import GenieSkillsPanel from '@/components/dev/GenieSkillsPanel.vue'
import UsersPanel from '@/components/dev/UsersPanel.vue';
import EquipPanel from '@/components/dev/EquipPanel.vue';

    export default {
        components: { GenieSkillsPanel, UsersPanel, EquipPanel },
        data() {
            return {
                currentTab: 'Genie',
                tabs: [{title: 'Users', component: 'users-panel'}, {title: 'Genie', component: 'genie-skills-panel'}, {title: 'Equip', component: 'equip-panel'}]
            }
        },
        computed: {
            currentTabComponent() {
                return this.tabs.find(item => item.title == this.currentTab).component;
            }
        }
    }
</script>