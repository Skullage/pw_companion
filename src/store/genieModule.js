
export const genieModule = {
    state () {
        return {
            selectedClass: '',
            selectedTerrain: '',
            genieLvl: 1,
            luckyPoints: 0,
            reqElements: {
                MT: 0,
                WD: 0, 
                ER: 0, 
                WT: 0, 
                FR: 0,
            },
            selectedSkills: [],
        }
    },
    getters: {
        getElemetalPoints(state) {
            if (state.genieLvl > 100) {
                return 1 + Math.floor(state.genieLvl / 10) * 2 + state.genieLvl % 10;
            } else {
                return 1 + Math.floor(state.genieLvl / 10) * 2;
            }
        },
        getFreeElemetalPoints(state, getters) {
            return getters.getElemetalPoints - (state.reqElements.MT + state.reqElements.WD + state.reqElements.ER + state.reqElements.WT + state.reqElements.FR);
        },
        getSkillSlots(state) {
            if(state.luckyPoints >= 0 && state.luckyPoints <= 50) {
                return 4;
            } else if (state.luckyPoints >= 51 && state.luckyPoints <= 70) {
                return 5;
            } else if (state.luckyPoints >= 71 && state.luckyPoints <= 80) {
                return 6;
            } else if (state.luckyPoints >= 81 && state.luckyPoints <= 90) {
                return 7;
            } else if (state.luckyPoints >= 91 && state.luckyPoints <= 100) {
                return 8;
            }
        },
        isSkillSlotsBusy(state, getters) {
            if (state.selectedSkills.length == getters.getSkillSlots) return true;
        }
    },
    mutations: {
        pushSkill(state, skill) {
            state.selectedSkills.push(skill);
            state.reqElements = {MT: 0, WD: 0, ER: 0, WT: 0, FR: 0};

            if(state.selectedSkills.length > 0) {
                state.selectedSkills.forEach(el => {
                    state.reqElements.MT = Math.max(el.info.reqElements.MT, state.reqElements.MT)
                    state.reqElements.WD = Math.max(el.info.reqElements.WD, state.reqElements.WD)
                    state.reqElements.ER = Math.max(el.info.reqElements.ER, state.reqElements.ER)
                    state.reqElements.WT = Math.max(el.info.reqElements.WT, state.reqElements.WT)
                    state.reqElements.FR = Math.max(el.info.reqElements.FR, state.reqElements.FR)
                })
            }
        },
        removeSkill(state, title) {
            state.selectedSkills = state.selectedSkills.filter(item => item.title != title);

            state.reqElements = {MT: 0, WD: 0, ER: 0, WT: 0, FR: 0};

            if(state.selectedSkills.length > 0) {
                state.selectedSkills.forEach(el => {
                    state.reqElements.MT = Math.max(el.info.reqElements.MT, state.reqElements.MT)
                    state.reqElements.WD = Math.max(el.info.reqElements.WD, state.reqElements.WD)
                    state.reqElements.ER = Math.max(el.info.reqElements.ER, state.reqElements.ER)
                    state.reqElements.WT = Math.max(el.info.reqElements.WT, state.reqElements.WT)
                    state.reqElements.FR = Math.max(el.info.reqElements.FR, state.reqElements.FR)
                })
            }
        },
    },
    namespaced: true,
}