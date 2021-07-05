import { customDispatcher, pipeMiddleware } from 'olive-spa'
import { Player } from '../../models/player'

export const WAIT_FOR_GAME = 'Wait For Game', 
             CLIENT_CHOOSE = 'Client Choose',
             CLIENT_READY  = 'Client Ready'

const model = {
    client: new Player(),
    opponent: new Player()
}


const rxWaitForGame = (model, data) => {
    return { }
}

const rxClientChoose = (model, data) => {

}

const rxClientReady = (model, data) => {

}

const reducer = (model, [k, data]) => 
    k === WAIT_FOR_GAME ? model
:   k === CLIENT_CHOOSE ? model
:   k === CLIENT_READY  ? model
:   /*else*/              model

const mw = pipeMiddleware()

export const PlayDispatcher = customDispatcher({
    id: 'PlayDispatcher',
    model,
    reducer,
    mw
})