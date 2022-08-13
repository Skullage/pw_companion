<template>
<div class="wrapper">
    <error-message @close="errorIsVisible = false" v-if="errorIsVisible" :texts="errorText" />
    <base-header />
    <router-view @error="errorIsVisible = $event.isVisible; errorText = $event.errors" />
    <footer class="footer">
    </footer>
</div>
</template>
<script>
import ErrorMessage from '@/components/ErrorMessage.vue';
import BaseHeader from '@/components/BaseHeader.vue';

export default {
    data() {
        return {
            errorIsVisible: false,
            errorText: [],
        };
    },
    components: { ErrorMessage, BaseHeader },
}
</script>
<style lang="scss">
* {
    padding: 0;
	margin: 0;
	border: 0;
}
html, body {
    height: 100%;
	width: 100%;
    font-size: 100%;
	line-height: 1;
}
body {

}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #fff;
    height: 100%;
}

.wrapper {
    min-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.container {
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 15px;
}
</style>
