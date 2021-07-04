import { customDispatcher, pipeMiddleware, html } from 'olive-spa'

export const 
    ADD_COMPONENT = "Add Component",
    ADD_SUCCESS = "Added Successfully"

const model = {
    numberOfComps: 0,
    components: []
}

const fxAddComp = (model, action) => {
    const [k, data] = action
    if(k !== ADD_COMPONENT) return action
    if(data.numberOfComps >= 3) return
    data.numberOfComps++
    console.log(data)
    //html().dispatch(ADD_SUCCESS, model, [CreateDispatcher])
    return action
} 

const reducer = (model, [k, data]) => model
    // k === ADD_COMPONENT ? model //doing nothing so far.
    // : model

const mw = pipeMiddleware(fxAddComp)

export const CreateDispatcher = customDispatcher({
    id: 'CreateDispatcher',
    model,
    reducer,
    mw
})