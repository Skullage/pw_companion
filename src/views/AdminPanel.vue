<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-center gap-3 mb-3">
            <button class="btn btn-dark" @click="currentTab = 'Users'">Пользователи</button>
            <button class="btn btn-dark" @click="currentTab = 'Genie'">Джин</button>
        </div>
        <component :is="currentTabComponent" class=""></component>
    </div>
</template>

<script>
import GenieSkillsPanel from '@/components/dev/GenieSkillsPanel.vue'
import UsersPanel from '@/components/dev/UsersPanel.vue';
    export default {
        components: { GenieSkillsPanel, UsersPanel },
        data() {
            return {
                currentTab: 'Genie',
                tabs: [{title: 'Users', component: 'users-panel'},  {title: 'Genie', component: 'genie-skills-panel'}]
            }
        },
        computed: {
            currentTabComponent() {
                return this.tabs.find(item => item.title == this.currentTab).component;
            }
        }
    }
</script>