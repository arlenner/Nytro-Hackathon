import { customDispatcher } from 'olive-spa'

export const JUMBO_SWITCH = 'Jumbotron Switch'

export const HomeDispatcher = customDispatcher({
    id: 'HomeDispatcher',
    model: {
        panelIndex: 0
    },
    reducer: (model, [k, data]) => 
        k === JUMBO_SWITCH ? { panelIndex: model.panelIndex+1 }
    :   /*else*/             model,
})