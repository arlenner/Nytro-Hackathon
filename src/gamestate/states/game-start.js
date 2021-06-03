import { State } from '../state'
import { html } from 'olive-spa'

export const GameStartState = (p1, p2) => new State({
    
    enter() {
        html().dispatch(ACTIONS.INIT_GAME, { p1, p2 })
    },

    update() {

    },

    pause() {
    
    },
    
    resume() {

    },

    exit() {

    }
})
