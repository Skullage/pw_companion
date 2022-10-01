<template>
    <div class="container">
        <div class="row">
            <main class="main">
                <div class="d-flex justify-content-center gap-5 mb-4 w-50 mx-auto">
                    <div class="input-group">
                        <label for="terrain" class="input-group-text">Поверхность</label>
                        <select name="terrain" id="terrain" class="form-select" v-model="$store.state.genie.selectedTerrain">
                            <option value=''>Любая</option>
                            <option value='Земля'>Земля</option>
                            <option value='Вода'>Вода</option>
                            <option value='Воздух'>Воздух</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="class" class="input-group-text">Класс</label>
                        <select name="class" id="class" class="form-select" v-model="$store.state.genie.selectedClass">
                            <option value=''>Любой</option>
                            <option v-for="item in $store.state.classes" :key="item.id" :value="item.title">{{item.title}}</option>
                        </select>
                    </div>
                </div>
                <offcanvas-button @click.prevent="showOffcanvasMenu(true)" />
                <genie-category-group v-for="item in 14" :key="item" :category=item />
            </main>
            <!-- <aside class="border-start offcanvas offcanvas-end">
                <div class="offcanvas-header">
                    <h4 class="sidebar__title mb-0" id="offcanvasScrollingLabel">
                        Джинн
                    </h4>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click.prevent="showOffcanvasMenu(false)"></button>
                </div>
                <div class="offcanvas-body">
                    <Transition name="title" mode="out-in">
                        <h5 class="sidebar__title text-center" v-if="forms.length > 1">
                            Всего
                        </h5>
                        <h5 class="sidebar__title text-center" v-else>
                            Необходимо
                        </h5>
                    </Transition>
                    <result-list :resources="resources" />
                </div>
            </aside> -->
        </div>
    </div>
</template>

<script>
import OffcanvasButton from '@/components/UI/OffcanvasButton.vue';
import GenieCategoryGroup from '@/components/calcs/genie/GenieCategoryGroup.vue';

export default {
    components: {
        OffcanvasButton,
        GenieCategoryGroup,
    },
    data() {
        return {
            showMenu: true,
        }
    },
    methods: {
        showOffcanvasMenu(bool){
            this.showMenu = bool;
        },
    },
}
</script>