<template>
<div class="wrapper">
    <error-message v-if="$store.state.error.errorText > 0" />
    <base-header class="header" />
    <router-view />
    <footer class="footer">
    </footer>
</div>
</template>
<script>
import ErrorMessage from '@/components/ErrorMessage.vue';
import BaseHeader from '@/components/BaseHeader.vue';

export default {
    components: { ErrorMessage, BaseHeader },

    created() {
        this.$store.dispatch('getClasses');
    }
}
</script>