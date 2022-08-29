<template>
    <router-link :to="{name: item.href}" custom v-slot="{ navigate }">
        <div class="col">
            <div class="card h-100 text-black" style="width: 18rem;" @click="navigate">
                <img :src="getImg" class="card__img card-img-top img-thumbnail" :alt="item.title">
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
    border-radius: 10px;

    &:hover {
        cursor: pointer;
    }
    &__img {
        height: 150px;
    }
}


</style>