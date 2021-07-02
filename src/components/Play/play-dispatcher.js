import { customDispatcher, pipeMiddleware } from 'olive-spa'

export const WAIT_FOR_GAME = 'Wait For Game', 
             CLIENT_CHOOSE = 'Client Choose',
             CLIENT_READY  = 'Client Ready'

const model = {

}



const reducer = (model, [k, data]) => model

const mw = pipeMiddleware()

export const PlayDispatcher = customDispatcher({
    id: 'PlayDispatcher',
    model,
    reducer,
    mw
})