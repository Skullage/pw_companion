<template>
<div class="wrapper">
    <error-message @close="errorIsVisible = false" v-if="errorIsVisible" :texts="errorText" />
    <my-header />
    <router-view @error="errorIsVisible = $event.isVisible; errorText = $event.errors" />
    <footer class="footer">
    </footer>
</div>
</template>
<script>
import ErrorMessage from '@/components/ErrorMessage.vue';
import MyHeader from '@/components/MyHeader.vue';

export default {
    data() {
        return {
            errorIsVisible: false,
            errorText: [],
        };
    },
    components: { ErrorMessage, MyHeader },
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
    // background: url(@/assets/bg1.jpg) no-repeat center/100%;
    background-size: cover;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
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
