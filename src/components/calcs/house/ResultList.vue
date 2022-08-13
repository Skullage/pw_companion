<template>
    <div class="result">
        <h2 class="result__title">{{title}}</h2>
        <p class="result__text">{{resources.food}} еды <span class="result__icon result__icon_food"></span></p>
        <p class="result__text">{{resources.metal}} металла <span class="result__icon result__icon_metal"></span></p>
        <p class="result__text">{{resources.wood}} дерева <span class="result__icon result__icon_wood"></span></p>
        <p class="result__text">{{resources.stone}} камня <span class="result__icon result__icon_stone"></span></p>
        <p class="result__text">{{resources.cloth}} ткани <span class="result__icon result__icon_cloth"></span></p>
        <!-- <p class="result__text">{{resources.money.toFixed(1)}} кк серебра <span class="result__icon result__icon_silver"></span></p> -->
        <p class="result__text">{{resources.money.toFixed(1) >= 1 ? resources.money.toFixed(1) + "кк" : resources.money.toFixed(1) * 1000 + "к"}} серебра <span class="result__icon result__icon_silver"></span></p>
        <p class="result__text">{{resources.houseLvl}} уровень дома</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            resources: Object,
        }
    }
</script>

<style lang="scss" scoped>
.result {
    &__title {
        border-bottom: 1px solid #fff;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    &__text {
        margin-bottom: 10px;
    }

    &__icon {
        padding-left: 16px;
        margin-left: 10px;

        &_food {
            background: url(@/assets/images/calcs/house/food.png) no-repeat 0 0;
        }
        &_cloth {
            background: url(@/assets/images/calcs/house/cloth.jpg) no-repeat 0 0;
        }
        &_stone {
            background: url(@/assets/images/calcs/house/stone.jpg) no-repeat 0 0;
        }
        &_metal {
            background: url(@/assets/images/calcs/house/metal.jpg) no-repeat 0 0;
        }
        &_wood {
            background: url(@/assets/images/calcs/house/wood.jpg) no-repeat 0 0;
        }
        &_silver {
            background: url(@/assets/images/calcs/house/silver.png) no-repeat 0 0;
            background-size: cover;
        }
    }
}
</style>