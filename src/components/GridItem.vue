<template>
    <router-link :to="{name: item.href}" custom v-slot="{ navigate }">
        <div class="col">
            <div class="card shadow h-100 rounded text-black" @click="navigate">
            <div class="card-header border-bottom bg-white">
                <img :src="getImg" class="card__img card-img-top rounded img-fluid p-1" :alt="item.title">
            </div>
                <div class="card-body">
                    <h5 class="card-title">{{item.title}}</h5>
                    <p class="card-text">{{item.desc}}</p>
                </div>
            </div>
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
            getImg() {
                return require(`@/assets/images/calcs/${this.item.backgroundImage}`);
            }
        }
    }
</script>

<style lang="scss" scoped>

.card {
    &:hover {
        cursor: pointer;
    }
    &__img {
        height: 150px;
    }
}


</style>