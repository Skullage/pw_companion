<template>
    <div>
        <div class="tools-bar mb-3 text-end">
            <router-link :to="{name: 'addEquip'}" class="btn btn-primary">Добавить экипировку</router-link>
        </div>
        <div class="responsive-table">
            <table class="table text-center table-borderless align-middle">
                <thead class="table-dark position-sticky top-0">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Название</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Базовые статы</th>
                        <th scope="col">Дополнительные статы</th>
                        <th scope="col">Требования</th>
                        <th scope="col">Требуемый класс</th>
                        <th scope="col">Иконка</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in equips" :class="{ 'table-active': hoveredTrId == index }" :key="index" @mouseover="hoveredTrId = index" @mouseout="hoveredTrId = -1" @click="$router.push(`/updateUser/id=${item.id}`)">
                        <td>{{item.id}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.desc}}</td>
                        <td>{{item.baseStats}}</td>
                        <td>{{item.additionalStats}}</td>
                        <td>{{item.requirements}}</td>
                        <td>{{item.classes}}</td>
                        <td>{{item.icon}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'EquipPanel',
        data() {
            return {
                equips: [],
                hoveredTrId: -1,
            }
        },
        methods: {
            async getEquips() {
                try {
                    const response = await axios.get(this.$store.state.baseServerUrl + "equips");
                    this.equips = response.data;
                } catch (err) {
                    console.log(err);
                }
            },
        },
        mounted() {
            this.getEquips();
        }
    }
</script>

<style lang="scss" scoped>
tr {
    cursor: pointer;
}
</style>