<template>
    <li class="list-group-item d-flex align-items-center py-3 gap-2 border-dark">
        <div class="col-list__icon">
            <img :src="require(`@/assets/images/` + getResHref)" class="img-fluid" :alt="object.res.title">
        </div>
        <div class="col-list__info">
            <h4 class="col-list__title text-uppercase text-secondary">{{object.res.title}}</h4> 
            <p class="col-list__value m-0">
                {{
                    getResVal
                }}
            </p>
        </div>
    </li>
</template>

<script>
    export default {
        props: {
            object: Object,
            resources: Object,
        },
        computed: {
            getResVal() {
                return this.object.value.find(item => item.title == this.object.res.title).value.toLocaleString();
            },
            getResHref() {
                return this.resources.find(item => item.title == this.object.res.title).href;
            },
        }
    }
</script>

<style lang="scss" scoped>
.col-list {
    &__icon {
        width: 48px;
    }

    &__title {
        font-size: 16px;
    }

    &__value {
        font-size: 14px;
    }
}
</style>