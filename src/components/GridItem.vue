<template>
    <router-link :to="{name: item.href}" custom v-slot="{ navigate }">
        <div class="grid__item" role="link" @click="navigate" :style="inlineStyle">
            <h3 class="grid__title">
                {{item.title}}
            </h3>
            <p class="grid__desc">
                {{item.desc}}
            </p>
        </div>
    </router-link>
    
</template>

<script>
    export default {
        name: 'GridItem',
        props: {
            item: {
                title: {
                    type: String,
                },
                desc: {
                    type: String,
                },
                backgroundImage: {
                    type: String,
                },
                href: {
                    type: String,
                },
            }
        },
        computed: {
            bgImage () {
                return require('@/assets/images/calcs/' + this.item.backgroundImage)
            },
            inlineStyle () {
                return {
                    background: `url(${this.bgImage}) no-repeat center center`,
                    backgroundSize: 'contain'
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
.grid__item {
    padding: 10px 20px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    background-size: cover;
    border: 1px solid black;

    &:hover {
        cursor: pointer;
    }
}
.grid__title {
    padding: 10px 0;
    background-color: rgba(0, 0, 0, .5);
}

.grid__desc {
    padding: 10px 0;
    background-color: rgba(0, 0, 0, .5);
}
</style>