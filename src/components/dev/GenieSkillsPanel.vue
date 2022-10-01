<template>
    <div class="table-responsive">
        <table class="table text-center table-borderless align-middle">
            <thead class="position-fixed-top table-dark">
                <tr>
                    <th scope="col" rowspan="3">Id</th>
                    <th scope="col" rowspan="3">Название</th>
                    <th scope="col" rowspan="3">Описание</th>
                    <th scope="col" colspan="2">Бусты</th>
                    <th scope="col" colspan="10">Инфо</th>
                    <th scope="col" rowspan="3">Иконка</th>
                    <th scope="col" rowspan="3">Запрещенные поверхности</th>
                    <th scope="col" rowspan="3">Запрещенные классы</th>
                    <th scope="col" rowspan="3">Категория</th>
                </tr>
                <tr>
                    <th scope="col" rowspan="2">Стат</th>
                    <th scope="col" rowspan="2">Буст</th>
                    <th scope="col" rowspan="3">Уровень</th>
                    <th scope="col" rowspan="3">Дальность</th>
                    <th scope="col" rowspan="3">Энергия</th>
                    <th scope="col" rowspan="3">Стамина</th>
                    <th scope="col" rowspan="3">Кд</th>
                    <th scope="col" colspan="5">Элементы</th>
                </tr>
                <tr>
                    <th scope="col">MT</th>
                    <th scope="col">WD</th>
                    <th scope="col">ER</th>
                    <th scope="col">WT</th>
                    <th scope="col">FR</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in skills" :class="{ 'table-active': hoveredTrId == index }" :key="index" @mouseover="hoveredTrId = index" @click="$router.push(`/updateGenieSkill/id=${item.id}`)">
                    <td>{{item.id}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.descr}}</td>
                    <td>
                        <table>
                            <tr v-for="(boost, index) in item.boosts" :key="index">
                                <td>{{boost.title}}</td>
                            </tr>
                        </table>
                    </td>
                    <td >
                        <table>
                            <tr v-for="(boost, index) in item.boosts" :key="index">
                                <td>{{boost.desc}}</td>
                            </tr>
                        </table>
                    </td>
                    <td>{{item.info.reqLevel}}</td>
                    <td>{{item.info.range}}</td>
                    <td>{{item.info.energy}}</td>
                    <td>{{item.info.stamina}}</td>
                    <td>{{item.info.cd}}</td>   
                    <td>{{item.info.reqElements.MT}}</td>
                    <td>{{item.info.reqElements.WD}}</td>
                    <td>{{item.info.reqElements.ER}}</td>
                    <td>{{item.info.reqElements.WT}}</td>
                    <td>{{item.info.reqElements.FR}}</td>
                    <td>{{item.icon}}</td>
                    <td>
                        <p class="m-0" v-for="(terrain, index) in item.blockedTerrain" :key="index">
                            {{terrain}}
                        </p>
                    </td>
                    <td>                        
                        <p class="m-0" v-for="(classes, index) in item.blockedClasses" :key="index">
                            {{classes}}
                        </p>
                    </td>
                    <td>{{item.category}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'genie-skills-panel',
        data() {
            return {
                skills: [],
                hoveredTrId: -1,
            }
        },
        methods: {
            async getSkills() {
                try {
                    const response = await axios.get(this.$store.state.baseServerUrl + "genie_skills");
                    this.skills = response.data;
                } catch (err) {
                    console.log(err);
                }
            },
        },
        mounted() {
            this.getSkills();
        }
    }
</script>

<style lang="scss" scoped>
table {
    border-collapse: collapse;
}
tr {
    cursor: pointer;
}
</style>