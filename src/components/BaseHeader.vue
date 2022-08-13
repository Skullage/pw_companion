<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <router-link class="logo" :to="{name: 'home'}">Skullage</router-link>
                <nav class="nav">
                    <router-link class="nav__link" :to="{name: 'calc'}">Калькуляторы</router-link>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'BaseHeader'
    }
</script>

<style lang="scss" scoped>
.header {
    &__inner {
        min-height: 50px;
        background-color: transparent;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000;

        @media (max-width: 375px) {
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }
    }
}

.nav {
    display: flex;
    gap: 10px;
    list-style: none;

    &__link {
        color: #000;
        text-transform: uppercase;
        cursor: pointer;
        text-decoration: none;
        font-weight: 700;

        &:hover {
            color: #0cf31d;
        }

        &.router-link-active {
            color: #1ee145;
            border-bottom: 3px solid #1ee145;
        }
    }
}

.logo {
    cursor: pointer;
    color: #000;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 30px;

    &:hover {
        color: #0cf31d;
    }
}
</style>