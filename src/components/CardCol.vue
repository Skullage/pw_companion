<template>
    <div class="col-md-12 col-lg-auto mb-lg-0 mb-3">
        <h3 class="col__title">{{object.blockName}}</h3>
        <ul class="col-list ps-0 list-group">
            <col-list-item v-for="(res, index) in object.list" :resources="resources" :object="{'res': res, 'value': object.value}" :key="index" />
        </ul>
    </div>
</template>

<script>
import ColListItem from '@/components/ColListItem.vue'
    export default {
  components: { ColListItem },
        props: {
            object: Object,
            resources: Object,
        }
    }
</script>

<style lang="scss" scoped>
.col-list {
    list-style: none;
}
</style>