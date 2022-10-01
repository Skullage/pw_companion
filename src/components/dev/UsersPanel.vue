<template>
    <div>
        <div class="tools-bar mb-3 text-end">
            <router-link :to="{name: 'addUser'}" class="btn btn-primary">Создать пользователя</router-link>
        </div>
        <div class="responsive-table">
            <table class="table text-center table-borderless align-middle">
                <thead class="table-dark position-sticky top-0">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Логин</th>
                        <th scope="col">Почта</th>
                        <th scope="col">Группа пользователя</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in users" :class="{ 'table-active': hoveredTrId == index }" :key="index" @mouseover="hoveredTrId = index" @mouseout="hoveredTrId = -1" @click="$router.push(`/updateUser/id=${item.id}`)">
                        <td>{{item.id}}</td>
                        <td>{{item.login}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.isAdmin}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'UsersPanel',
        data() {
            return {
                users: [],
                hoveredTrId: -1,
            }
        },
        methods: {
            async getUsers() {
                try {
                    const response = await axios.get(this.$store.state.baseServerUrl + "users");
                    this.users = response.data;
                } catch (err) {
                    console.log(err);
                }
            },
        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style lang="scss" scoped>
tr {
    cursor: pointer;
}
</style>