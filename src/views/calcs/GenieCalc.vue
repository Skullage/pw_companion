<template>
    <div class="container">
        <div class="row">
            <main class="main">
                <offcanvas-button @click.prevent="showOffcanvasMenu(true)" />
                <genie-category-group v-for="(item, index) in 14" :key="index" :category=item />
                <!-- <genie-category-group :category=2 /> -->
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
import axios from "axios";
import OffcanvasButton from '@/components/UI/OffcanvasButton.vue';
import SkillCell from '@/components/calcs/genie/SkillCell.vue';
import GenieCategoryGroup from '@/components/calcs/genie/GenieCategoryGroup.vue';

export default {
    components: {
        OffcanvasButton,
        SkillCell,
        GenieCategoryGroup,
    },
    data() {
        return {
            skills: [
                {
                    level: 1, 
                    items: [
                        {title: 'Спасение духа', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: ['Заряжает вас стихией металла, придавая невосприимчивость ко сну на 5.2 сек. ', 'Минимальный запас энергии для использования данного умения - 80 ед.'], boosts: [{title: 'Сила', desc: 'Каждые 5 очков уменьшают количество затрачиваемой энергии на 1'}, {title: 'Ловкость', desc: 'Каждые 5 очков уменьшают количество затрачиваемой энергии на 1'}], reqElements: {MT: 1, WD: 0, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '92'},
                        {title: 'Клеймо печали', info: {reqLevel: 1, energy: '15 - 42', stamina: '90 - 450', cd: 1, range: 15}, desc: ['Воздействует на разум и дух противника, заставляя его потерять 150 - 600 ед. магической энергии за 15 сек.'], boosts: [{title: 'Сила', desc: 'Каждое очко увеличивает потери МЭ на 10 ед.'}], reqElements: {MT: 0, WD: 1, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '38'},
                        {title: 'Вспышка молнии', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 1, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land'], backgroundImage: '94'},
                        {title: 'Восстанавливающая аура', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: ['Вспышка молнии ослепляет противника.;Снижает скорость атаки и увеличивает время подготовки заклинаний цели на 6% - 15% на 8 сек.'], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 1, FR: 0}, class: ['priest'], terrain: ['water'], backgroundImage: '13'},
                        {title: 'Огненный поток', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 0, FR: 1}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '59'},
                        {title: 'Выздоровление', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 1, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '53'},
                        {title: 'Заклятие крови', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 1, WD: 0, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '7'},
                    ]
                },
                {
                    level: 2, 
                    items: [
                        {title: 'Проклятие ветра', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 2, WD: 0, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['air'], backgroundImage: '23'},
                        {title: 'Тактика бога', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 2, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '46'},
                        {title: 'Землетрясение', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 2, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land'], backgroundImage: '18'},
                        {title: 'Волна помощи', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 2, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['water'], backgroundImage: '88'},
                        {title: 'Возгорание', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 0, FR: 2}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '29'},
                        {title: 'Губительный огонь', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 0, FR: 2}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '66'},
                        {title: 'Громоздкий щит', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 1, ER: 1, WT: 0, FR: 0}, class: ['tank'], terrain: ['land', 'water', 'air'], backgroundImage: '42'},
                        {title: 'Грязь', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 1, WT: 1, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '55'},
                        {title: 'Огненный меч', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 1, WD: 0, ER: 0, WT: 0, FR: 1}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '65'},
                    ]
                },
                {
                    level: 3, 
                    items: [
                        {title: 'Спасительная буря', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 3, WD: 0, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['air', 'land'], backgroundImage: '14'},
                        {title: 'Противоядие', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 3, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '72'},
                        {title: 'Песчаный щит', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 3, WT: 0, FR: 0}, class: ['mage'], terrain: ['land', 'water', 'air'], backgroundImage: '70'},
                        {title: 'Проклятие безумия', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 3, FR: 0}, class: ['tank'], terrain: ['land', 'water', 'air'], backgroundImage: '56'},
                        {title: 'Проклятие огня', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 0, FR: 3}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '25'},
                        {title: 'Танец листвы', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 1, WD: 1, ER: 0, WT: 1, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '10'},
                        {title: 'Отраженный свет', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 1, ER: 1, WT: 1, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '12'},
                        {title: 'Огонь души', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 1, WT: 1, FR: 1}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '61'},
                    ]
                },
                {
                    level: 4, 
                    items: [
                        {title: 'Стальное сердце', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 4, WD: 0, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '91'},
                        {title: 'Смертельный яд', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 4, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '62'},
                        {title: 'Великий предел', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 4, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '27'},
                        {title: 'Водный дракон', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 4, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '52'},
                        {title: 'Печать Инь-Ян', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 0, FR: 4}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '95'},
                        {title: 'Клинок света', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 2, WD: 0, ER: 0, WT: 0, FR: 2}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '24'},
                        {title: 'Волна яда', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 2, ER: 0, WT: 2, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['water'], backgroundImage: '89'},
                        {title: 'Торнадо', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 1, WD: 0, ER: 1, WT: 2, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '99'},
                        {title: 'Свобода действий', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 1, WD: 0, ER: 0, WT: 1, FR: 2}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '93'},
                    ]
                },
                {
                    level: 5, 
                    items: [
                        {title: 'Проклятие воздуха', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 2, WD: 0, ER: 2, WT: 1, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '48'},
                        {title: 'Заклятие князя', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 5, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '45'},
                        {title: 'Воля бога', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 5, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '76'},
                        {title: 'Боевой клич', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 2, ER: 2, WT: 0, FR: 1}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '41'},
                        {title: 'Ошеломление', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 0, FR: 5}, class: ['tank', 'archer'], terrain: ['land', 'water', 'air'], backgroundImage: '31'},
                        {title: 'Шоковый разряд', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 5, WD: 0, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '35'},
                        {title: 'Земляная волна', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 1, WT: 2, FR: 2}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land'], backgroundImage: '22'},
                        {title: 'Благословение радуги', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 1, WD: 0, ER: 0, WT: 2, FR: 2}, class: ['priest'], terrain: ['land', 'water', 'air'], backgroundImage: '36'},
                        {title: 'Слеза бога', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 5, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '77'},
                    ]
                },
                {
                    level: 6, 
                    items: [
                        {title: 'Вихрь', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 6, WD: 0, ER: 0, WT: 0, FR: 0}, class: ['mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['air'], backgroundImage: '49'},
                        {title: 'Природная защита', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 6, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '57'},
                        {title: 'Ярость', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 6, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '68'},
                        {title: 'Водоворот жизни', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 6, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '11'},
                        {title: 'Бог огня', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 0, FR: 6}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '80'},
                        {title: 'Пыл земли', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 3, WT: 0, FR: 3}, class: ['tank'], terrain: ['land'], backgroundImage: '21'},
                        {title: 'Воздушный капкан', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 3, WT: 3, FR: 0}, class: ['archer'], terrain: ['land', 'water', 'air'], backgroundImage: '16'},
                        {title: 'Слово истины', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 2, WD: 2, ER: 2, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '78'},
                        {title: 'Гнев воина', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 3, WD: 0, ER: 0, WT: 3, FR: 0}, class: ['warrior', 'tank'], terrain: ['land', 'water', 'air'], backgroundImage: '84'},
                    ]
                },
                {
                    level: 7, 
                    items: [
                        {title: 'Шаровая молния', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 7, WD: 0, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['air'], backgroundImage: '28'},
                        {title: 'Мимолетное безумие', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 7, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '44'},
                        {title: 'Атака земли', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 7, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land'], backgroundImage: '17'},
                        {title: 'Ледяной дыхание', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 7, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '69'},
                        {title: 'Удар с неба', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 0, FR: 7}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '26'},
                        {title: 'Тайная молитва', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 3, WD: 0, ER: 4, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '73'},
                        {title: 'Защитник', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 3, ER: 0, WT: 4, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '30'},
                        {title: 'Камикадзе', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 4, WD: 0, ER: 0, WT: 0, FR: 3}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '79'},
                        {title: 'Рассекающий коготь', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 3, WT: 0, FR: 4}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land'], backgroundImage: '20'},
                    ]
                },
                {
                    level: 8, 
                    items: [
                        {title: 'Электрический танец', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 8, WD: 0, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['air'], backgroundImage: '71'},
                        {title: 'Проклятие стихий', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 8, ER: 0, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '75'},
                        {title: 'Пыльная буря', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 8, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '97'},
                        {title: 'Волна силы', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 8, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['water'], backgroundImage: '40'},
                        {title: 'Защита огня и воды', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 4, FR: 4}, class: ['mage'], terrain: ['land', 'water', 'air'], backgroundImage: '50'},
                        {title: 'Печать', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 4, ER: 4, WT: 0, FR: 0}, class: ['mage', 'gunner', 'dru', 'priest', 'archer', 'shaman', 'mystic', 'reaper'], terrain: ['land', 'water', 'air'], backgroundImage: '33'},
                        {title: 'Громовой коготь', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 4, ER: 4, WT: 0, FR: 0}, class: ['dru'], terrain: ['land'], backgroundImage: '81'},
                    ]
                },
                {
                    level: 9, 
                    items: [
                        {title: 'Равновесие', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 4, WD: 0, ER: 0, WT: 0, FR: 5}, class: ['warrior'], terrain: ['land', 'water', 'air'], backgroundImage: '34'},
                        {title: 'Возмездие', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 5, ER: 4, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '83'},
                        {title: 'Звезда мастера', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 3, WT: 3, FR: 3}, class: ['mage'], terrain: ['land', 'water', 'air'], backgroundImage: '54'},
                        {title: 'Зеркальная аура', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 5, ER: 0, WT: 3, FR: 1}, class: ['warrior', 'tank'], terrain: ['land', 'water', 'air'], backgroundImage: '3'},
                    ]
                },
                {
                    level: 10, 
                    items: [
                        {title: 'Мерцающий щит', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 5, WT: 0, FR: 5}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '58'},
                        {title: 'Ослабление', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 5, WD: 0, ER: 0, WT: 5, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '86'},
                        {title: 'Знак воды и огня', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 5, FR: 5}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '51'},
                    ]
                },
                {
                    level: 11, 
                    items: [
                        {title: 'Ледник', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 5, WT: 6, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['water'], backgroundImage: '32'},
                        {title: 'Подавление магии', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 6, ER: 0, WT: 0, FR: 5}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '74'},
                        {title: 'Ссылка', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 5, WD: 0, ER: 0, WT: 6, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '43'},
                    ]
                },
                {
                    level: 12, 
                    items: [
                        {title: 'Танец фениксов', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 4, ER: 0, WT: 4, FR: 4}, class: ['priest'], terrain: ['land', 'water', 'air'], backgroundImage: '8'},
                        {title: 'Чистая сфера', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 4, WD: 0, ER: 4, WT: 4, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '82'},
                        {title: 'Вспышка энергии', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 7, WD: 0, ER: 5, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '63'},
                    ]
                },
                {
                    level: 13, 
                    items: [
                        {title: 'Шипы гнева', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 6, WD: 0, ER: 7, WT: 0, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land'], backgroundImage: '85'},
                        {title: 'Пламя дракона', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 0, WT: 6, FR: 7}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land'], backgroundImage: '9'},
                        {title: 'Воспламенение', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 7, WT: 0, FR: 6}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land'], backgroundImage: '64'},
                    ]
                },
                {
                    level: 14, 
                    items: [
                        {title: 'Кража духа', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 0, ER: 7, WT: 7, FR: 0}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '4'},
                        {title: 'Ледяной шторм', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 7, ER: 0, WT: 0, FR: 7}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '6'},
                        {title: 'Хаос души', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 7, WD: 7, ER: 0, WT: 0, FR: 0}, class: ['dru'], terrain: ['land', 'water', 'air'], backgroundImage: '1'},
                        {title: 'Уверенность', info: {reqLevel: 1, energy: '80', stamina: '500', cd: 30}, desc: [''], boosts: [{title: '', desc: ''}], reqElements: {MT: 0, WD: 7, ER: 0, WT: 0, FR: 7}, class: ['warrior', 'mage', 'gunner', 'tank', 'dru', 'monkey', 'priest', 'archer', 'paladin', 'sin', 'shaman', 'guard', 'mystic', 'reaper', 'ghost'], terrain: ['land', 'water', 'air'], backgroundImage: '2'},
                    ]
                }
            ],
            data: [],
            showMenu: true,
        }
    },
    created() {
        // this.getSkills();
    },
    methods: {
        showOffcanvasMenu(bool){
            this.showMenu = bool;
        },
        async getSkillbyCategory() {
            try {
                const response = await axios.get(
                    `http://localhost:5000/genie_skills/cat/1`
                );
                this.data = response.data;
            } catch (err) {
                console.log(err);
            }
        },
        async getSkills() {
            try {
                const response = await axios.get("http://localhost:5000/genie_skills");
                this.data = response.data;
            } catch (err) {
                console.log(err);
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>