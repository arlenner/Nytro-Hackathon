import { State } from '../state'
import { dispatch } from 'olive-spa'

export const GameStartState = (p1, p2) => new State({
    
    enter() {
        dispatch([ACTIONS.INIT_GAME, { p1, p2 }])
    },

    update() {

    },

    exit() {

    }
})