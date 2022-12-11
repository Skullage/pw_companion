<template>
<div class="wrapper">
    <error-message v-if="$store.getters['error/errorIsVisible']" />
    <base-header class="header" />
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
    <footer class="footer">
    </footer>
</div>
</template>
<script>
import ErrorMessage from '@/components/ErrorMessage.vue';
import BaseHeader from '@/components/BaseHeader.vue';

export default {
    components: { 
        ErrorMessage, 
        BaseHeader 
    },
    created() {
        this.$store.dispatch('getClasses', this.$store.state.baseServerUrl);
        this.$store.dispatch('getStats', this.$store.state.baseServerUrl);
        this.$store.dispatch('getResources', this.$store.state.baseServerUrl);
    },
}
</script>

<style lang="scss">
.fade-enter-from,
.fade-leave-to {
    opacity: 0
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s ease-out;
}
</style>