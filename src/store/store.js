import { navigate, makeStore, pipeMiddleware } from 'olive-spa'
import { ACTIONS } from '../env'
import { fxDevLogger } from './fx/fxDevLogger'
import { fxNavigate } from './fx/fxNavigate'
import { Player } from '../models/player'
import { rxJumboSwitch } from './rx/rxJumboSwitch'
import { rxNavigate } from './rx/rxNavigate'
import { rxClientChoose } from './rx/rxClientChoose'

const DEFAULT = {
    path: '/',
    home: {
        jumboPanel: 0,
    },
    gamestate: {
        client: Player('Client'),
        opponent: Player('Opponent'),
        turnHistory: [],
    },
    editor: {
        title: '<title>',
        imgUrl: '',
        components: [],
        curPts: 0,
        maxPts: 21 //for determining max effects
    }
}

const rx = (model, [k, data]) => 
    k === ACTIONS.TRY_NAVIGATE  ? rxNavigate(model, data)
:   k === ACTIONS.JUMBO_SWITCH  ? rxJumboSwitch(model, data)
:   k === ACTIONS.CLIENT_CHOOSE ? rxClientChoose(model, data)
:   /*default*/                   model

//add middleware here. (model, action) => action
const pipeline = pipeMiddleware(fxDevLogger, fxNavigate)

//add pipeline when we have side effects to pipe.
export const store = makeStore(DEFAULT, rx, pipeline)

